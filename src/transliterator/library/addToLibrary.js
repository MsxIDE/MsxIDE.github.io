const enTest = [
  ['1','2','3']
]
const ruTest = [
  ['1','2','3']
]
const fiTest = [
  ['1','2','3']
]
const faTest = [
  ['1','2','3']
]

const enInput = document.querySelector('#en')
const ruInput = document.querySelector('#ru')
const fiInput = document.querySelector('#fi')
const faInput = document.querySelector('#fa')
const addBtn = document.querySelector('.addPhraseBtn')

addBtn.addEventListener('click', () => {
  //checking all fields for being filled
  console.log(enInput.value, ruInput.value, fiInput.value, faInput.value)
  if ((enInput.value === '') || (ruInput.value === '') || (fiInput.value === '') || (faInput.value === '')) {
    alert('Fill all fields!')
  } else {
    addToLibrary()
    alert('Successfully added!')
  }
})

function addToLibrary() {
  let question = false
  let exclamation = false
  //removing whitespaces from inputs
  let enStr = (enInput.value).trim()
  let ruStr = (ruInput.value).trim()
  let fiStr = (fiInput.value).trim()
  let faStr = (faInput.value).trim()

  //checking having question mark
  if (enStr.endsWith('?')) {
    question = true
    enStr = enStr.slice(0, -1)
  }
  if (ruStr.endsWith('?')) {
    question = true
    ruStr = ruStr.slice(0, -1)
  }
  if (fiStr.endsWith('?')) {
    question = true
    fiStr = fiStr.slice(0, -1)
    
  }
  if (faStr.endsWith('؟')) {
    question = true
    faStr = faStr.slice(0, -1)
  }

  //checking having exclamation mark
  if (enStr.endsWith('!')) {
    exclamation = true
    enStr = enStr.slice(0, -1)
  }
  if (ruStr.endsWith('!')) {
    exclamation = true
    ruStr = ruStr.slice(0, -1)
  }
  if (fiStr.endsWith('!')) {
    exclamation = true
    fiStr = fiStr.slice(0, -1)
    
  }
  if (faStr.endsWith('!')) {
    exclamation = true
    faStr = faStr.slice(0, -1)
  }

  //adding string to array
  const enArrToAdd = enStr.split(' ')
  const ruArrToAdd = ruStr.split(' ')
  const fiArrToAdd = fiStr.split(' ')
  const faArrToAdd = faStr.split(' ')

  //adding question and exclamation marks if needed
  if (question) {
    enArrToAdd.push('?')
    ruArrToAdd.push('?')
    fiArrToAdd.push('?')
    faArrToAdd.push('؟')
  }
  if (exclamation) {
    enArrToAdd.push('!')
    ruArrToAdd.push('!')
    fiArrToAdd.push('!')
    faArrToAdd.push('!')
  }

  //adding to library
  en.push(enArrToAdd)
  ru.push(ruArrToAdd)
  fi.push(fiArrToAdd)
  fa.push(faArrToAdd)

  console.log(en,ru,fi,fa)
}