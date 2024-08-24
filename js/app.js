const slides = document.querySelectorAll('.slide')
const icon = document.querySelector('.info__icon')
const descr = document.querySelector('.info__descr')
const container = document.querySelector('.container')

for (const slide of slides) {
	slide.addEventListener('click', () => {
		clearActiveClasses()

		slide.classList.add('active')
	})
}

function clearActiveClasses() {
	slides.forEach((slide) => {
		slide.classList.remove('active')
	})
}

icon.addEventListener('mouseenter', ()=> {
	container.classList.add('transparent')
	setTimeout(function() {descr.classList.add('displayed')},400)
})

icon.addEventListener('mouseleave', ()=> {
	descr.classList.remove('displayed')
	setTimeout(function() {container.classList.remove('transparent')},400)
})