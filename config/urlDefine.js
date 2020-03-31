/**
 * @urlDefine
 * @author  stylehuan
 * @create  2016-12-14 13:15
 */
import base from 'assets/js/common';

var vport = {
    '1505': 'org:1505',
    '1506': 'org:1506',
    '1507': 'org:1507',
    '2505': 'net:2505',
    '': 'net'
};

/**
 * @function 得到广告系统的url
 * @return {string} 系统的url
 */
function getAdUrl() {
    const port = parseInt(window.location.port);

    if (port === 8080) { // 本地
        return '/api/SignInUser/H5ad'; // 本地模拟的数据
        // return 'http://conoper.tcysys.uc108.org:1507'
    }
    if (port === 1507 || port === 1506 || port === 1505) { // 测试版
        return 'http://conoper.tcysys.uc108.' + vport[gport];
    }
    if (port === 2505) { // 预发版
        return 'http://43tcysysconopersvc.tcy365.net:2505';
    }
    return 'http://tcysysconopersvc.tcy365.net'; // 正式版
}

const domain = {
    TcySysWebApi: '',
    shareDomain: 'http://m.tcy365.com/',
    adver: getAdUrl()
    // adver: "//tcysysconopersvc.tcy365.net"
};

const interFace = {
    getInfo: '/api/SignInUser/GetInfo',
    signIn: '/api/SignInUser/SignIn',
    lottery: '/api/SignInUser/Lottery',
    share: '/api/SignInUser/Share',
    advert: '/api/Advert/GetH5Advert'
};

if (!base.isLocal) {
    if (base.isTest) {
        domain.TcySysWebApi = 'http://hd.tcysys.uc108.org:1505';
        domain.adver = '//conoper.tcysys.uc108.org:1507';
    } else if (base.isPre) {
        domain.adver = '//43tcysysconopersvc.tcy365.net:2505';
    }
    domain.TcySysWebApi = '';
}

export { domain, interFace };
