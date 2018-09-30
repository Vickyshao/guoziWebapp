export default{
  formatImg (img, size) {
    if (img) {
        const index = img.lastIndexOf('.');
        return img.slice(0, index) + size + img.slice(index, img.length);
    }else{
        return '/public/img/rectangle-10.png'
    }
  }
}
