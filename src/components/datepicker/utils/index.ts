//模式选择
export const SELECTION_MODE: { [key: string]: any } = {
    YEAR: 'year',
    MONTH: 'month',
    WEEK: 'week',
    DAY: 'day'
}
//view展示
export const PICKER_VIEWS: { [key: string]: any } = {
    YEAR: 'year',
    MONTH: 'month',
    DATE: 'date',
}

//header头展示
export const WEEKS: Array<string> = ['日', '一', '二', '三', '四', '五', '六'];

//一天时长
//计算公式:24*3600*1000
export const DAY_DURATION: number = 86400000;

//获取当月第一天是该周的第几天
//计算公式:设置日期日为1，getDay()获取
export const getFirstDayOfMonth: Function = function (date: Date): number {
    const temp: Date = new Date(date.getTime());
    temp.setDate(1);
    return temp.getDay();
};

//获取当月天数
//计算公式:4/6/9/11为30天，1,3,5,7,8,10,12为31天,2月四年一润，百年不润，四百年又润
export const getDayCountOfMonth: Function = function (year: number, month: number): number {
    if (month === 3 || month === 5 || month === 8 || month === 10) {
        return 30;
    }

    if (month === 1) {
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            return 29;
        } else {
            return 28;
        }
    }

    return 31;
};

//获取单元格第一个的日期
//计算公式：当1号为该周第几天减去偏移天数，1号为周日时先前补一周
export const getStartDateCellOfMonth: Function = function (year: number, month: number, offsetWeek: number = 0): Date {
    const result: Date = new Date(year, month, 1);
    const day: number = result.getDay(); //当月1号为一周第几天

    if (day === offsetWeek) { //周日向前补一周
        result.setTime(result.getTime() - DAY_DURATION * 7);
    } else {
        const offset = getOffsetToWeekOrigin(day, offsetWeek); //偏移天数
        result.setTime(result.getTime() - DAY_DURATION * offset);
    }

    return result;
};

//计算一周偏移天数
//一周第几天>偏移基数直减，下于补正，无偏移直接偏移7
export const getOffsetToWeekOrigin: Function = function (day: number, offsetWeek: number = 0): number {
    let offset: number = day >= offsetWeek ? day - offsetWeek : 7 + day - offsetWeek;
    offset = offset === 0 ? 7 : offset
    return offset
}

//时间置零
export const clearHours: Function = function (time: Date): number {
    const cloneDate: Date = new Date(time);
    cloneDate.setHours(0, 0, 0, 0);
    return cloneDate.getTime();
};

//计算某日期是该年第几周
//参考https://stackoverflow.com/questions/7765767/show-week-number-with-javascript
export const getWeekNumber: Function = function (src: Date): number {
    const date: Date = new Date(src.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7); //取当周周四
    const week1: Date = new Date(date.getFullYear(), 0, 4); //以1月4日为第一周
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};