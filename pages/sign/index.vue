<template>
  <section class="signIn_main">
    <header class="header">
      <sign-type
        :userStatus="signInUser"
        :activeInfo="signInActive"
        :defaultInfo="defaultInfo"
      ></sign-type>
      <progress-bar
        v-if="signInUser"
        :userStatus="signInUser"
        :maxDay="maxDay"
      ></progress-bar>
    </header>
    <section class="luck_star" v-if="luckyList">
      <div class="hd">
        <div class="hd_content">
          <h3>幸运之星</h3>
        </div>
        <hr />
      </div>
      <div class="bd">
        <marquee>
          <li v-for="(i,index) in luckyList" :key="index">
            <span>{{ i.UserName }}</span>
            <span
              >获得 <strong>{{ i.AwardName }}</strong></span
            >
            <span>刚刚</span>
          </li>
        </marquee>
      </div>
    </section>
    <section class="rule">
      <h3>签到规则</h3>
      <ul>
        <li><i></i>用户每连续签到两天、七天，均可抽取大奖；</li>
        <li><i></i>奖品发放可能存在延迟，请耐心等待；</li>
        <li>
          <i></i
          >严禁利用系统漏洞谋取利益，一经发现我们将会对账号作出如下处理：(包括但不限于)奖励不予发放、回收奖励、封停账号等；
        </li>
        <li><i></i>本活动最终解释权归山河所有。</li>
      </ul>
    </section>
  </section>
</template>

<script>
import axios from 'axios';
import signType from '../../components/signItem';
import progressBar from '../../components/signProgress';
import marquee from '../../components/marquee';

export default {
    components: {
        progressBar,
        marquee,
        'sign-type': signType
    },
    data() {
        return {
            maxDay: 0, //最大配置天数
            signInUser: null, //用户状态
            signInActive: null, //活动配置
            defaultInfo: null, //普通
            luckyList: null //幸运
        };
    },
    asyncData({ params, error }) {
        return axios
            .get(`http://yapi.demo.qunar.com/mock/93078/api/SignInUser/GetInfo`)
            .then(res => {
                const responseData = res.data.Data;

                const that = {};

                that.maxDay = responseData.MaxDay;
                that.signInUser = responseData.SignInUser;
                that.signInActive = responseData.SignInActive;
                that.defaultInfo = responseData.SignIn;
                that.luckyList = responseData.Lucky;

                return that;
            })
            .catch(e => {
                error({ statusCode: 404, message: 'Post not found' });
            });
    },
    created() {
        console.log(this.defaultInfo);
    }
};
</script>
<style lang="less" rel="stylesheet/less">
@import "./main";
</style>
