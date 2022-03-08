function Calculator(){
    const num = document.querySelectorAll('.num')
    const ope = document.querySelectorAll('.operation')
    const display = document.querySelector('.display')
    this.accumulator = ''
    this.operator = ''
    this.value = ''
    
    
    this.assignNumbers = function(){//assigns the numbers entered to the 'accumulator' and to 'value'
        num.forEach(el =>{
            el.addEventListener('click', e =>{
                if(this.accumulator && this.operator){
                    if(el.innerHTML == '.' && this.value.toString().includes('.')){
                        
                    } else{
                    this.value = this.value + el.innerHTML
                    this.displayData()
                    }
                } else {
                    if(el.innerHTML == '.' && this.accumulator.toString().includes('.')){
                        
                    } else{
                    this.accumulator = this.accumulator + el.innerHTML
                    this.displayData()
                    display.style.color = '#fff'
                    }
                }
            }
            )
        })
    }

    this.assignOperations = function(){//assign operator to 'operator' and call the calculation
        ope.forEach(el =>{
            el.addEventListener('click', e =>{
                if(el.getAttribute('value') == 'c'){
                    this.accumulator = ''
                    this.operator = ''
                    this.value = ''
                    display.setAttribute('value', '0')
                }
                if(this.accumulator && !this.value){
                    this.operator = el.getAttribute('value')
                }
                if(el.getAttribute('value') == '%'){
                    this.percentage()
                    this.operator = ''
                }
                if(el.innerHTML == '+/-'){
                    this.resolveMinusPlus()
                }
                if(el.getAttribute('value') == '='){
                    if(this.accumulator && this.value){
                        this.saveCalculate()
                        this.resolveOperation()
                        display.style.color = '#ff8800'
                        setTimeout(()=>{
                            this.accumulator = ''
                        },100)
                    }
                    if(el.getAttribute('value') == '='){
                        this.operator = ''
                    }
                }
                if(this.accumulator && this.value && el.getAttribute('value') != '='){
                    this.saveCalculate()
                    this.resolveOperation()
                    this.operator = el.getAttribute('value')
                }
                this.displayData()
            })
        })
    }

    this.resolveOperation = function(){//function that performs basic operations
        const num1 = parseInt(this.accumulator)
        const num2 = parseInt(this.value)
        const ope = this.operator

        if(ope == '+'){
            this.value = ''
            this.accumulator = num1 + num2
        }
        if(ope == '-'){
            this.value = ''
            this.accumulator = num1 - num2
        }
        if(ope == '*'){
            this.value = ''
            this.accumulator = num1 * num2
        }
        if(ope == '/'){
            this.value = ''
            this.accumulator = num1 / num2
        }
    }

    this.percentage = function(){//solve percentage calculations
        const num1 = parseInt(this.accumulator)
        const num2 = parseInt(this.value)
        const ope = this.operator
        let percentage = (num1 / 100) * num2

        if(this.accumulator && this.operator && this.value){

            if(ope == '+'){
                this.accumulator = num1 + percentage
                this.value = ''
                this.operator = ''
            }
            if(ope == '-'){
                this.accumulator = num1 - percentage
                this.value = ''
                this.operator = ''
            }
            if(ope == '*'){
                this.accumulator = num1 * percentage
                this.value = ''
                this.operator = ''
            }
            if(ope == '/'){
                this.accumulator = num1 / percentage
                this.value = ''
                this.operator = ''
            }
        }
    }

    this.resolveMinusPlus = function(){//inverts values ​​between plus and minus
        const num1 = parseInt(this.accumulator)
        const num2 = parseInt(this.value)
        const ope = this.operator

        if(this.accumulator){
            if(this.value){
                this.value = num2 * -1
                this.operator = ope
            } else {
                this.accumulator = num1 * -1
                this.operator = ope
            }
        }
    }

    this.displayData = function(){//insert the operation into the display
        const num1 = this.accumulator.toString()
        const num2 = this.value.toString()
        const ope = this.operator.toString()


        if(this.accumulator){
            display.setAttribute('value', num1)
        }
        if(this.operator){
            display.setAttribute('value', num1 + ope)
        }
        if(this.value){
            display.setAttribute('value', num1 + ope + num2)
        }
    }
    
    this.saveCalculate = function(){//save the operations made to the history
        this.historic = document.querySelector('.historic')
        const num1 = this.accumulator.toString()
        const num2 = this.value.toString()
        const ope = this.operator.toString()
        let result = ''
        this.p = document.createElement('p')
        
        setTimeout(() =>{
             result =  this.accumulator.toString()
        },50)
        let operation = `${num1} ${ope} ${num2}`
        setTimeout(() =>{
            this.p.innerHTML = `${operation} = <span>${result}</span>`
            this.historic.appendChild(this.p)
        },60)

    }

}

function showHistoric(){
    const icon = document.querySelector('#icon-time')
    const hist = document.querySelector('.historic')
    
    icon.addEventListener('click', e =>{
        if(hist.classList.contains('entering')){
            hist.classList.toggle('exiting')
            setTimeout(()=>{
                hist.classList.toggle('exiting')

            },1800)
        }    
        hist.classList.toggle('entering')
    })     
}

const calc = new Calculator()
calc.assignNumbers()
calc.assignOperations()
showHistoric()

