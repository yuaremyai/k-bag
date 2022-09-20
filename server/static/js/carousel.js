const [left, right] = document.querySelectorAll(".carousel-btn")
const allImages = Array.from(document.querySelectorAll(".carousel-image"))
const carousel = document.querySelector('.carousel-imgs')

let startX = 0
let endX = 0


left.addEventListener('click', scrollLeft)
right.addEventListener('click', scrollRight)

carousel.addEventListener('touchstart', (evt) => {
    startX = evt.changedTouches[0].screenX
});

carousel.addEventListener('touchend', (evt) => {
    endX = evt.changedTouches[0].screenX
    
    if (startX === endX){
        return
    }
    if (startX > endX){
        scrollRight()
        return
    }
    if (startX < endX){
        scrollLeft()
        return
    }
});

function removeActive(){
    let active = document.querySelector(".carousel-image.active")
    let i = allImages.indexOf(active)
    active.classList.remove('active')
    return i
}

function scrollLeft(){
    i = removeActive()
    i = (i-1 < 0) ? allImages.length-1 : i-1
    allImages[i].classList.add("active")
}


function scrollRight(){
    i = removeActive()
    i = (i+1 > allImages.length - 1) ? 0 : i+1
    allImages[i].classList.add("active")
}