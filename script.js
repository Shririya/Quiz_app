// buttons
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
// screens
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

startBtn.addEventListener('click', () => {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
});
const questions = [
    {
        question: "What is HTML?",
        options: ["Programming Language", "Markup Language", "Database", "Operating System"],
        answer: "Markup Language"
    },
    {
        question: "What does CSS do?",
        options: ["Structure", "Styling", "Logic", "Database"],
        answer: "Styling"
    },
    {
        question: "What is JS used for?",
        options: ["Styling", "Structure", "Interactivity", "Storage"],
        answer: "Interactivity"
    }
];
function shuffleQuestions(array) {
    return array.sort(() => Math.random() - 0.5);
}
let shuffledQuestions = [];

startBtn.addEventListener("click", () => {
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    shuffledQuestions = shuffleQuestions(questions);
    currentQuestionIndex = 0;
    score = 0;

    showQuestion();
});
let currentQuestionIndex = 0;
let score = 0;
const questionEl = document.getElementById("question");
const optionsEl = document.querySelector(".options");

function showQuestion() {
    let currentQuestion = shuffledQuestions[currentQuestionIndex];

    questionEl.textContent = currentQuestion.question;

    optionsEl.innerHTML = ""; // clear old options

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;

        button.addEventListener("click", () => selectAnswer(option));

        optionsEl.appendChild(button);
        updateProgress();
    });
}

function selectAnswer(selectedOption) {
    let correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedOption === correctAnswer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

const finalScore = document.getElementById("final-score");
const maxScore = document.getElementById("max-score");

function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScore.textContent = score;
    maxScore.textContent = questions.length;
}

restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;

    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
});
startBtn.addEventListener("click", () => {
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion(); // IMPORTANT
});
const progressEl = document.getElementById("progress");

function updateProgress() {
    let progressPercent = ((currentQuestionIndex) / shuffledQuestions.length) * 100;
    progressEl.style.width = progressPercent + "%";
}