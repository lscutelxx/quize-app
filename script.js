const questions = [
    {
        question: 'Which is largest animal in the world?',
        answers: [
            { text: 'Shark', correct: false },
            { text: 'Blue whale', correct: true },
            { text: 'Elephant', correct: false },
            { text: 'Giraffe', correct: false },
        ]
    },
    {
        question: 'Which is the smallest country in the world?',
        answers: [
            { text: 'Vatican City', correct: true },
            { text: 'Bhutan', correct: false },
            { text: 'Nepal', correct: false },
            { text: 'Shri lanka', correct: false },
        ]
    },
    {
        question: 'Which is the largest desert in the world?',
        answers: [
            { text: 'Kalahari', correct: false },
            { text: 'Gobi', correct: false },
            { text: 'Sahara', correct: false },
            { text: 'Antarctica', correct: true },
        ]
    },
    {
        question: 'Which is smallest continent in the world?',
        answers: [
            { text: 'Asia', correct: false },
            { text: 'Australia', correct: true },
            { text: 'Arctic', correct: false },
            { text: 'Africa', correct: false },
        ]
    }
];

const questionElement = document.querySelector('#question');
const answerBtns = document.querySelector('#answer-buttons');
const nextBtn = document.querySelector('#next-btn');

let currentQustionIndex = 0;
let score = 0;

function startQuiz() {
    currentQustionIndex = 0;
    score = 0;
    nextBtn.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQustionIndex];
    let questionNo = currentQustionIndex + 1;
    questionElement.textContent = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        answerBtns.append(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextBtn.style.dysplay = 'none';
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerBtns.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextBtn.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.textContent = `You scored ${score} out if ${questions.length}!`;
    nextBtn.textContent = 'Play Again';
    nextBtn.style.display = 'block';
}

function handleNextBtn() {
    currentQustionIndex++;
    if (currentQustionIndex < questions.length) {
        showQuestion()
    } else {
        showScore();
    }
}

nextBtn.addEventListener('click', () => {
    if (currentQustionIndex < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
})

startQuiz()