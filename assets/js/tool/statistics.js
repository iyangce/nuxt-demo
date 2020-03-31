/**
 * @function 得到埋点的数据内容
 * @param  {string} name 标识
 * @return {string} 埋点的数据内容
 */
function getCzcList(name) {
    const czcList = {
        // 安卓的广告
        A1: '页面广告11001',
        A2: '结果页按钮跳转广告11005',
        A3: '弹窗广告11005',

        // iOS的广告
        B1: '页面广告21001',
        B2: '结果页按钮跳转广告21005',
        B3: '弹窗广告21005',
    };

    return czcList[name];
}

function addPush(type) {
    const action = getCzcList(type);
    const category = Topi.gFormate.dataFormat(Date.now()); // 点击时间
    const unionid = Topi.gDataCommon.baseHeadInfo.IMEI; // 设备号

    try {
        // _hmt.push([‘_trackEvent’, category, action, opt_label,opt_value]);
        _hmt.push(['_trackEvent', category, action, unionid]);
        console.log('数据埋点：' + category + '+' + action + '+' + unionid);
    } catch (error) {
        console.log('埋点error信息：');
        console.log(error);
    }
}

export { addPush }