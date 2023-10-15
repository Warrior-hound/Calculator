const strings = [];

function writeNumber(num) {
    if(document.getElementById('operator').innerText.length) {
        strings.push(document.getElementById('operator').innerText)
    }
    const element = document.getElementById('numbers')
    if(element.innerText.length >= 15) element.innerText = element.innerText.slice(-14) + num 
    else element.innerText = element.innerText + num
}

function operator(op) {
    strings.push(document.getElementById('numbers').innerText)
    document.getElementById('numbers').innerText = ''
    if (op === 'ce') document.getElementById('numbers').innerText =  document.getElementById('numbers').innerText.slice(0, -1)
    if (op === 'ac') {
        document.getElementById('numbers').innerText =  ''
        document.getElementById('operator').innerText =  ''
    }
    if (op === '+') document.getElementById('operator').innerText =  '+'
    if (op === '=') {
        document.getElementById('operator').innerText =  '='
        console.log(strings)
    }
    if (op === '−') document.getElementById('operator').innerText =  '−'
    if (op === '÷') document.getElementById('operator').innerText =  '÷'
    if (op === '×') document.getElementById('operator').innerText =  '×'
}