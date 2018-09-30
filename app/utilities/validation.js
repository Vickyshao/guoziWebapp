export default {
    filterEmoji(str) {
        if (!str) {
            return str;
        }
        // NOTE: 该死的苹果 emoji，已放弃.
        str = str.toString();
        return str.replace(/\ud83c[\udc00-\udfff]|\ud83d[\udc00-\udfff]|[\u2000-\u2fff]/g, "");
    },
    isPhoneNum(str) {
        return /^1(3|4|5|7|8)\d{9}$/.test(str);
    },
    isAddress(str) {
        if (str.replace(/ /g, '') === '') {
          return false;
        }
        str = str ? this.filterEmoji(str.toString()) : '';
        return str.length < 31 && str.length > 0;
    },
    isUserName(str) {
        if (str.replace(/ /g, '') === '') {
            return false;
        }
        str = str ? this.filterEmoji(str.toString()) : '';
        return str.length < 16 && str.length > 0;
    },
    isEmpty(str) {
        return typeof str === 'undefined' || str === '';
    }
};
