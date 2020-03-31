/**
 * @base
 * @author  stylehuan
 * @create  2017-04-19 19:27
 */
(function (SNAIL) {
    var _w = window;
    var _callError = SNAIL.cllClientError = () => {
        try {
            let _href = window.location.href.replace(/#\/.*/g, '');
            HtmlInterface.isWebHasError(true, _href);
        } catch (e) {
            console.log(e);
        }
    };
    _w.onerror = function () {
        console.log(111);
        _callError();
    };
})(window.SNAIL || (window.SNAIL = {}));