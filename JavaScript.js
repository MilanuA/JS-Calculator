let open = 0;
let closed = 0;
let openBracket = '('
let closedBracket = ')'
let operations = ["+", "-", "*","/"]

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.Clear()
    }
  
    Clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      open = 0;
      closed = 0;
    }
  
    Delete() {    
      let lastCharacter =  this.currentOperand.toString().slice(-1)

      if(lastCharacter === closedBracket)
      closed--;
      if(lastCharacter === openBracket)
      open--;

      this.currentOperand = this.currentOperand.toString().slice(0,-1)

      if(!this.currentOperand.includes(closedBracket))      
      closed = 0;

      if(!this.currentOperand.includes(openBracket)) 
      open = 0;
    }


    AppendBracket(bracket){ 
      let position = this.currentOperand.toString().slice(-1)
      let placed = true;

     operations.forEach(operation =>{
       if(position == operation)
       placed = false;
     })   

      if(bracket === closedBracket && closed >= open  || bracket === closedBracket && !placed)  return

      if(bracket === openBracket && !isNaN(position) && position != '')
      this.currentOperand += '*'

      if(bracket === openBracket)
        open++;
      else
        closed++;

      this.currentOperand += bracket
      
    }
  
    AppendNumber(text) {
      if (text === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + text.toString()
    }
  
    ChooseOperation(operation) {
      if(this.currentOperand == '' ) return

      if(this.currentOperand.includes(openBracket) && !this.currentOperand.includes(closedBracket)){
        if(isNaN(this.currentOperand.toString().slice( -1))) return 
        this.currentOperand += operation
        return
      }

   
      this.previousOperand +=  this.currentOperand + operation
      this.currentOperand  = ''
    }
  
    Calculate() {
      let temp = this.previousOperand + this.currentOperand;
      this.currentOperand = eval(temp)
      this.previousOperand = ''

      if(this.currentOperand === undefined)
      this.currentOperand = ''
    }
  
    UpdateDisplay() {
      this.currentOperandTextElement.innerText =  this.currentOperand
      this.previousOperandTextElement.innerText = this.previousOperand
    }

    Modify(modifier){
      
      switch(modifier){
        case '%':
          this.currentOperand /= 100
          break;
        case 'x²':
          this.currentOperand = Math.pow(this.currentOperand, 2)
          break;
        case '√x':
          this.currentOperand = Math.sqrt(this.currentOperand)
          break;
        case 'π':
          this.currentOperand = Math.PI
          break;
        default:
            return;
      }
    }
  }
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const bracketsButtons = document.querySelectorAll('[data-bracket]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  const modiferButtons = document.querySelectorAll('[data-modifier]')

  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.AppendNumber(button.innerText)
      calculator.UpdateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.ChooseOperation(button.innerText)
      calculator.UpdateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.Calculate()
    calculator.UpdateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.Clear()
    calculator.UpdateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.Delete()
    calculator.UpdateDisplay()
  })

  bracketsButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.AppendBracket(button.innerText)
      calculator.UpdateDisplay()
    })
  })

  modiferButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.Modify(button.innerText)
      calculator.UpdateDisplay()
    })
  })
