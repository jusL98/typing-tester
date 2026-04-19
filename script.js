const SENTENCE_LIST = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "The early bird catches the worm, but the second mouse gets the cheese.",
    "Programming is the art of telling another human what one wants the computer to do.",
    "Beauty is in the eye of the beholder.",
    "Knowledge is power, but enthusiasm pulls the switch.",
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "It does not matter how slowly you go as long as you do not stop.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "A person who never made a mistake never tried anything new.",
    "Logic will get you from A to B, but imagination will take you everywhere.",
    "You miss one hundred percent of the shots you don't take.",
    "Whether you think you can or you think you can't, you're right.",
    "Life is what happens when you're busy making other plans.",
    "The mind is everything; what you think you become.",
    "Strive not to be a success, but rather to be of value.",
    "Every moment is a fresh beginning.",
    "The best way to predict your future is to create it.",
    "Simplicity is the ultimate sophistication.",
    "Design is not just what it looks like and feels like, design is how it works.",
    "Innovation distinguishes between a leader and a follower.",
    "Quality means doing it right when no one is looking.",
    "There are no secrets to success; it is the result of preparation, hard work, and learning from failure.",
    "The only impossible journey is the one you never begin.",
    "Action is the foundational key to all success.",
    "Courage is resistance to fear, mastery of fear, not absence of fear.",
    "You must be the change you wish to see in the world.",
    "Happiness is not something ready made; it comes from your own actions.",
    "It always seems impossible until it's done.",
    "Don't watch the clock; do what it does, keep going.",
    "Everything you've ever wanted is on the other side of fear.",
    "Dream big and dare to fail.",
    "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    "I have not failed, I've just found 10,000 ways that won't work.",
    "Turn your wounds into wisdom.",
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "Life is really simple, but we insist on making it complicated.",
    "In three words I can sum up everything I've learned about life: it goes on.",
    "To live is the rarest thing in the world; most people exist, that is all.",
    "Always forgive your enemies; nothing annoys them so much.",
    "Without music, life would be a mistake.",
    "To love oneself is the beginning of a lifelong romance."
];

// --- Audio ---

let audioCtx;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playSound(type) {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'tick') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.05);
        } else if (type === 'error') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(150, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.1);
        }
    } catch (e) {
        console.error(e);
    }
}

// --- DOM References ---

const wordsContainer = document.getElementById('words-container');
const hiddenInput    = document.getElementById('hidden-input');
const timerDisplay   = document.getElementById('timer');
const restartBtn     = document.getElementById('restart-btn');
const testArea       = document.getElementById('test-area');
const resultsContainer = document.getElementById('results');

const themeToggle   = document.getElementById('theme-toggle');
const themeIconMoon = document.getElementById('theme-icon-moon');
const themeIconSun  = document.getElementById('theme-icon-sun');
const modeBtns      = document.querySelectorAll('.mode-btn');
const optionBtns    = document.querySelectorAll('.option-btn');
const timeOptions   = document.getElementById('time-options');
const wordsOptions  = document.getElementById('words-options');

// --- State ---

let currentMode     = 'time';
let testValue       = 30;
let timeElapsed     = 0;
let timeLeft        = 30;
let timerInterval   = null;
let isPlaying       = false;
let isFinished      = false;
let startTime       = 0;

let words            = [];
let currentWordIndex = 0;
let currentCharIndex = 0;

let correctChars   = 0;
let incorrectChars = 0;
let extraChars     = 0;
let missedChars    = 0;

const caret = document.createElement('div');
caret.classList.add('caret');

// --- Theme ---

let isLightMode = localStorage.getItem('theme') === 'light';
if (isLightMode) {
    document.body.classList.add('light');
    themeIconMoon.style.display = 'block';
    themeIconSun.style.display = 'none';
}

themeToggle.addEventListener('click', () => {
    isLightMode = !isLightMode;
    document.body.classList.toggle('light', isLightMode);
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    themeIconMoon.style.display = isLightMode ? 'block' : 'none';
    themeIconSun.style.display  = isLightMode ? 'none'  : 'block';
});

// --- Mode & Option Selection ---

modeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        modeBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentMode = e.target.dataset.mode;

        if (currentMode === 'time') {
            timeOptions.classList.remove('hidden');
            wordsOptions.classList.add('hidden');
            testValue = parseInt(document.querySelector('#time-options .active').dataset.val);
        } else {
            timeOptions.classList.add('hidden');
            wordsOptions.classList.remove('hidden');
            testValue = parseInt(document.querySelector('#words-options .active').dataset.val);
        }
        initTest();
    });
});

optionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const parent = e.target.parentElement;
        parent.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        testValue = parseInt(e.target.dataset.val);
        initTest();
    });
});

// --- Helpers ---

function generateWords(count) {
    const result = [];
    while (result.length < count) {
        const sentence = SENTENCE_LIST[Math.floor(Math.random() * SENTENCE_LIST.length)];
        result.push(...sentence.split(' '));
    }
    return result.slice(0, count);
}

function updateWordErrorState(wordEl) {
    const hasError = wordEl.querySelectorAll('.incorrect, .extra').length > 0;
    wordEl.classList.toggle('error', hasError);
}

// --- Test Lifecycle ---

function initTest() {
    wordsContainer.innerHTML = '';
    wordsContainer.style.top = '0px';

    const wordCount = currentMode === 'words' ? testValue : 300;
    words = generateWords(wordCount);

    words.forEach(word => {
        const wordEl = document.createElement('div');
        wordEl.classList.add('word');
        for (const char of word) {
            const charEl = document.createElement('span');
            charEl.classList.add('letter');
            charEl.innerText = char;
            wordEl.appendChild(charEl);
        }
        wordsContainer.appendChild(wordEl);
    });

    wordsContainer.appendChild(caret);

    currentWordIndex = 0;
    currentCharIndex = 0;
    correctChars     = 0;
    incorrectChars   = 0;
    extraChars       = 0;
    missedChars      = 0;

    timeElapsed = 0;
    timeLeft    = currentMode === 'time' ? testValue : 0;
    startTime   = 0;
    isPlaying   = false;
    isFinished  = false;

    timerDisplay.innerText = currentMode === 'time' ? timeLeft : `0/${testValue}`;
    timerDisplay.style.color = 'var(--primary-color)';

    clearInterval(timerInterval);
    timerInterval = null;

    hiddenInput.value = '';
    testArea.classList.remove('hidden', 'blur');
    resultsContainer.classList.add('hidden');

    updateCaretPosition();
    hiddenInput.focus();
}

function startTimer() {
    if (timerInterval) return;
    isPlaying = true;
    startTime = Date.now();
    testArea.classList.remove('blur');

    timerInterval = setInterval(() => {
        timeElapsed++;
        if (currentMode === 'time') {
            timeLeft--;
            timerDisplay.innerText = timeLeft;
            if (timeLeft <= 5) timerDisplay.style.color = 'var(--text-incorrect)';
            if (timeLeft <= 0) endTest();
        }
    }, 1000);
}

function endTest() {
    clearInterval(timerInterval);
    isPlaying  = false;
    isFinished = true;
    hiddenInput.blur();

    testArea.classList.add('hidden');
    resultsContainer.classList.remove('hidden');

    calculateStats();
}

function calculateStats() {
    const wordEls = wordsContainer.querySelectorAll('.word');
    missedChars = 0;
    for (let i = 0; i < currentWordIndex; i++) {
        wordEls[i].querySelectorAll('.letter:not(.extra)').forEach(l => {
            if (!l.classList.contains('correct') && !l.classList.contains('incorrect')) {
                missedChars++;
            }
        });
    }

    const elapsed   = startTime > 0 ? (Date.now() - startTime) / 1000 : 0;
    const timeInMin = elapsed > 0 ? elapsed / 60 : testValue / 60;

    const wpm    = Math.max(0, Math.round((correctChars / 5) / timeInMin));
    const rawWpm = Math.max(0, Math.round(((correctChars + incorrectChars + extraChars) / 5) / timeInMin));

    const totalAttempted = correctChars + incorrectChars + extraChars + missedChars;
    const accuracy = totalAttempted > 0 ? Math.round((correctChars / totalAttempted) * 100) : 0;

    document.getElementById('wpm-result').innerText = wpm;
    document.getElementById('raw-result').innerText = rawWpm;
    document.getElementById('acc-result').innerText = accuracy + '%';
    document.getElementById('char-correct').innerText   = correctChars;
    document.getElementById('char-incorrect').innerText = incorrectChars;
    document.getElementById('char-extra').innerText     = extraChars;
    document.getElementById('char-missed').innerText    = missedChars;
}

// --- Caret & Completion ---

function updateCaretPosition() {
    const wordEls = wordsContainer.querySelectorAll('.word');

    // Words-mode completion must be checked before the element guard
    if (currentMode === 'words') {
        let completed = currentWordIndex;
        if (currentWordIndex === testValue - 1 && currentCharIndex >= words[currentWordIndex].length) {
            completed = testValue;
        }
        timerDisplay.innerText = `${completed}/${testValue}`;
        if (completed >= testValue) {
            currentWordIndex = testValue;
            endTest();
            return;
        }
    }

    if (!wordEls[currentWordIndex]) return;

    const activeWord = wordEls[currentWordIndex];
    const letterEls  = activeWord.querySelectorAll('.letter');

    let caretLeft = activeWord.offsetLeft;
    let caretTop  = activeWord.offsetTop;

    if (currentCharIndex < letterEls.length) {
        caretLeft += letterEls[currentCharIndex].offsetLeft;
        caretTop  += letterEls[currentCharIndex].offsetTop;
    } else {
        const last = letterEls[letterEls.length - 1];
        caretLeft += last.offsetLeft + last.offsetWidth;
        caretTop  += last.offsetTop;
    }

    caret.style.left = caretLeft + 'px';
    caret.style.top  = (caretTop + 4) + 'px';

    // Scroll words container when caret moves below first line
    wordsContainer.style.top = caretTop > 40 ? -(caretTop - 5) + 'px' : '0px';
}

// --- Input Handling ---

hiddenInput.addEventListener('keydown', (e) => {
    if (isFinished) return;

    if (!isPlaying && /[a-zA-Z0-9' ]/.test(e.key) && e.key.length === 1) {
        startTimer();
    }

    const wordEls   = wordsContainer.querySelectorAll('.word');
    const activeWord = wordEls[currentWordIndex];
    if (!activeWord) return;
    const letterEls = activeWord.querySelectorAll('.letter');

    if (e.key === 'Backspace') {
        handleBackspace(wordEls, letterEls);
    } else if (e.key === ' ') {
        handleSpace(activeWord);
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        handleCharInput(e.key, activeWord, letterEls);
    }
});

function handleBackspace(wordEls, letterEls) {
    if (currentCharIndex > 0) {
        currentCharIndex--;
        const charSpan = letterEls[currentCharIndex];

        if (charSpan.classList.contains('extra')) {
            charSpan.remove();
            extraChars--;
        } else {
            if (charSpan.classList.contains('correct'))   correctChars--;
            if (charSpan.classList.contains('incorrect')) incorrectChars--;
            charSpan.classList.remove('correct', 'incorrect');
        }
    } else if (currentWordIndex > 0) {
        currentWordIndex--;
        const prevWord = wordEls[currentWordIndex];
        prevWord.classList.remove('error');

        // Place caret after the last typed letter in the previous word
        const pLetters = prevWord.querySelectorAll('.letter');
        let lastTyped = -1;
        pLetters.forEach((l, i) => {
            if (l.classList.contains('correct') || l.classList.contains('incorrect') || l.classList.contains('extra')) {
                lastTyped = i;
            }
        });
        currentCharIndex = lastTyped + 1;
    }

    playSound('tick');
    updateCaretPosition();
    updateWordErrorState(wordEls[currentWordIndex]);
}

function handleSpace(activeWord) {
    if (currentCharIndex === 0) return;

    updateWordErrorState(activeWord);
    currentWordIndex++;
    currentCharIndex = 0;
    playSound('tick');
    updateCaretPosition();
}

function handleCharInput(key, activeWord, letterEls) {
    const maxExtra = 10;

    if (currentCharIndex < words[currentWordIndex].length) {
        const charSpan     = letterEls[currentCharIndex];
        const expectedChar = words[currentWordIndex][currentCharIndex];

        if (key === expectedChar) {
            charSpan.classList.add('correct');
            correctChars++;
            playSound('tick');
        } else {
            charSpan.classList.add('incorrect');
            incorrectChars++;
            playSound('error');
        }
        currentCharIndex++;
    } else if (currentCharIndex < words[currentWordIndex].length + maxExtra) {
        const extraSpan = document.createElement('span');
        extraSpan.classList.add('letter', 'extra');
        extraSpan.innerText = key;
        activeWord.appendChild(extraSpan);
        extraChars++;
        currentCharIndex++;
        playSound('error');
    }

    updateCaretPosition();
    updateWordErrorState(activeWord);
}

// --- Global Event Listeners ---

document.addEventListener('click', (e) => {
    if (!isFinished && !e.target.closest('header') && !e.target.closest('.controls')) {
        hiddenInput.focus();
        testArea.classList.remove('blur');
    }
});

testArea.addEventListener('click', () => {
    hiddenInput.focus();
    testArea.classList.remove('blur');
});

restartBtn.addEventListener('click', () => initTest());

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        restartBtn.focus();
    }
});

// --- Init ---

initTest();
