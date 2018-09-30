import moment from 'moment';

moment.locale('zh-cn');

export function timeAgo(time) {
    const now = moment();
    const target = moment(time);

    // 1小时内显示刚刚
    if (now.diff(target, 'hours') < 1) {
        return '刚刚';
    }
    // 今天的时间显示多少小时前
    if (now.isSame(target, 'day')) {
        return target.fromNow();
    }
    // 昨天的时间显示为昨天
    if (now.isSame(target.clone().add(1, 'days'), 'day')) {
        return '昨天';
    }
    // 其余时间显示日期
    return target.format('YYYY-MM-DD');
}

export function time(value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss'; // eslint-disable-line
    // return moment(value).format(formatString);
    if (value) {
        return value.split('T').join(' ');
    }
}

export function splitTime(value, formatString) {
    if (value) {
        return value.split('T')[0];
    }
}
/**
 * @description 把钱拆分为元和角分
 * @param {float} value RMB
 * @param {integer} index 获取类型：0 - 元；1 = 角分
 * @return 根据类型分别返回元或角分
 */
export function splitFloat(value, index) {
    if (typeof (value) === 'undefined') {
        return false;
    }

    const priceArray = value.toString().split('.');
    if (index === 1) {
        if (priceArray.length === 1) return '00';
        if (priceArray[1].length < 2) return `${priceArray[1]}0`;
    }
    return priceArray[index];
}

export function toFixed(value, count) {
    const num = Number(value).toFixed(count);
    return num;
}

export function emoji(text) {
    return text.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
}

export function fomartPhone(phone) { // eslint-disable-line
    if (phone.length === 11) {
        return phone.replace(/\s/g, '').replace(/\B(?=(?:\d{4})+$)/g, '-');
    } else if (phone.length === 10) {
        const temp = phone;
        return `${temp.substring(0, 3)}-${temp.substring(3, 6)}-${temp.substring(6, 10)}`;
    } else { // eslint-disable-line
        return phone;
    }
}

export function formatImg(img, size) {
    if (img) {
        const index = img.lastIndexOf('.');
        return img.slice(0, index) + size + img.slice(index, img.length);
    } else { //eslint-disable-line
        return '/public/img/rectangle-10.png';
    }
}
