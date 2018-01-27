//模式选择
export const SELECTION_MODE = {
    YEAR: 'year',
    MONTH: 'month',
    WEEK: 'week',
    DAY: 'day'
}
//view展示
export const PICKER_VIEWS = {
    YEAR: 'year',
    MONTH: 'month',
    DATE: 'date',
}

//header头展示
export const WEEKS = ['日', '一', '二', '三', '四', '五', '六'];

//一天时长
export const DAY_DURATION = 86400000;

//获取当月第一天
export const getFirstDayOfMonth = function (date: Date) {
    const temp = new Date(date.getTime());
    temp.setDate(1);
    return temp.getDay();
};

//获取当月天数
export const getDayCountOfMonth = function (year: number, month: number) {
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
export const getStartDateCellOfMonth = function (year: number, month: number, offsetWeek = 0) {
    const result = new Date(year, month, 1);
    const day = result.getDay(); //当月1号为一周第几天

    if (day === offsetWeek) { //周日向前补一周
        result.setTime(result.getTime() - DAY_DURATION * 7);
    } else {
        const offset = getOffsetToWeekOrigin(day, offsetWeek); //偏移天数
        result.setTime(result.getTime() - DAY_DURATION * offset);
    }

    return result;
};

//计算一周偏移天数
export function getOffsetToWeekOrigin(day: number, offsetWeek = 0) {
    let offset = day >= offsetWeek ? day - offsetWeek : 7 + day - offsetWeek;
    offset = offset === 0 ? 7 : offset
    return offset
}

//时间置零
export const clearHours = function (time: Date) {
    const cloneDate = new Date(time);
    cloneDate.setHours(0, 0, 0, 0);
    return cloneDate.getTime();
};

//计算周号
export const getWeekNumber = function (src: Date) {
    const date = new Date(src.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};