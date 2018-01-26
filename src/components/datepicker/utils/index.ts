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
    const day = result.getDay();

    if (day === offsetWeek) {
        result.setTime(result.getTime() - DAY_DURATION * 7);
    } else {
        const offset = getOffsetToWeekOrigin(day, offsetWeek);
        result.setTime(result.getTime() - DAY_DURATION * offset);
    }

    return result;
};

export function getOffsetToWeekOrigin(day: number, offsetWeek = 0) {
    let offset = day >= offsetWeek ? day - offsetWeek : 7 + day - offsetWeek;
    offset = offset === 0 ? 7 : offset
    return offset
}