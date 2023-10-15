function writeNumber(num) {
    console.log('This')
    const element = document.getElementById('numbers')
    if(element.innerText.length >= 15) element.innerText = element.innerText.slice(-14) + num 
    else element.innerText = element.innerText + num
}

function operator(op) {
    if (op === 'ce') document.getElementById('numbers').innerText =  document.getElementById('numbers').innerText.slice(0, -1)
    if (op === 'ac') document.getElementById('numbers').innerText =  ''
}