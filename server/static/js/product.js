const images = document.querySelectorAll('.product-image')
images.forEach(element => {
    element.addEventListener('click', (element) => {
        document.querySelector('.product-main-img').src = element.path[0].src
    });
});
