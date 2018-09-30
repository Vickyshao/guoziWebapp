const getElementOffsetTop = (element) => {
    let offsetTop = element.offsetTop;
    let offsetParent = element.offsetParent;
    while (offsetParent) {
        offsetTop += offsetParent.offsetTop;
        offsetParent = offsetParent.offsetParent;
    }
    return offsetTop;
};

let scrollEventHandler;

export default {
    bind(el, binding, vnode) {
        scrollEventHandler = () => {
            const elementHeight = document.getElementsByClassName('home-search-header')[0].clientHeight;
            const windowScrollY = global.scrollY;
            const isActive = windowScrollY > elementHeight / 236 * 100;
            if (isActive) {
                el.classList.add('fixed-header');
            } else {
                el.classList.remove('fixed-header');
            }
        };
        if (global.addEventListener) {
            global.addEventListener('scroll', scrollEventHandler);
        }
    },
    unbind() {
        if (global.removeEventListener) {
            global.removeEventListener('scroll', scrollEventHandler);
        }
    },
};
