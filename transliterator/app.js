let langPri = en
let langSec = fi
let index


const startBtn = document.querySelector('.start')
const settingsBtn = document.querySelector('.settingsIco')
const applySetBtn = document.querySelector('.applySettings')
const screens = document.querySelectorAll('.screen')
const wordPool = document.querySelector('.wordPool')
const answerPool = document.querySelector('.answer')
const proceedBtn = document.querySelector('.proceed')
const settingMenu = document.querySelector('.menu')
const placeholders = document.querySelectorAll('.placeholder')

startBtn.addEventListener('click', () => {
  screens[0].classList.add('up')
  clearPlaceholders()
  exercise()
})

proceedBtn.addEventListener('click', () => {
  evaluate()
})

settingsBtn.addEventListener('click', () => {
  if (settingMenu.classList.contains('hide')) {
    settingMenu.classList.remove('hide')
  } else {
    settingMenu.classList.add('hide')
  }
})

applySetBtn.addEventListener('click', () => {
  langPri = eval(document.querySelector('input[name = "primLang"]:checked').value)
  langSec = eval(document.querySelector('input[name = "secLang"]:checked').value)
  settingMenu.classList.add('hide')
  clearPlaceholders()
  exercise()
})

function exercise() {  
  //Adding phrase to translate
  const header = document.querySelector('.header')
  index = Math.floor(Math.random() * langPri.length)
  
  if (langPri[index][langPri[index].length - 1] === '?') {
    header.innerHTML = langPri[index][0].charAt(0).toUpperCase() + langPri[index].join(' ').slice(1, -2) + '?'
  } else if (langPri[index][langPri[index].length - 1] === '!') {
    header.innerHTML = langPri[index][0].charAt(0).toUpperCase() + langPri[index].join(' ').slice(1, -2) + '!'
  } else {
    header.innerHTML = langPri[index][0].charAt(0).toUpperCase() + langPri[index].join(' ').slice(1)
  }

  //Filling pool with the words for translation
  const wordsForExercise = Array.from(langSec[index])//duplicates array, DO NOT COPY IT
  wordsForExercise.sort(() => Math.random() -0.5)
  wordsForExercise.forEach(i => wordPool.innerHTML += `<div class="word" draggable="true">${i}</div>`);

  //Handling clicks and transition to answer pool
  const words = document.querySelectorAll('.word')

  let dragged = null
  let spaceOrient = ''

  if (langSec === fa) {
    answerPool.classList.add('faLang')
    spaceOrient = 'spaceForDropLeft'
  } else {
    spaceOrient = 'spaceForDropRight'
  }

  //dragabble functionality for placeholders
  for (const placeholder of placeholders) {
    placeholder.addEventListener('dragover', (event) => {
      event.preventDefault()
    })
    placeholder.addEventListener('dragenter', (event) => {
      if (event.target.classList.contains('word')) {
        event.target.classList.add(spaceOrient)
      }
    })
    placeholder.addEventListener('dragleave', (event) => {
      if (event.target.classList.contains('word')) {
        event.target.classList.remove(spaceOrient)
      }
    })
    placeholder.addEventListener('drop', (event) => {
      event.preventDefault()
      if ((event.target.classList.contains('placeholder') && dragged !== null)) {
        event.target.append(dragged)
      } else if ((event.target.classList.contains('word')) && dragged !== null) {
        event.target.insertAdjacentElement('afterend', dragged)
        event.target.classList = 'word'
        dragged = null
      } 
    })
  }

  //eventListeners for each word
  for (let i = 0; i < words.length; i++) {
    words[i].addEventListener('click', (event) => {
      if (event.target.parentElement.classList.contains('wordPool')) {
        answerPool.append(words.item(i))
      } else {
        wordPool.append(words.item(i))
      }
    }
    )

    words[i].addEventListener('dragstart', (event) => {
      dragged = event.target
      setTimeout(() => event.target.classList.add('hide'), 0)
    })
    words[i].addEventListener('dragend', (event) => {
      event.target.classList.remove('hide')
      dragged = null
    })
  }
}

function clearPlaceholders() {
  wordPool.innerHTML = ''
  answerPool.innerHTML = ''
}

function evaluate() {
  const words = document.querySelectorAll('.word')
  let right = true
  for (let i = 0; i < words.length; i++) {
    if (words[i].parentElement.classList.contains('wordPool')) {
      right = false
    } else if (words[i].innerHTML !== langSec[index][i]) {
      words[i].classList.add('wrong')
      right = false
    }
  }
  if (right) {
    document.querySelector('.answerCheck').classList.add('correctAnswer')
    words.forEach(i => i.classList.remove('wrong'))
    setTimeout(()=> {
      document.querySelector('.answerCheck').classList.remove('correctAnswer')
      dragged = null
      clearPlaceholders()
      exercise()
    }, 1500)  
  } else {
    document.querySelector('.answerCheck').classList.add('wrongAnswer')
    setTimeout(() => {
      document.querySelector('.answerCheck').classList.remove('wrongAnswer')
    }, 1500)
  }
}