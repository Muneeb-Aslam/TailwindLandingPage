const slideBtns = document.querySelectorAll("[data-sliderBtn]")
const slideContainer = document.querySelector("[data-SlideContainer]")
const slides = document.querySelectorAll("[data-slide]")
let index=0;

const removeDisabled = (e)=>e.forEach(el=>el.removeAttribute('disabled'))
const addDisabled = (e)=>e.forEach(el=>el.setAttribute("disabled","true"))

function handleClick(e){
    e.currentTarget.id === "prev" ?index--:index++;
    slideContainer.dispatchEvent(new Event("sliderMove"))
}

slideContainer.addEventListener("sliderMove",()=>{
    slideContainer.style.transform = `translateX(-${index * slides[0].clientWidth}px)`
    removeDisabled(slideBtns)
    index===0 && addDisabled([slideBtns[0]])
})

const sliderObserver = new IntersectionObserver((slide)=>{
    if(slide[0].isIntersecting)
        addDisabled([slideBtns[1]])
},{threshold:.75})
sliderObserver.observe(slides[slides.length-1])

slideBtns.forEach(btn => btn.addEventListener("click",handleClick))