// 接口请求地址
export const SERVERURL = (() => {
    // tslint:disable-next-line
    const mode = import.meta.env.MODE;
    switch (mode) {
        case 'dev':
            return 'https://chenkai-data.centmap.com:12081';
            // return 'https://tst-data.centmap.com:8443';
        case 'test':
            return 'https://tst-data.centmap.com:8443';
        default:
            return 'https://data.centmap.com';
    }
})();

// 全文搜索引擎接口请求地址
export const SEARCHURL = (() => {
    // tslint:disable-next-line
    const mode = import.meta.env.MODE;
    switch (mode) {
        case 'dev':
            return 'https://chenkai-data.centmap.com:12077';
        case 'test':
            return 'https://search-serv.centmap.com:8443';
        default:
            return 'https://search-serv.centmap.com';
    }
})();

// 地图地址
export const MAPSERVERURL = (() => {
    // tslint:disable-next-line
    const mode = import.meta.env.MODE;
    switch (mode) {
        case 'dev':
            return 'https://chenkai-data.centmap.com:12066';
        case 'test':
            return 'https://tst-sdk.centmap.com:8443';
        default:
            return 'https://sdk.centmap.com';
    }
})();

// 校验工具地址
export const CORRECTURL = (() => {
    // tslint:disable-next-line
    const mode = import.meta.env.MODE;
    switch (mode) {
        case 'dev':
            return 'https://tool.centmap.com:8443/corrector/tst';
        case 'test':
            return 'https://tool.centmap.com:8443/corrector/tst';
        default:
            return 'https://tool.centmap.com:8443/corrector/';
    }
})();

// 验收链接
export const LINKURL = (() => {
    // tslint:disable-next-line
    const mode = import.meta.env.MODE;
    switch (mode) {
        case 'dev':
            return 'https://chai-data.centmap.com:5000';
        case 'test':
            return 'https://tst-data.centmap.com:8443';
        default:
            return 'https://data.centmap.com';
    }
})();