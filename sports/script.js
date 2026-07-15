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
    // SPORTS QUIZ FUNCTIONALITY & STATE
    // =========================================================================

    // Database of Questions
    const sportsQuizData = {
        cricket: [
            { q: "Who scored the first double century in ODI cricket?", options: ["Virender Sehwag", "Rohit Sharma", "Sachin Tendulkar", "Chris Gayle"], correct: 2 },
            { q: "Which country has won the most ICC Men's Cricket World Cups?", options: ["India", "West Indies", "England", "Australia"], correct: 3 },
            { q: "What is the highest individual score in Test cricket?", options: ["375", "400", "380", "501"], correct: 1 },
            { q: "Who is known as the 'God of Cricket'?", options: ["Don Bradman", "Sir Viv Richards", "Sachin Tendulkar", "Virat Kohli"], correct: 2 },
            { q: "Which bowler has taken the most wickets in Test cricket?", options: ["Shane Warne", "James Anderson", "Anil Kumble", "Muttiah Muralitharan"], correct: 3 },
            { q: "In which year did India win its first Cricket World Cup?", options: ["1975", "1979", "1983", "2011"], correct: 2 },
            { q: "What is a 'Yorker' in cricket?", options: ["A very short pitch delivery", "A delivery bouncing over the batsman's head", "A delivery aimed at the batsman's toes", "A delivery spinning sharply"], correct: 2 },
            { q: "Who holds the record for most centuries in international cricket?", options: ["Virat Kohli", "Ricky Ponting", "Sachin Tendulkar", "Jacques Kallis"], correct: 2 },
            { q: "Which stadium is known as the 'Mecca of Cricket'?", options: ["MCG", "Eden Gardens", "Wanderers", "Lord's"], correct: 3 },
            { q: "How many players are on the field from the fielding team at once?", options: ["10", "11", "12", "9"], correct: 1 }
        ],
        football: [
            { q: "Which country has won the most FIFA World Cups?", options: ["Germany", "Italy", "Argentina", "Brazil"], correct: 3 },
            { q: "Who is often referred to as 'CR7'?", options: ["Lionel Messi", "Cristiano Ronaldo", "Neymar Jr", "Kylian Mbappé"], correct: 1 },
            { q: "Which club has won the most UEFA Champions League titles?", options: ["Barcelona", "Bayern Munich", "Real Madrid", "AC Milan"], correct: 2 },
            { q: "How long is a standard professional football match (without extra time)?", options: ["60 minutes", "80 minutes", "90 minutes", "100 minutes"], correct: 2 },
            { q: "In what year was the first FIFA World Cup held?", options: ["1930", "1950", "1924", "1966"], correct: 0 },
            { q: "What is it called when a player scores three goals in a single match?", options: ["Triple Treat", "Home Run", "Hat-trick", "Grand Slam"], correct: 2 },
            { q: "Which player has won the most Ballon d'Or awards?", options: ["Cristiano Ronaldo", "Pele", "Diego Maradona", "Lionel Messi"], correct: 3 },
            { q: "What color card signifies a player's dismissal from the game?", options: ["Yellow", "Red", "Blue", "Black"], correct: 1 },
            { q: "Which country hosted the 2022 FIFA World Cup?", options: ["Russia", "Brazil", "Qatar", "South Africa"], correct: 2 },
            { q: "What is the nickname of the premier English football league?", options: ["Serie A", "La Liga", "Bundesliga", "Premier League"], correct: 3 }
        ],
        olympics: [
            { q: "In which country did the ancient Olympic Games originate?", options: ["Rome", "Egypt", "Greece", "China"], correct: 2 },
            { q: "How often are the Summer Olympic Games held?", options: ["Every 2 years", "Every 4 years", "Every 5 years", "Every 10 years"], correct: 1 },
            { q: "What do the five rings on the Olympic flag represent?", options: ["The five sports", "The five continents", "The five oceans", "The five founders"], correct: 1 },
            { q: "Who is the most decorated Olympian of all time with 28 medals?", options: ["Usain Bolt", "Carl Lewis", "Michael Phelps", "Mark Spitz"], correct: 2 },
            { q: "In which city were the 2024 Summer Olympics hosted?", options: ["Tokyo", "Los Angeles", "Paris", "London"], correct: 2 },
            { q: "Which metal is the highest award given to an Olympic athlete?", options: ["Silver", "Bronze", "Platinum", "Gold"], correct: 3 },
            { q: "Which athlete holds the world record for the 100m sprint?", options: ["Tyson Gay", "Usain Bolt", "Yohan Blake", "Justin Gatlin"], correct: 1 },
            { q: "What is the Olympic motto 'Citius, Altius, Fortius' translated into English?", options: ["Faster, Higher, Stronger", "Brave, Bold, Brilliant", "Run, Jump, Throw", "Together, United, Victorious"], correct: 0 },
            { q: "Which country has hosted the most Summer Olympic Games?", options: ["United Kingdom", "France", "Japan", "United States"], correct: 3 },
            { q: "At the Olympics, an archery target has how many colored scoring rings?", options: ["5", "10", "8", "12"], correct: 1 }
        ],
        legends: [
            { q: "Who was famously known as 'The Greatest' in boxing?", options: ["Mike Tyson", "Floyd Mayweather", "Muhammad Ali", "Joe Frazier"], correct: 2 },
            { q: "Which basketball player is famous for his logo known as 'Jumpman'?", options: ["LeBron James", "Kobe Bryant", "Michael Jordan", "Magic Johnson"], correct: 2 },
            { q: "Serena Williams is considered an all-time great in which sport?", options: ["Athletics", "Tennis", "Gymnastics", "Swimming"], correct: 1 },
            { q: "Which golfer is known as 'Tiger'?", options: ["Phil Mickelson", "Rory McIlroy", "Dustin Johnson", "Eldrick Woods"], correct: 3 },
            { q: "Usain Bolt, a legend in track and field, is from which country?", options: ["USA", "Jamaica", "Britain", "Kenya"], correct: 1 },
            { q: "Diego Maradona's infamous 'Hand of God' goal happened against which team?", options: ["Brazil", "Germany", "England", "Italy"], correct: 2 },
            { q: "Roger Federer won how many Grand Slam men's singles titles during his career?", options: ["20", "22", "24", "18"], correct: 0 },
            { q: "Which legendary Formula 1 driver drove for Ferrari and won 7 World Championships before Lewis Hamilton tied him?", options: ["Ayrton Senna", "Alain Prost", "Michael Schumacher", "Sebastian Vettel"], correct: 2 },
            { q: "Sir Don Bradman finished his test career with a batting average of:", options: ["98.40", "99.94", "100.00", "95.50"], correct: 1 },
            { q: "Who is the legendary gymnast who scored the first perfect 10 at the Olympics?", options: ["Simone Biles", "Mary Lou Retton", "Nadia Comăneci", "Olga Korbut"], correct: 2 }
        ]
    };

    const topicTitles = {
        cricket: "Cricket",
        football: "Football",
        olympics: "Olympics",
        legends: "Sports Legends"
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
        cricket: document.getElementById('start-cricket-btn'),
        football: document.getElementById('start-football-btn'),
        olympics: document.getElementById('start-olympics-btn'),
        legends: document.getElementById('start-legends-btn')
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
    const lastAttempted = localStorage.getItem('quizverse_last_category_sports');
    if(lastAttempted && startBtns[lastAttempted]) {
        // Highlight logic could be added here
    }

    // --- Core Logic ---

    function startQuiz(topic) {
        currentTopic = topic;
        currentQuestions = [...sportsQuizData[topic]];
        currentQuestionIndex = 0;
        stats = { correct: 0, wrong: 0, skipped: 0 };
        
        topicTitleEl.textContent = topicTitles[topic];
        
        mainView.classList.add('hidden');
        resultContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        
        localStorage.setItem('quizverse_last_category_sports', topic);
        
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

        // Meme logic based on requirements
        if (stats.correct >= 8) {
            memeImageEl.src = "../assets/success-meme.webp";
            memeImageEl.alt = "Sports Success Meme";
            memeTextEl.textContent = "Bhai tu toh sports commentator ban sakta hai 😎🏆";
        } else if (stats.correct >= 5) {
            memeImageEl.src = "../assets/average-meme.webp";
            memeImageEl.alt = "Sports Average Meme";
            memeTextEl.textContent = "Not bad! Match highlights ka असर dikh raha hai 😅⚽";
        } else {
            memeImageEl.src = "../assets/fail.webp";
            memeImageEl.alt = "Sports Fail Meme";
            memeTextEl.textContent = "Lagta hai live match se zyada reels dekhte ho 😂📱";
        }

        // Local Storage
        const storageKey = `quizverse_high_score_sports_${currentTopic}`;
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