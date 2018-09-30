exports.install = function (Vue) {
    Vue.prototype.$noEmoji = function (str) {
        return str.replace(/\ud83c[\udd00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]|[\u2600-\u2800]|[\u200D]|[\uFE0F]|[\u231A-\u23FF]/g, '');
    };
};
