import { addPush } from 'assets/js/tool/statistics'; // 数据埋点
import { gDataCommon } from 'assets/js/commdata.js'; // 全局公用的数据
import { formate } from 'assets/js/tool/formate.js'; // 格式化数据
import { openNewPage } from 'assets/js/tool/openNewPage.js'; // 打开新的页面

export function initGlobal() {
    global.Topi = {
        gDataRecordByBaidu: addPush, // 百度统计数据埋点
        gDataCommon: gDataCommon, // 全局数据（由接口返回后赋值的那种）
        gFormate: formate, // 格式化数据
        gOpenNewPage: openNewPage // 打开新的页面
    };
}
