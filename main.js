let c;
let startTime, interval;

document.getElementById('start-button').addEventListener('click', function() {
    generateEquation();
    startTimer();
    document.getElementById('results').innerHTML = '';
});

document.getElementById('answer-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let x1 = parseFloat(document.getElementById('x1').value);
    let x2 = parseFloat(document.getElementById('x2').value);

    if (checkAnswer(x1, x2)) {
        stopTimer();
        displayResults(`正解！タイム: ${document.getElementById('time').textContent} 秒`);
    } else {
        displayResults('不正解です。もう一度試してください。');
    }
});

function generateEquation() {
    const maxSquare = Math.floor(Math.sqrt(400));
    let squares = [];
    for (let i = 1; i <= maxSquare; i++) {
        squares.push(i * i);
    }

    c = squares[Math.floor(Math.random() * squares.length)];
    document.getElementById('equation').innerHTML = `方程式: x² - ${c} = 0`;
}

function checkAnswer(x1, x2) {
    // x² - c = 0 の解は sqrt(c) と -sqrt(c)
    let realX1 = Math.sqrt(c);
    let realX2 = -Math.sqrt(c);

    return (Math.abs(x1 - realX1) < 1e-6 && Math.abs(x2 - realX2) < 1e-6) || 
           (Math.abs(x1 - realX2) < 1e-6 && Math.abs(x2 - realX1) < 1e-6);
}

function startTimer() {
    startTime = Date.now();
    interval = setInterval(function() {
        let elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);
        document.getElementById('time').textContent = elapsedTime;
    }, 100);
}

function stopTimer() {
    clearInterval(interval);
}

function displayResults(message) {
    document.getElementById('results').innerHTML = message;
}
