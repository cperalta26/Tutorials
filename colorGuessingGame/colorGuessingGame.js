let numSquares = 6
let colors = []
let pickedColor
let colorDisplay = document.getElementById('colorDisplay')
const squares = document.getElementsByClassName('square')
const messageDisplay = document.getElementById('message')
const h1 = document.querySelector('h1')
const resetButton  = document.querySelector('#reset')
const modeButtons = document.querySelectorAll('.mode')

init()

function init() {
  setupModeButtons()
  setupSquares()
  reset()
}

function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', function(){
      modeButtons[0].classList.remove('selected')
      modeButtons[1].classList.remove('selected')
      this.classList.add('selected')
      this.textContent === 'Easy' ? numSquares = 3 : numSquares = 6
      reset()
    })
  }
}

function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    //add click listeners to squares
    squares[i].addEventListener('click', function () {
      //grab color of clicked square
      const clickedColor = this.style.backgroundColor
      //compare color to pickedColor
      if (clickedColor === pickedColor) {
        messageDisplay.innerText = 'Correct!'
        changeColors(clickedColor)
        resetButton.textContent = 'Play Again?'
        h1.style.backgroundColor = clickedColor
      } else {
        this.style.backgroundColor = '#232323'
        messageDisplay.innerText = 'Try Again'
      }
    })
  }
}

function reset() {
    //generate all new colors
    colors = generateRandomColors(numSquares)
    //pick a new random color from color from array
    pickedColor = pickColor()
    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor
    resetButton.textContent = 'New Colors'
    //change colors of squares
    for (var i = 0; i < squares.length; i++) {
      if (colors[i]) {
        squares[i].style.display = 'block'
        squares[i].style.backgroundColor = colors[i]
      } else {
        squares[i].style.display = 'none'
      }
    }
    h1.style.backgroundColor = 'steelblue'
    messageDisplay.textContent = ''
}

resetButton.addEventListener('click', () => {
  reset()
})

function changeColors (color){
  //loop through all squares
  for (var j = 0; j < squares.length; j++) {
    //change each color to match given color
    squares[j].style.backgroundColor = color
  }
}

function pickColor () {
  const random = Math.floor(Math.random() * colors.length)
  return colors[random]
}

function generateRandomColors(num) {
  let arr = []
  //repeat num times
  for (var i = 0; i < num; i++) {
    //get random color and push into array
    arr.push(randomColor())
  }
  //return that array
  return arr
}

function randomColor() {
  //pick a "red" from 0 - 255
  const red = Math.floor(Math.random() * 256)
  //pick a "green" from 0 - 255
  const green = Math.floor(Math.random() * 256)
  //pick a "blue" from 0 - 255
  const blue = Math.floor(Math.random() * 256)
  return `rgb(${red}, ${green}, ${blue})`
}
