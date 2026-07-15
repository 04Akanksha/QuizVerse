document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Initialize Particles.js
    if (window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#3b82f6", "#8b5cf6", "#38bdf8"] },
                "shape": { "type": "circle" },
                "opacity": {
                    "value": 0.5, "random": true,
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
                },
                "size": { "value": 3, "random": true, "anim": { "enable": false } },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.1, "width": 1 },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }

    // 3. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    let isMenuOpen = false;

    if(mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            navLinks.classList.toggle('open');
            const iconName = isMenuOpen ? 'x' : 'menu';
            mobileToggle.innerHTML = `<i data-lucide="${iconName}"></i>`;
            lucide.createIcons();
        });
    }

    // 5. Scroll Reveal Animation using IntersectionObserver
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .fade-in').forEach(element => {
        animateOnScroll.observe(element);
    });

    // 6. Global Button Ripple Effect Utility
    document.addEventListener('click', function(e) {
        const button = e.target.closest('.ripple');
        if (button) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    });

    // 7. Card Mouse Tracking for Glow Effect
    document.querySelectorAll('.topic-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // =========================================================================
    // QUIZ FUNCTIONALITY & STATE
    // =========================================================================

    // Database of Questions
    const quizData = {
        html: [
            { q: "What does HTML stand for?", options: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Tool Multi Language", "Hyperlink Text Markup Language"], correct: 1 },
            { q: "Which tag is used to create a hyperlink in HTML?", options: ["<link>", "<a>", "<href>", "<url>"], correct: 1 },
            { q: "Which HTML tag is used for the largest heading?", options: ["<h6>", "<heading>", "<h1>", "<head>"], correct: 2 },
            { q: "What is the correct HTML element for inserting a line break?", options: ["<break>", "<b>", "<br>", "<lb>"], correct: 2 },
            { q: "Which of these elements are all <table> elements?", options: ["<table><head><tfoot>", "<thead><body><tr>", "<table><tr><td>", "<table><tr><tt>"], correct: 2 },
            { q: "How can you make a numbered list?", options: ["<ol>", "<ul>", "<dl>", "<list>"], correct: 0 },
            { q: "What is the correct HTML for making a checkbox?", options: ["<check>", "<input type=\"check\">", "<checkbox>", "<input type=\"checkbox\">"], correct: 3 },
            { q: "Which attribute is used to specify that an input field must be filled out?", options: ["placeholder", "validate", "required", "formvalidate"], correct: 2 },
            { q: "What does the <canvas> element in HTML5 do?", options: ["Draws graphics on the fly", "Displays database records", "Creates draggable elements", "Displays high res images"], correct: 0 },
            { q: "Which HTML5 element defines navigation links?", options: ["<navigate>", "<nav>", "<links>", "<menu>"], correct: 1 }
        ],
        css: [
            { q: "What does CSS stand for?", options: ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"], correct: 1 },
            { q: "Which HTML attribute is used to define inline styles?", options: ["style", "class", "styles", "font"], correct: 0 },
            { q: "Which property is used to change the background color?", options: ["color", "bgcolor", "background-color", "background-color-style"], correct: 2 },
            { q: "Which CSS property controls the text size?", options: ["font-style", "text-size", "font-size", "text-style"], correct: 2 },
            { q: "How do you display hyperlinks without an underline?", options: ["a {text-decoration:none;}", "a {underline:none;}", "a {decoration:no-underline;}", "a {text-decoration:no-underline;}"], correct: 0 },
            { q: "How do you make each word in a text start with a capital letter?", options: ["text-style:capitalize", "text-transform:capitalize", "transform:capitalize", "font-weight:uppercase"], correct: 1 },
            { q: "Which property is used to change the left margin of an element?", options: ["padding-left", "margin-left", "indent", "spacing-left"], correct: 1 },
            { q: "How do you select an element with id 'demo'?", options: [".demo", "#demo", "demo", "*demo"], correct: 1 },
            { q: "What is the default value of the position property?", options: ["relative", "fixed", "absolute", "static"], correct: 3 },
            { q: "In CSS, what is the clear property used for?", options: ["Removing background colors", "Making text invisible", "Controlling element behavior next to floated elements", "Clearing browser cache"], correct: 2 }
        ],
        js: [
            { q: "Inside which HTML element do we put the JavaScript?", options: ["<js>", "<scripting>", "<script>", "<javascript>"], correct: 2 },
            { q: "How do you write 'Hello World' in an alert box?", options: ["msg('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');", "alert('Hello World');"], correct: 3 },
            { q: "How do you create a function in JavaScript?", options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "def myFunction()"], correct: 0 },
            { q: "How to write an IF statement in JavaScript?", options: ["if i = 5 then", "if i == 5 then", "if (i == 5)", "if i = 5"], correct: 2 },
            { q: "How does a FOR loop start?", options: ["for (i <= 5; i++)", "for (i = 0; i <= 5; i++)", "for (i = 0; i <= 5)", "for i = 1 to 5"], correct: 1 },
            { q: "What is the correct way to add a single line comment?", options: ["<!-- comment -->", "' comment", "// comment", "/* comment */"], correct: 2 },
            { q: "Which event occurs when the user clicks on an HTML element?", options: ["onmouseclick", "onclick", "onchange", "onmouseover"], correct: 1 },
            { q: "How do you declare a JavaScript variable?", options: ["v carName;", "variable carName;", "var carName;", "declare carName;"], correct: 2 },
            { q: "Which operator is used to assign a value to a variable?", options: ["*", "-", "x", "="], correct: 3 },
            { q: "What will the following code return: Boolean(10 > 9)", options: ["NaN", "false", "true", "undefined"], correct: 2 }
        ],
        dom: [
            { q: "What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Data Oriented Model"], correct: 0 },
            { q: "Which method selects an element based on its ID?", options: ["getElement(id)", "getElementById()", "querySelector('#')", "selectById()"], correct: 1 },
            { q: "How do you create a new element in the DOM?", options: ["document.createElement()", "document.newElement()", "document.addElement()", "document.nodeCreate()"], correct: 0 },
            { q: "Which method is used to append a child node to an element?", options: ["add()", "insertChild()", "appendChild()", "append()"], correct: 2 },
            { q: "How can you get the content of an HTML element?", options: ["element.content", "element.innerHTML", "element.text", "element.value"], correct: 1 },
            { q: "Which property gives you the parent of a DOM node?", options: ["parentNode", "parent", "ancestor", "superNode"], correct: 0 },
            { q: "What does 'event delegation' mostly rely on?", options: ["Event Binding", "Event Capturing", "Event Bubbling", "Event Creation"], correct: 2 },
            { q: "Which method safely removes a DOM element?", options: ["element.delete()", "element.remove()", "document.drop(element)", "element.destroy()"], correct: 1 },
            { q: "How do you add a CSS class to an element in JS?", options: ["element.class = 'new'", "element.addClass()", "element.classList.add()", "element.className.push()"], correct: 2 },
            { q: "Which method stops an event from bubbling up the DOM tree?", options: ["event.cancel()", "event.stopPropagation()", "event.preventDefault()", "event.stop()"], correct: 1 }
        ]
    };

    const topicTitles = {
        html: "HTML Basics",
        css: "CSS Styling",
        js: "JavaScript Fundamentals",
        dom: "DOM & Events"
    };

    // State Variables
    let currentTopic = '';
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    
    let stats = { correct: 0, wrong: 0, skipped: 0 };
    
    let timerInterval;
    let timeLeft = 15;
    let isAnswered = false;

    // DOM Elements
    const mainView = document.getElementById('main-view');
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    
    const startBtns = {
        html: document.getElementById('start-html-btn'),
        css: document.getElementById('start-css-btn'),
        js: document.getElementById('start-js-btn'),
        dom: document.getElementById('start-dom-btn')
    };

    // Quiz UI Elements
    const topicTitleEl = document.getElementById('quiz-topic-title');
    const timerTextEl = document.getElementById('time-text');
    const timerFillEl = document.getElementById('timer-fill');
    const progressTextEl = document.getElementById('progress-text');
    const progressFillEl = document.getElementById('progress-fill');
    const questionTextEl = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextBtn = document.getElementById('next-btn');

    // Result UI Elements
    const finalScoreEl = document.getElementById('final-score');
    const accuracyPercentEl = document.getElementById('accuracy-percent');
    const statCorrectEl = document.getElementById('stat-correct');
    const statWrongEl = document.getElementById('stat-wrong');
    const statSkippedEl = document.getElementById('stat-skipped');
    const highScoreTextEl = document.getElementById('high-score-text');
    const memeImageEl = document.getElementById('meme-image');
    const memeTextEl = document.getElementById('meme-text');

    const retryBtn = document.getElementById('retry-btn');
    const homeBtn = document.getElementById('home-btn');

    // Init Event Listeners
    Object.keys(startBtns).forEach(topic => {
        if (startBtns[topic]) {
            startBtns[topic].addEventListener('click', () => startQuiz(topic));
        }
    });

    nextBtn.addEventListener('click', handleNext);
    retryBtn.addEventListener('click', () => startQuiz(currentTopic));
    homeBtn.addEventListener('click', backToHome);

    // --- Core Logic ---

    function startQuiz(topic) {
        currentTopic = topic;
        currentQuestions = [...quizData[topic]];
        currentQuestionIndex = 0;
        stats = { correct: 0, wrong: 0, skipped: 0 };
        
        topicTitleEl.textContent = topicTitles[topic];
        
        mainView.classList.add('hidden');
        resultContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        loadQuestion();
    }

    function loadQuestion() {
        isAnswered = false;
        clearInterval(timerInterval);
        
        const qData = currentQuestions[currentQuestionIndex];
        questionTextEl.textContent = qData.q;
        
        // Update Progress UI
        progressTextEl.textContent = `Question ${currentQuestionIndex + 1} / ${currentQuestions.length}`;
        const pPercent = ((currentQuestionIndex) / currentQuestions.length) * 100;
        progressFillEl.style.width = `${pPercent}%`;

        // Generate Options
        optionsContainer.innerHTML = '';
        const prefixes = ["A. ", "B. ", "C. ", "D. "];
        
        qData.options.forEach((optText, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn ripple';
            btn.textContent = prefixes[i] + optText;
            btn.dataset.index = i;
            btn.addEventListener('click', () => handleOptionClick(i, btn));
            optionsContainer.appendChild(btn);
        });

        // Reset Next Button
        if (currentQuestionIndex === currentQuestions.length - 1) {
            nextBtn.innerHTML = 'Submit Quiz <i data-lucide="check-circle" class="btn-icon"></i>';
        } else {
            nextBtn.innerHTML = 'Next <i data-lucide="arrow-right" class="btn-icon"></i>';
        }
        lucide.createIcons();
        nextBtn.classList.add('disabled');

        startTimer();
    }

    function startTimer() {
        timeLeft = 15;
        updateTimerUI();
        
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerUI();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleTimeOut();
            }
        }, 1000);
    }

    function updateTimerUI() {
        timerTextEl.textContent = `${timeLeft}s`;
        const percentage = (timeLeft / 15) * 100;
        timerFillEl.style.width = `${percentage}%`;
        
        // Change color based on urgency
        if(timeLeft <= 5) timerFillEl.style.background = '#ef4444'; // red
        else if(timeLeft <= 10) timerFillEl.style.background = '#f59e0b'; // yellow
        else timerFillEl.style.background = '#10b981'; // green
    }

    function handleOptionClick(selectedIndex, clickedBtn) {
        if (isAnswered) return;
        isAnswered = true;
        clearInterval(timerInterval);

        const correctIndex = currentQuestions[currentQuestionIndex].correct;
        const allBtns = optionsContainer.querySelectorAll('.option-btn');
        
        allBtns.forEach(b => b.classList.add('disabled'));

        if (selectedIndex === correctIndex) {
            clickedBtn.classList.add('correct');
            stats.correct++;
        } else {
            clickedBtn.classList.add('wrong');
            allBtns[correctIndex].classList.add('correct');
            stats.wrong++;
        }

        progressFillEl.style.width = `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%`;
        nextBtn.classList.remove('disabled');
    }

    function handleTimeOut() {
        isAnswered = true;
        stats.skipped++;
        
        const correctIndex = currentQuestions[currentQuestionIndex].correct;
        const allBtns = optionsContainer.querySelectorAll('.option-btn');
        
        allBtns.forEach(b => b.classList.add('disabled'));
        allBtns[correctIndex].classList.add('correct'); // Show correct answer
        
        progressFillEl.style.width = `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%`;
        nextBtn.classList.remove('disabled');
    }

    function handleNext() {
        if (!isAnswered) return;

        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        quizContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');

        // Stats calculation
        const total = currentQuestions.length;
        const accuracy = Math.round((stats.correct / total) * 100);

        // Update DOM
        finalScoreEl.textContent = stats.correct;
        accuracyPercentEl.textContent = `${accuracy}%`;
        statCorrectEl.textContent = stats.correct;
        statWrongEl.textContent = stats.wrong;
        statSkippedEl.textContent = stats.skipped;

        // Meme logic
        // Using placeholder image paths based on the user's prompt
        if (stats.correct >= 8) {
            memeImageEl.src = "../assets/success-meme.webp";
            memeImageEl.alt = "Success Meme Placeholder";
            memeTextEl.textContent = "Frontend Developer in the making 😎🔥";
        } else if (stats.correct >= 5) {
            memeImageEl.src = "../assets/average-meme.webp";
            memeImageEl.alt = "Average Meme Placeholder";
            memeTextEl.textContent = "Not bad bhai, thoda aur practice kar 😅";
        } else {
            memeImageEl.src = "../assets/fail.webp";
            memeImageEl.alt = "Fail Meme Placeholder";
            memeTextEl.textContent = "Lagta hai notes revise karne padenge 😂📚";
        }

        // Local Storage
        const storageKey = `quizverse_high_score_${currentTopic}`;
        const previousHigh = parseInt(localStorage.getItem(storageKey) || '0', 10);
        
        if (stats.correct > previousHigh) {
            localStorage.setItem(storageKey, stats.correct);
            highScoreTextEl.textContent = `New High Score! ${stats.correct}/${total} 🏆`;
        } else {
            highScoreTextEl.textContent = `Last Best Score: ${previousHigh}/${total}`;
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function backToHome() {
        resultContainer.classList.add('hidden');
        mainView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
console.log("Quiz Created by: @Akanksha Yadav | GitHub: https://github.com/04Akanksha | LinkedIn: https://www.linkedin.com/in/akankshayadav/");