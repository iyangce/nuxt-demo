/**
 * @common
 * @author  stylehuan
 * @create  2016-12-05 11:38
 */
/*eslint-disbale */

var _signIn = {};

_signIn.transformType = function(type) {
    switch (type) {
        case 1:
            return '银两';
        case 2:
            return '礼券';
        case 3:
            return '话费';
        case 4:
            return '红包';
        default:
            return '未知';
    }
};
_signIn.getHeaderInfo = () => {
    return null;
};
export default _signIn;
