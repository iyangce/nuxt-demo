
/* eslint-disbale */
import Vue from 'vue';
import base from 'assets/js/common';
import { domain, interFace } from '../config/urlDefine';
import merge from '../util/merge';
import Loading from 'components/loading/manager';
import axios from 'axios';
import G from '../config/GlobalVar';
import Message from 'components/toast';
import awardAlert from 'components/dialog/awardDialog.vue';
import alert from 'components/dialog/commonModal.vue';
import { eventBus, eventMsg } from '../events/systemEvent';
import store from '../util/storage';
import appInterFace from '../plugins/appInterface/index';

import MessageBox from 'components/dialog';

Vue.use(appInterFace);
const $appInterFace = Vue.$bee.appInterface;

const $alert = MessageBox.alert;

const showToast = (msg) => {
    Message({
        text: msg
    });
};

const showAlert = (component, options) => {
    const params = merge({}, {}, options);

    $alert(component, params);
};

const showAward = (type, result) => {
    const msg = '';

    if (result) {
        let isCanShare = G.userInfo.IsCanShare;

        if (type === 2) {
            isCanShare = false;
        }
        const awardType = result.AwardType;

        showAlert(awardAlert, {
            msg: msg,
            awardName: result.Name,
            isHF: awardType === 3,
            isCanShare: isCanShare,
            callback: function(action) {
                if (action === 'confirm') {
                    handler.share(result.Name);
                }
            }
        });
    }
};

const handler = {
    test() {
        showAlert(awardAlert, {
            msg: '112121',
            awardName: '额喂喂喂问问',
            isHF: false,
            isCanShare: false,
            callback: function(action) {
                if (action === 'confirm') {

                }
            }
        });
    },
    /**
     * @function 处理只有签到功能
     * @return {object} 数据
     */
    onlySignHandler(result) {
        console.log('只有签到功能，', result);
        showAlert(awardAlert, {
            msg: '',
            awardName: result.Name,
            isHF: false,
            isCanShare: false,
            callback: function(action) {

            }
        });
    },
    sendSecondLotteryHandler() {
        const self = this;

        const headerInfo = base.getHeaderInfo();

        Loading.show('获取奖励中');
        axios.get(domain.TcySysWebApi + interFace.lottery, {
            headers: headerInfo,
            params: {
                index: 2
            }
        }).then(function(response) {
            const _status = response.data.Status;

            Loading.hide();
            if (response.data.Successed) {
                const responseData = response.data.Data;

                if (responseData) {
                    eventBus.$emit(eventMsg.SECOND_GAINED);

                    if (_status === 2) {
                        showToast('很遗憾，您没有中奖');
                        return;
                    }
                    showAward(2, responseData);
                    return;
                }
            }
            //手机号未绑定
            if (_status === 1) {
                showAlert(alert, {
                    msg: '为了奖励安全到账，请先绑定手机号！',
                    callback: function(action) {
                        if (action === 'confirm') {
                            self.bindMobileHandler();
                        }
                    }
                });
                return;
            }

            showToast(response.data.Message);
        }).catch(function(error) {
            Loading.hide();
            eventBus.$emit(eventMsg.CONNECTERROT);
        });
    },
    sevenDayLotteryHandler() {
        const self = this;

        const headerInfo = base.getHeaderInfo();

        Loading.show('获取奖励中');
        axios.get(domain.TcySysWebApi + interFace.lottery, {
            headers: headerInfo,
            params: {
                index: 7
            }
        }).then(function(response) {
            Loading.hide();
            const _status = response.data.Status;

            if (response.data.Successed) {
                const responseData = response.data.Data;

                if (responseData) {
                    eventBus.$emit(eventMsg.SEVEN_GAINED, _status);

                    if (_status === 2) {
                        showToast('很遗憾，您没有中奖');
                        return;
                    }
                    store.setItem('awardName', responseData.Name);
                    showAward(7, responseData);
                    return;
                }
            }
            //手机号未绑定
            if (_status === 1) {
                showAlert(alert, {
                    msg: '为了奖励安全到账，请先绑定手机号！',
                    callback: function(action) {
                        if (action === 'confirm') {
                            self.bindMobileHandler();
                        }
                    }
                });
                return;
            }

            showToast(response.data.Message);
        }).catch(function(error) {
            Loading.hide();
            eventBus.$emit(eventMsg.CONNECTERROT);
        });
    },
    sendShareHandler() {
        const self = this;

        Loading.show('获取分享奖励中');
        const params = base.getHeaderInfo();

        axios.get(domain.TcySysWebApi + interFace.share, {
            headers: params
        }).then(function(response) {
            Loading.hide();
            if (response.data && response.data.Successed) {
                const responseData = response.data.Data;

                const awardType = responseData.AwardType;

                eventBus.$emit(eventMsg.SHARED);

                showAlert(awardAlert, {
                    awardName: responseData.Name,
                    isHF: awardType == 3
                });
            } else {
                showToast(response.data.Message);
            }
        }).catch(function(error) {
            Loading.hide();
            showToast('网络异常');
        });
    },
    share(awardName) {
        if (awardName === '' || typeof awardName === 'undefined') {
            awardName = store.getItem('awardName');
        }

        $appInterFace.shareToWX({
            title: '这么牛的签到活动你不来看看?',
            content: '我在同城游签到获得' + awardName + '，快来同城游，更多好礼等你来拿，还有最地道的本地游戏等你来玩',
            shareUrl: domain.shareDomain,
            backFn(code) {
                console.log('code--------------', code);
                const isShared = code == 1;

                if (isShared) {
                    handler.sendShareHandler();
                }
            }
        });
    },
    bindMobileHandler() {
        base.getAppMethod('openAccountSafeActivity');
    }
};

export default handler;
