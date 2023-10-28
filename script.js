const operatorRegex = /[+\-*/%]/g
const matchOpRegex = /[+\-*/%]/


function toggleTheme(){
const toTheme = parseInt(document.getElementById('circle').innerHTML) === 1 ? 'light' : 'dark'
const animationToPlay = parseInt(document.getElementById('circle').innerHTML) === 1 ? "slide 300ms ease-in-out 0s forwards" : "slideback 300ms ease-in-out 0s forwards"
const theme = parseInt(document.getElementById('circle').innerHTML) === 1 ? "ri-sun-line" : "ri-moon-line"
const sliderBgColor = parseInt(document.getElementById('circle').innerHTML) === 1 ? "#f9f9f9" : "#292d36"
const sliderFontColor = parseInt(document.getElementById('circle').innerHTML) === 0 ? "#f9f9f9" : "#292d36"

if(toTheme === 'light') {
    document.getElementsByClassName('primary').item(0).setAttribute('style', 'color: #292d36')
    document.getElementsByClassName('secondary').item(0).setAttribute('style', 'color: #292d36')
    document.getElementsByClassName('calculator').item(0).setAttribute('style', 'background-color: #f2f2f2')
    document.getElementsByClassName('keypad').item(0).setAttribute('style', 'background-color: #f9f9f9')
    document.querySelectorAll('.key').forEach(key => {
        console.log(`${key.className.replace('key', 'key-dark')}`)
        key.className = key.className.replace('key', 'key-light')
    })
}

if(toTheme === 'dark') {
    document.getElementsByClassName('primary').item(0).setAttribute('style', 'color: #d2d3d5')
    document.getElementsByClassName('secondary').item(0).setAttribute('style', 'color: #d2d3d5')
    document.getElementsByClassName('calculator').item(0).setAttribute('style', 'background-color: #292d36')
    document.getElementsByClassName('keypad').item(0).setAttribute('style', 'background-color: #292d36')
    document.querySelectorAll('.key-light').forEach(key => {
        key.className = key.className.replace('key-light', 'key')
    })
}

document.getElementById('circle').style.animation = null
document.getElementById('circle').style.animation = animationToPlay
document.getElementById('symbol').className = theme
document.getElementById('symbol').style.color = sliderFontColor
document.getElementById('theme-slider').style.backgroundColor = sliderBgColor
document.getElementById('circle').innerHTML = 1 - parseInt(document.getElementById('circle').innerHTML)
document.getElementById('circle').style.backgroundColor = sliderFontColor

}

toggleTheme()

document.getElementById('circle').addEventListener('click', () => {
    toggleTheme()
})

document.querySelectorAll('.key').forEach((key) => {
key.addEventListener("click", (ev) => {
    const rect = key.getBoundingClientRect();
    const left = ev.clientX - rect.left;
    const top = ev.clientY - rect.top;
    const height = key.clientHeight;
    const width = key.clientWidth;
    const diameter = Math.max(width, height);
    // {
    //     top: top - diameter / 2,
    //     left: left - diameter / 2,
    //     height: Math.max(width, height),
    //     width: Math.max(width, height),
    // },
    const node = document.createElement('span')
    node.setAttribute("style", `
    top: ${top - diameter / 2}px;
    left: ${left - diameter / 2}px;
    height: ${Math.max(width, height)}px;
    width: ${Math.max(width, height)}px;
    transform: scale(0);
    animation: ripple 600ms linear;
    position: absolute;
    border-radius: 50%;
    background-color: #353942;
    opacity: 0.6;
`);
    
    key.appendChild(node)
    setTimeout(() => key.removeChild(node), 700)

    appendNumber(key.id)
})
})

function appendNumber(value) {
    
    if(document.getElementById('calc').innerHTML === 'reset') {
        document.getElementById('primary').innerHTML = ''
        document.getElementById('calc').innerHTML = ''
        document.getElementById('secondary').innerHTML = ''
    }

    if (value === 'ac') {
    document.getElementById('primary').innerHTML = ''
    document.getElementById('calc').innerHTML += ''
    document.getElementById('secondary').innerHTML = ''
    return;
    }

    if (value === 'ce') {
        const value = document.getElementById('primary').innerHTML
        if(isOperator(value[value.length - 1])) {
            document.getElementById('primary').innerHTML = document.getElementById('primary').innerHTML.slice(0, -1)
            document.getElementById('calc').innerHTML = document.getElementById('calc').innerHTML.slice(0, -3)
        } else {
            document.getElementById('primary').innerHTML = document.getElementById('primary').innerHTML.slice(0, -1)
            document.getElementById('calc').innerHTML = document.getElementById('calc').innerHTML.slice(0, -1)
        }
        return;
    }

    if(value === '=') {
        const expression = evalExpression(document.getElementById('calc').innerHTML)
        document.getElementById('primary').innerHTML = expression
        document.getElementById('calc').innerHTML = 'reset'
        document.getElementById('secondary').innerHTML = ''
        return;
    }

    if(isPreviousOperator(value) && isOperator(value)) return;
    document.getElementById('primary').innerHTML += value
    document.getElementById('calc').innerHTML += isOperator(value) ? ` ${value} ` : value
    const opCount = countOperators(document.getElementById('calc').innerHTML)
    
    if(opCount === 2) {
        const expression = evalExpression(document.getElementById('calc').innerHTML)
        if(expression < 0) expression
        document.getElementById('secondary').innerHTML = expression
        document.getElementById('primary').innerHTML = expression + `${value}`
        document.getElementById('calc').innerHTML = `${expression < 0 ? expression.toString().replace('-', 'k') : expression}` + ` ${value} `
          
    }
    
    if(document.getElementById('primary').innerHTML.length > 14) {
        document.getElementById('primary').innerHTML = document.getElementById('primary').innerHTML.slice(-14)
    }
    
}

function evalExpression(expression) {
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => b === 0 ? "Div by zero" : a / b,
        '%': (a, b) => a % b
    };

    const [leftTerm, operator, rightTerm] = expression.split(' ').map(c => c.replace('k', '-'))
    
    const leftNumber = parseFloat(leftTerm) || 0;
    const rightNumber = parseFloat(rightTerm) || 0;

    if (isNaN(leftNumber) || isNaN(rightNumber) || !(operator in operators)) {
        return "Syntax Error";
    }

    return operators[operator](leftNumber, rightNumber);
}

function isPreviousOperator() {
    const previousString = document.getElementById('primary').innerHTML
    return isOperator(previousString[previousString.length - 1], "from prev")
}

function isOperator(value, ok = "append") {
    return matchOpRegex.test(value)
}

function countOperators(str) {

    
    const operatorMatches = str.match(operatorRegex);

    
    if (operatorMatches) {
        return operatorMatches.length;
    } else {
        return 0; 
    }
}