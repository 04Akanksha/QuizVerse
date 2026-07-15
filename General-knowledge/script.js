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
    // GK QUIZ FUNCTIONALITY & STATE
    // =========================================================================

    // Database of Questions
    const gkQuizData = {
        history: [
            { q: "Who was the first President of the United States?", options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"], correct: 2 },
            { q: "In which year did World War II end?", options: ["1945", "1918", "1939", "1950"], correct: 0 },
            { q: "Who built the great pyramids of Giza?", options: ["Romans", "Ancient Egyptians", "Greeks", "Mayans"], correct: 1 },
            { q: "Which empire was ruled by Julius Caesar?", options: ["Ottoman Empire", "British Empire", "Mongol Empire", "Roman Empire"], correct: 3 },
            { q: "Who discovered America in 1492?", options: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "James Cook"], correct: 1 },
            { q: "The French Revolution started in which year?", options: ["1789", "1804", "1776", "1812"], correct: 0 },
            { q: "Who was known as the 'Maid of Orleans'?", options: ["Marie Antoinette", "Joan of Arc", "Queen Elizabeth I", "Catherine the Great"], correct: 1 },
            { q: "What was the name of the ship that sank in 1912?", options: ["Lusitania", "Britannic", "Titanic", "Mayflower"], correct: 2 },
            { q: "The Berlin Wall fell in which year?", options: ["1989", "1991", "1985", "1993"], correct: 0 },
            { q: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"], correct: 2 }
        ],
        geography: [
            { q: "Which is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correct: 3 },
            { q: "What is the longest river in the world?", options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], correct: 1 },
            { q: "Which country has the largest land area?", options: ["Canada", "China", "United States", "Russia"], correct: 3 },
            { q: "Mount Everest is located in which mountain range?", options: ["Andes", "Rockies", "Alps", "Himalayas"], correct: 3 },
            { q: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], correct: 2 },
            { q: "Which continent is known as the 'Dark Continent'?", options: ["Asia", "Africa", "South America", "Antarctica"], correct: 1 },
            { q: "Which desert is the largest hot desert in the world?", options: ["Gobi Desert", "Kalahari Desert", "Sahara Desert", "Arabian Desert"], correct: 2 },
            { q: "What is the smallest country in the world?", options: ["Monaco", "Nauru", "San Marino", "Vatican City"], correct: 3 },
            { q: "Which river flows through Paris?", options: ["Thames", "Rhine", "Seine", "Danube"], correct: 2 },
            { q: "How many continents are there?", options: ["5", "6", "7", "8"], correct: 2 }
        ],
        science: [
            { q: "What is the chemical symbol for water?", options: ["HO", "H2O", "O2", "CO2"], correct: 1 },
            { q: "Which planet is closest to the Sun?", options: ["Venus", "Mars", "Mercury", "Earth"], correct: 2 },
            { q: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 },
            { q: "Who developed the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"], correct: 1 },
            { q: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], correct: 2 },
            { q: "How many bones are in the adult human body?", options: ["206", "208", "210", "196"], correct: 0 },
            { q: "What force keeps planets in orbit around the Sun?", options: ["Magnetism", "Friction", "Gravity", "Inertia"], correct: 2 },
            { q: "What part of the cell contains the genetic material?", options: ["Cytoplasm", "Nucleus", "Membrane", "Mitochondria"], correct: 1 },
            { q: "What is the speed of light in a vacuum?", options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"], correct: 0 },
            { q: "Which blood type is known as the universal donor?", options: ["Type A", "Type B", "Type AB", "Type O"], correct: 3 }
        ],
        currentAffairs: [
            { q: "Which country hosted the 2024 Summer Olympics?", options: ["Japan", "USA", "France", "UK"], correct: 2 },
            { q: "Who is the CEO of SpaceX?", options: ["Jeff Bezos", "Bill Gates", "Elon Musk", "Mark Zuckerberg"], correct: 2 },
            { q: "What is the name of NASA's most advanced space telescope launched in 2021?", options: ["Hubble", "Kepler", "James Webb", "Spitzer"], correct: 2 },
            { q: "Which currency is used in most European Union countries?", options: ["Pound", "Euro", "Dollar", "Franc"], correct: 1 },
            { q: "What does AI stand for in technology?", options: ["Automated Integration", "Artificial Intelligence", "Advanced Informatics", "Automated Intelligence"], correct: 1 },
            { q: "Which company is the creator of the popular generative AI model ChatGPT?", options: ["Google", "Microsoft", "OpenAI", "Meta"], correct: 2 },
            { q: "What is the capital of Ukraine?", options: ["Kyiv", "Moscow", "Minsk", "Warsaw"], correct: 0 },
            { q: "Which social media platform was formerly known as Twitter?", options: ["Threads", "Truth Social", "X", "Mastodon"], correct: 2 },
            { q: "In which year did the global COVID-19 pandemic officially start?", options: ["2018", "2019", "2020", "2021"], correct: 1 },
            { q: "Which country is the largest producer of smartphones?", options: ["South Korea", "USA", "India", "China"], correct: 3 }
        ]
    };

    const topicTitles = {
        history: "History",
        geography: "Geography",
        science: "Science",
        currentAffairs: "Current Affairs"
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
        history: document.getElementById('start-history-btn'),
        geography: document.getElementById('start-geography-btn'),
        science: document.getElementById('start-science-btn'),
        currentAffairs: document.getElementById('start-currentAffairs-btn')
    };

    const heroQuizBtn = document.querySelector('.hero-buttons .btn-primary');
    const heroExploreBtn = document.querySelector('.hero-buttons .btn-outline');

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
    const tryAnotherBtn = document.getElementById('try-another-btn');

    // Init Event Listeners
    Object.keys(startBtns).forEach(topic => {
        if (startBtns[topic]) {
            startBtns[topic].addEventListener('click', () => startQuiz(topic));
        }
    });

    if (heroQuizBtn) {
        heroQuizBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('topics').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (heroExploreBtn) {
        heroExploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('topics').scrollIntoView({ behavior: 'smooth' });
        });
    }

    nextBtn.addEventListener('click', handleNext);
    retryBtn.addEventListener('click', () => startQuiz(currentTopic));
    homeBtn.addEventListener('click', backToHome);
    tryAnotherBtn.addEventListener('click', backToHome);

    // Initial Load - Check for Last Attempted Category
    const lastAttempted = localStorage.getItem('quizverse_last_category_gk');
    if(lastAttempted && startBtns[lastAttempted]) {
        // Here we could potentially highlight the last attempted if needed
    }

    // --- Core Logic ---

    function startQuiz(topic) {
        currentTopic = topic;
        currentQuestions = [...gkQuizData[topic]];
        currentQuestionIndex = 0;
        stats = { correct: 0, wrong: 0, skipped: 0 };
        
        topicTitleEl.textContent = topicTitles[topic];
        
        mainView.classList.add('hidden');
        resultContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        
        localStorage.setItem('quizverse_last_category_gk', topic);
        
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
        if (stats.correct >= 8) {
            memeImageEl.src = "../assets/success-meme.jpg";
            memeImageEl.alt = "GK Success Meme Placeholder";
            memeTextEl.textContent = "Bhai tu toh walking encyclopedia nikla 😎📚";
        } else if (stats.correct >= 5) {
            memeImageEl.src = "../assets/average-meme.jpg";
            memeImageEl.alt = "GK Average Meme Placeholder";
            memeTextEl.textContent = "Not bad! Thoda aur news aur GK revise kar 😅";
        } else {
            memeImageEl.src = "../assets/fail.jpg";
            memeImageEl.alt = "GK Fail Meme Placeholder";
            memeTextEl.textContent = "GK me thoda current affairs weak lag raha hai 😂📰";
        }

        // Local Storage
        const storageKey = `quizverse_high_score_gk_${currentTopic}`;
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