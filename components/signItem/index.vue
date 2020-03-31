<template>
  <section v-if="!isSignBack">
    <div class="sign_type" v-if="!isSignIn">
      <div class="signed_icon">
        <div class="signed_info">
          <h4>{{ signedTextTitle }}</h4>
          <p>{{ signInTextDes }}</p>
        </div>
        <div
          v-if="isShowExtraBtn"
          class="btn_extra"
          @click="openNewPage()"
        ></div>
      </div>
    </div>
    <ul class="sign_type" v-else-if="activeInfo">
      <li
        class="festival_icon"
        :style="{ backgroundImage: 'url(' + activeInfo.ImgUrl + ')' }"
        @click="sendSignIn"
        data-type="3"
      >
        <!--<div class="festival_wrap">-->
        <!--<p class="title">{{activeInfo.Name}}</p>-->
        <!--<p class="dis">签到送{{awardNumberByActive}}{{adaptiveTextByActive}}</p>-->
        <!--</div>-->
      </li>
    </ul>
    <ul class="sign_type" v-else>
      <li class="default_sign" @click="sendSignIn" data-type="1">
        点击领取{{ awardNumberByDefault }}{{ adaptiveTextByDefault }}
      </li>
      <li class="risk_sign" @click="sendSignIn" data-type="2">
        点击领取神秘奖励
      </li>
    </ul>
  </section>
  <section
    v-else
    class="sign_status "
    :class="[signInType == 1 ? 'sign_status_default' : 'sign_status_other']"
  >
    <h4>签到成功！</h4>
    <p>{{ signInMsg }}</p>
    <p>{{ signInTextDes }}</p>
    <i class="pendant"></i>
  </section>
</template>
<style lang="less" rel="stylesheet/less">
@import "./main";
</style>

<script>
/* eslint-disable */
import base from "../../assets/js/common";

const transformTitle = function(type) {
  if (type == 1) {
    return "普通型";
  }
  if (type == 2) {
    return "冒险型";
  }
  return "节日型";
};

export default {
  props: {
    userStatus: Object,
    activeInfo: Object,
    defaultInfo: Object
  },
  data() {
    return {
      isSignBack: false,
      signInType: 0,
      signInMsg: "",
      isShowExtraBtn: false, // 是否显示额外领取的奖励的按钮
      advertArr: [] // 广告数据
    };
  },
  mounted() {
    this.observe();
  },
  methods: {
    observe() {},
    sendSignIn(e) {},
    /**
     * @function 打开新的页面：例如打开配置的广告页面
     */
    openNewPage() {
      Topi.gOpenNewPage(this.advertArr[0].URL, 2);
    },
    /**
     * @function 处理弹窗：如果配置了广告，则弹窗显示，否则弹窗不显示。
     * @param  {object} responseData 获奖的数据
     */
    handlePop(responseData) {}
  },
  computed: {
    curIndex() {
      return this.userStatus.LastDay;
    },
    isSignIn() {
      return this.userStatus && this.userStatus.IsCanSignIn;
    },
    isActive() {
      return this.activeInfo;
    },
    adaptiveTextByDefault() {
      return base.transformType(this.defaultInfo.AwardType);
    },
    awardNumberByDefault() {
      return this.defaultInfo.AwardNumber;
    },
    adaptiveTextByDefaultMX() {
      return base.transformType(this.defaultInfo.ActiveAwardType);
    },
    awardNumberByDefaultMX() {
      return this.defaultInfo.ActiveAwardNumber;
    },
    //已签到描述
    signInTextDes() {
      if (this.userStatus) {
        let desType = {
          1: "明天签到可领取额外大奖哦！",
          2: "点击宝箱可获得额外大奖！",
          7: this.userStatus.IsCanLottery
            ? "点击宝箱可获得神秘大奖"
            : "再坚持2天可领额外大奖哦！"
        };
        const otherDes =
          "再坚持" + (7 - this.userStatus.LastDay) + "天可领神秘大奖哦！";
        let des = desType[this.userStatus.LastDay]
          ? desType[this.userStatus.LastDay]
          : otherDes;

        return des;
      }
      return "";
    },
    signedTextTitle() {
      if (this.userStatus) {
        return "已连续签到" + this.userStatus.LastDay + "天";
      }
      return "";
    }
  }
};
</script>
