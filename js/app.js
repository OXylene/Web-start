const headerProgressLine = document.querySelector('.header__progress-line')
const headerProgressContainer = document.querySelector('.header__progress-container')

const headerAudio = document.querySelector('.header__audio')

const headerPlayBtn = document.querySelector('.header__play-btn')
const headerPlayImg = document.querySelector('.header__play-img')

const playList = document.querySelector('.music__playlist')
const trackList = document.querySelectorAll('.music__player-text')
const playBtn = document.querySelector('.music__play-btn')
const playImg = document.querySelector('.music__play-img')

const musicAudio = document.querySelector('.music__audio')

const progressContainer = document.querySelector('.music__progress-container')
const progressLine = document.querySelector('.music__progress-line')

const musicWrapper = document.querySelector('.music__img-wrapper')
const musicImgBox = document.querySelector('.music__img-box')

const infoImg = document.querySelectorAll('.info__img')

const nav = document.querySelector('.header__nav')
const burger = document.querySelector('.burger')
const overlay = document.querySelector('.overlay')

const links = document.querySelectorAll('a')

// BURGER AND OVERLAY
window.addEventListener('DOMContentLoaded', checkScroll)
window.addEventListener('scroll', checkScroll)

for (let linkItem of links) {
  linkItem.addEventListener('click', () => {
    if (nav.classList.contains('header__nav--active')) {
      nav.classList.remove('header__nav--active')
      overlay.classList.remove('overlay--active')
      checkScroll()
    }
  })
}

function checkScroll() {
  let scrollPos = window.scrollY

  if((nav.classList.contains('header__nav--active') === false) && (scrollPos > 0))  {
    burger.classList.add('burger--follow') 
  } else {
    burger.classList.remove('burger--follow')
  }
}

burger.addEventListener('click', () => {
  let scrollPos = window.scrollY
  if (scrollPos === 0) {
    burger.classList.toggle('burger--follow')
  }
  burger.classList.toggle('burger--follow')
  nav.classList.toggle('header__nav--active')
  overlay.classList.toggle('overlay--active')
})

overlay.addEventListener('click', function () {
  if (nav.classList.contains('header__nav--active')) {
    nav.classList.remove('header__nav--active')
    overlay.classList.remove('overlay--active')
    checkScroll()
  } else {
    nav.classList.add('header__nav--active')
    burger.classList.remove('burger--follow')
    overlay.classList.add('overlay--active')
  }
})

// HEADER AUDIO

headerPlayBtn.addEventListener('click', () => {
  pauseAudio()

  if (headerAudio.classList.contains('play')) {
    headerAudio.classList.remove('play')
    headerPlayImg.classList.remove('play-img--active')
    headerPlayImg.src = './images/icons/play_icon.svg'
    headerAudio.pause()
    return
  }
  headerPlayImg.src = './images/icons/pause_icon.svg'
  headerAudio.classList.add('play')
  headerPlayImg.classList.add('play-img--active')
  headerAudio.play()

})

for (let infoImgItem of infoImg) {
  infoImgItem.addEventListener('click', function() {
    for (let i = 0; i < 2; i++) {
      infoImg[i].classList.remove('info__img--active')
    }
    infoImgItem.classList.add('info__img--active')
  })
}

// AUDIO PLAYER

function playAudio() {
  musicAudio.play()

  animateMusicImg()

  headerAudio.pause()
  headerPlayImg.src = './images/icons/play_icon.svg'
  headerPlayImg.classList.remove('play-img--active')
  headerAudio.classList.remove('play')  

  playImg.src = './images/icons/pause_icon.svg'
  musicAudio.classList.add('play')
  playImg.classList.add('music__play-img--active')
}

function pauseAudio() {
  musicAudio.pause()

  deanimateMusicImg()

  playImg.src = './images/icons/play_icon.svg'
  musicAudio.classList.remove('play')
  playImg.classList.remove('music__play-img--active')
}

function animateMusicImg() {
  musicImgBox.classList.add('music__img-box--active')
  musicWrapper.classList.add('music__img-wrapper--active')
}

function deanimateMusicImg() {
  musicImgBox.classList.remove('music__img-box--active')
  musicWrapper.classList.remove('music__img-wrapper--active')
}

for (let track of trackList) {
  track.addEventListener('click', function() {
  for (let i = 0; i < 6 ; i++ ) {
    trackList[i].classList.remove('music__player-text--active')
  }
  musicAudio.src = `./audio/${track.innerText}.mp3`
  track.classList.add('music__player-text--active')
  
  musicAudio.classList.add('play')
  playImg.classList.add('music__play-img--active')

  playAudio()
  })
}


playBtn.addEventListener('click', () => {
  if (musicAudio.classList.contains('play')) {
    
    pauseAudio()
    return
  }
  playAudio()
})

// Progress bar
function updateProgress(e) {
  const {duration, currentTime} = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progressLine.style.width = `${progressPercent}%`
}

musicAudio.addEventListener('timeupdate', updateProgress)

// Set progress
function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = musicAudio.duration

  musicAudio.currentTime = (clickX / width) * duration
}
progressContainer.addEventListener('click', setProgress)

// Get time
musicAudio.ontimeupdate = function() {
  const currTime = Math.floor(musicAudio.currentTime)
  const duration = Math.floor(musicAudio.duration)

  if (isNaN(duration)) {
    return
  }

  const durMinutes = Math.floor(duration / 60)
  const durSeconds = duration % 60

  const currMinutes = Math.floor(currTime / 60)
  const currSeconds = currTime % 60


  if (currSeconds < 10) {
    document.querySelector('.music__play-time').textContent = `0${currMinutes}:0${currSeconds}-0${durMinutes}:${durSeconds}`
  } else {
    document.querySelector('.music__play-time').textContent = `0${currMinutes}:${currSeconds}-0${durMinutes}:${durSeconds}`
  }
}

// Header Progress bar
function headerUpdateProgress(e) {
  const {duration, currentTime} = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  headerProgressLine.style.width = `${progressPercent}%`
}

headerAudio.addEventListener('timeupdate', headerUpdateProgress)

// Header Set progress
function headerSetProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = headerAudio.duration

  headerAudio.currentTime = (clickX / width) * duration
}
headerProgressContainer.addEventListener('click', headerSetProgress)

// Header Get time
headerAudio.ontimeupdate = function() {
  const currTime = Math.floor(headerAudio.currentTime)
  const duration = Math.floor(headerAudio.duration)

  if (isNaN(duration)) {
    return
  }

  const durMinutes = Math.floor(duration / 60)
  const durSeconds = duration % 60

  const currMinutes = Math.floor(currTime / 60)
  const currSeconds = currTime % 60


  if (currSeconds < 10) {
    document.querySelector('.header__play-time').textContent = `0${currMinutes}:0${currSeconds}-0${durMinutes}:${durSeconds}`
  } else {
    document.querySelector('.header__play-time').textContent = `0${currMinutes}:${currSeconds}-0${durMinutes}:${durSeconds}`
  }
}


document.addEventListener('keydown', (event) => {
if (event.code == 'Space') {
  event.preventDefault()

  headerAudio.pause()
  headerPlayImg.src = './images/icons/play_icon.svg'
  
  pauseAudio()
}
})


// SWIPER

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  slidesPerView: 1,
  spaceBetween: 30,
  effect: 'slide',

  // Navigation arrows
  navigation: {
    nextEl: '.tours__swiper-next',
    prevEl: '.tours__swiper-prev',
  },

  breakpoints: {
    1001: {
      slidesPerView: 3,
    },
    701: {
      slidesPerView: 2,
    }
  }
});

