<template>
  <section class="sign_progressbar">
    <div class="sign_progressbar_main" ref="progressbar">
      <div class="progressbar_flag">
        <ul>
          <li
            v-for="n in maxDay"
            :key="n"
            class="progressbar_flag_item"
            :class="[
              n != 2 && n != 7 ? 'iconfont' : 'award_item',
              {
                progressbar_flag_item_active: n <= curIndex,
                progressbar_flag_item_curr: n == curIndex
              },
              n == maxDay ? lastClass : '',
              n == 2 ? secondClass : ''
            ]"
          >
            <div v-if="n != 2 && n != 7">&#xe641;</div>
            <i v-else @click="onBigAwardFn(n)"></i>
          </li>
        </ul>
      </div>
      <div class="progressbar_line" ref="line">
        <div class="progressbar_curr" :style="{ width: percent + 'px' }"></div>
        <div class="progressbar_base"></div>
      </div>
    </div>
    <div class="tooltip">
      <div class="tooltip_popper" ref="tooltip" :style="{ left: toolLeft }">
        <i :style="{ left: arrowLeft }"></i>
        <div v-text="content" class="tooltip_text"></div>
      </div>
    </div>
  </section>
</template>

<style lang="less" rel="stylesheet/less">
@import "./main.less";
</style>
<script>
/* eslint-disable */
const sendGainAward = {};

export default {
  name: "progressBar",
  props: {
    maxDay: Number,
    userStatus: Object
  },
  computed: {
    curIndex() {
      return this.userStatus.LastDay;
    },
    isLottery() {
      return this.userStatus.IsCanLottery;
    },
    isShare() {
      return this.userStatus.IsCanShare;
    },
    lastClass() {
      if (this.curIndex < this.maxDay) {
        return "god_color b_default";
      }

      //不能分享，不能抽奖
      if (!this.isLottery && !this.isShare) {
        return "god_color b_disabled";
      }

      //可以抽奖
      if (this.curIndex === this.maxDay && this.isLottery) {
        return "god_color b_shake b_default";
      }

      //可以分享
      if (this.curIndex === this.maxDay && this.isShare) {
        return "god_color b_shake b_default";
      }

      return "god_color b_default";
    },
    secondClass() {
      if (this.curIndex < 2) {
        return "sliver_color b_default";
      }
      if (this.userStatus) {
        //抽过
        if (!this.userStatus.IsSpecifyDayLottery) {
          return "sliver_color b_shake b_default ";
        }
        return "sliver_color b_disabled";
      }

      return "sliver_color b_default";
    },
    content() {
      return "连续签到，点击宝箱抽取银子、话费、金豆";

      if (this.curIndex === 0) {
        return "连续签到" + this.maxDay + "天将有额外奖励哦";
      }
      if (this.curIndex < this.maxDay) {
        return "继续签到" + (this.maxDay - this.curIndex) + "天即可抽奖哦";
      }
      if (this.curIndex === this.maxDay && this.curIndex === 7) {
        if (this.isLottery) {
          return "恭喜你获得一次抽奖机会，当天有效";
        }
        if (this.isShare) {
          return "分享可以获得额外奖励哦";
        }
      }
      return "请继续下一轮的签到";
    }
  },
  data() {
    return {
      percent: 0,
      moveOffset: 0,
      arrowMean: 0,
      toolLeft: null,
      arrowLeft: null
    };
  },
  created() {},
  mounted: function() {
    setTimeout(() => {
      this.countPosition();
    }, 1000);
  },
  methods: {
    transform(num) {
      switch (num) {
        case 1:
          return "一";
        case 2:
          return "二";
        case 3:
          return "三";
        case 4:
          return "四";
        case 5:
          return "五";
        case 6:
          return "六";
        case 7:
          return "七";
      }
    },
    countPosition: function() {
      const pWidth = this.$refs.line.getBoundingClientRect().width;

      const divide = pWidth / (7 - 1);

      const parentPositionLeft = document
        .querySelector(".progressbar_flag")
        .getBoundingClientRect().left;

      const currFlagItem = document.querySelector(
        ".progressbar_flag_item_curr"
      );

      const curIndex = this.curIndex > 0 ? this.curIndex - 1 : 0;

      let itemCurrPositionLeft = 0;

      if (currFlagItem) {
        itemCurrPositionLeft = currFlagItem.getBoundingClientRect().left;
        this.percent = itemCurrPositionLeft - parentPositionLeft;
      }
    },
    onBigAwardFn(index) {
       console.log(index);
     /*  if (index === 2) {
        this.onSecondHandler();
        return;
      }

      this.onMaxHandler(); */
    },
    onSecondHandler() {
      if (this.curIndex === -1) return;
      if (this.curIndex < 2) return;

      //抽过
      if (this.userStatus.IsSpecifyDayLottery) return;

      try {
        if (!HtmlInterface.isNetConnect()) {
          eventBus.$emit("connectError");
        }
      } catch (err) {}
      sendGainAward.sendSecondLotteryHandler();
    },

    onMaxHandler() {
      if (this.curIndex === -1) return;

      if (this.curIndex !== this.maxDay) return;

      console.log("this.isLottery", this.isLottery);
      console.log("this.isShare", this.isShare);

      //不能抽奖，不能分享
      if (!this.isLottery && !this.isShare) return;

      if (this.isLottery) {
        sendGainAward.sevenDayLotteryHandler();
        return;
      }

      if (this.isShare) {
        sendGainAward.share();
      }
    },

    onSevenGainedHandler(status) {
      this.userStatus.IsCanLottery = false;

      //未中奖
      if (status === 2) {
        this.userStatus.IsCanShare = false;
      }
    },

    onSecondGainedHandler() {
      this.userStatus.IsSpecifyDayLottery = true;
    },

    //监听签到回调
    onSignedInHandler() {
      let curIndex = this.userStatus.LastDay;

      curIndex += 1;
      if (curIndex === this.maxDay) {
        this.userStatus.IsCanLottery = true;
      }

      if (curIndex === 2) {
        this.userStatus.IsSpecifyDayLottery = false;
      }

      this.userStatus.LastDay = curIndex;
      setTimeout(() => {
        this.countPosition();
      }, 200);
    },

    //监听分享回调
    onSharedHandler() {
      this.userStatus.IsCanShare = false;
    }
  }
};
</script>
