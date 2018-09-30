var utils = {

    getImgBase64(file, callback) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => callback(reader.result);
    },

    compose(f, g) {
        return (x) => {
            return f(g(x))
        }
    },

    toArray(list, start) {
        start = start || 0
        var i = list.length - start
        var ret = new Array(i)
        while (i--) {
            ret[i] = list[i + start]
        }
        return ret
    },

    upload(serverUrl, file, callback, error) {

        var data = new FormData()
        data.append('Token', 'BCBB0F5480391E6D7E4ACB9F2FA16E8924019E83:wJ6-kr3OZxKvuIDTJENR6p_Ih5s=:eyJkZWFkbGluZSI6MTQ4ODc3MDQ3OCwidWlkIjoxOTQ5LCJhbGJ1bSI6MTIyNTg3MX0=');
        data.append('file', file);
        var xhr = new XMLHttpRequest;
        xhr.open('POST', serverUrl, true);
        xhr.send(data);
        xhr.onload = () => {
            xhr.status == 200 ? callback(JSON.parse(xhr.response)) : null
        };
        xhr.onerror = () => {
            error('上传失败')
        };
    },
    upload2(serverUrl, file, callback, error) {
        var data = new FormData();
        //后端接受 name=files的文件
        data.append('files', file);
        var xhr = new XMLHttpRequest;
        xhr.open('POST', serverUrl, true);
        xhr.send(data);
        xhr.onload = () => {
            xhr.status == 200 ? callback(JSON.parse(xhr.response)) : null
        };
        xhr.onerror = () => {
            error('上传失败')
        };
    }
}
export default utils;
