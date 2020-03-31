/**
 * @function 打开新的页面：例如打开配置的广告页面
 * @param  {string} url 页面地址
 * @param  {number} n 标识对应到statistics.js中
 */
export function openNewPage(url, n) {
    if (url === '') {
        return;
    }
    // 数据埋点
    Topi.gDataCommon.baseHeadInfo.system == '1' ? Topi.gDataRecordByBaidu('A' + n) : Topi.gDataRecordByBaidu('B' + n);
    window.location.href = url;
}