//日期工具
let dateUtils: { [key: string]: any } = {};
//日期替换正则
let replaceRag = /d{1,2}|D{1,2}|M{1,4}|y{1,4}|Y{1,4}|K{1,4}|W{1,2}|S{1,3}|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;

const dayNames = ['日', '一', '二', '三', '四', '五', '六'];

//补0
function pad(val: number | string, len?: number) {
    val = String(val);
    len = len || 2;
    while (val.length < len) {
        val = '0' + val;
    }
    return val;
}


//格式化方法
let formatFlags: { [key: string]: any } = {
    W: function (dateObj: Date, weekNumber: any) { //一位周
        return weekNumber;
    },
    WW: function (dateObj: Date, weekNumber: any) { //二位周
        return pad(weekNumber);
    },
    K: function (dateObj: Date) { //一位周
        return dateObj.getDay();
    },
    KK: function (dateObj: Date) { //两位周
        return pad(dateObj.getDay());
    },
    KKKK: function (dateObj: Date) {//中文周
        return '星期' + dayNames[dateObj.getDay()];
    },
    d: function (dateObj: Date) {//一位日
        return dateObj.getDate();
    },
    dd: function (dateObj: Date) {//两位日
        return pad(dateObj.getDate());
    },
    D: function (dateObj: Date) { //一位日中文
        return dateObj.getDate() + '日';
    },
    DD: function (dateObj: Date) { //两位日中文
        return pad(dateObj.getDate()) + '日';
    },
    M: function (dateObj: Date) { //一位月
        return dateObj.getMonth() + 1;
    },
    MM: function (dateObj: Date) { //两位月
        return pad(dateObj.getMonth() + 1);
    },
    MMM: function (dateObj: Date) {//一位月中文
        return dateObj.getMonth() + '月';
    },
    MMMM: function (dateObj: Date) { //两位月中文
        return pad(dateObj.getMonth() + 1) + '月';
    },
    yy: function (dateObj: Date) { //2位年
        return String(dateObj.getFullYear()).substr(2);
    },
    yyyy: function (dateObj: Date) { //4位年
        return dateObj.getFullYear();
    },
    YY: function (dateObj: Date) { //2位年中文
        return dateObj.getFullYear() + '年';
    },
    YYYY: function (dateObj: Date) { //4位年中文
        return dateObj.getFullYear() + '年';
    },
    h: function (dateObj: Date) { //12小时制
        return dateObj.getHours() % 12 || 12;
    },
    hh: function (dateObj: Date) { //12小时补零制
        return pad(dateObj.getHours() % 12 || 12);
    },
    H: function (dateObj: Date) { //24小时制
        return dateObj.getHours();
    },
    HH: function (dateObj: Date) { //24小时制补零
        return pad(dateObj.getHours());
    },
    m: function (dateObj: Date) { //分钟
        return dateObj.getMinutes();
    },
    mm: function (dateObj: Date) { //分钟补零
        return pad(dateObj.getMinutes());
    },
    s: function (dateObj: Date) { //秒
        return dateObj.getSeconds();
    },
    ss: function (dateObj: Date) { //秒补零
        return pad(dateObj.getSeconds());
    },
    S: function (dateObj: Date) { //1位毫秒
        return Math.round(dateObj.getMilliseconds() / 100);
    },
    SS: function (dateObj: Date) { //2位毫秒
        return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
    },
    SSS: function (dateObj: Date) { //3位毫秒
        return pad(dateObj.getMilliseconds(), 3);
    },
    a: function (dateObj: Date) { //带12小时标识小写
        return dateObj.getHours() < 12 ? 'am' : 'pm';
    },
    A: function (dateObj: Date) { //带12小时标识大写
        return dateObj.getHours() < 12 ? 'am'.toUpperCase() : 'pm'.toUpperCase();
    },
    ZZ: function (dateObj: Date) {
        var o = dateObj.getTimezoneOffset();
        return (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4);
    }
};

//默认格式化快捷方式
dateUtils.defaultFormat = {
    defaultDate: 'ddd MMM dd yyyy HH:mm:ss',
    shortDate: 'M/D/yy',
    mediumDate: 'MMM d, yyyy',
    longDate: 'MMMM d, yyyy',
    fullDate: 'dddd, MMMM d, yyyy',
    shortTime: 'HH:mm',
    mediumTime: 'HH:mm:ss',
    longTime: 'HH:mm:ss.SSS'
} as { [key: string]: any };

//日期格式化
dateUtils.format = function (dateObj: any, weekNumber: any, format: string) {

    if (typeof dateObj === 'number') {
        dateObj = new Date(dateObj);
    }

    if (Object.prototype.toString.call(dateObj) !== '[object Date]' || isNaN(dateObj.getTime())) {
        throw new Error('Invalid Date in dateUtils.format');
    }

    //格式化格式
    format = dateUtils.defaultFormat[format] || format || dateUtils.defaultFormat.defaultDate;

    return format.replace(replaceRag, function ($0) {
        return $0 in formatFlags ? formatFlags[$0](dateObj, weekNumber) : $0.slice(1, $0.length - 1);
    });
};

export default dateUtils;