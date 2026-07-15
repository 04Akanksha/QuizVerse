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
    // MOVIES QUIZ FUNCTIONALITY & STATE
    // =========================================================================

    // Database of Questions
    const movieQuizData = {
        bollywood: [
            { q: "Which Bollywood movie is known for the dialogue 'Kitne aadmi the'?", options: ["Deewaar", "Sholay", "Don", "Mughal-e-Azam"], correct: 1 },
            { q: "Who is known as the 'King of Bollywood'?", options: ["Salman Khan", "Aamir Khan", "Shah Rukh Khan", "Amitabh Bachchan"], correct: 2 },
            { q: "Which movie is considered the highest grossing Bollywood film globally (as of 2023)?", options: ["Jawan", "Dangal", "Pathaan", "PK"], correct: 1 },
            { q: "Who played the character of 'Rancho' in 3 Idiots?", options: ["R Madhavan", "Sharman Joshi", "Aamir Khan", "Boman Irani"], correct: 2 },
            { q: "Which of these is India's first sound film?", options: ["Raja Harishchandra", "Alam Ara", "Mother India", "Shree 420"], correct: 1 },
            { q: "Who directed the movie 'Dilwale Dulhania Le Jayenge'?", options: ["Karan Johar", "Yash Chopra", "Aditya Chopra", "Sanjay Leela Bhansali"], correct: 2 },
            { q: "Which actor plays 'Chulbul Pandey' in Dabangg?", options: ["Salman Khan", "Akshay Kumar", "Ajay Devgn", "Ranveer Singh"], correct: 0 },
            { q: "In 'Zindagi Na Milegi Dobara', where do the friends go for their bachelor trip?", options: ["France", "USA", "Spain", "Italy"], correct: 2 },
            { q: "Who sang the famous song 'Chaiyya Chaiyya'?", options: ["A.R. Rahman", "Sukhwinder Singh", "Sonu Nigam", "Udit Narayan"], correct: 1 },
            { q: "Which actress made her debut in 'Om Shanti Om'?", options: ["Deepika Padukone", "Anushka Sharma", "Katrina Kaif", "Priyanka Chopra"], correct: 0 }
        ],
        hollywood: [
            { q: "Who directed the movie 'Inception'?", options: ["Steven Spielberg", "Christopher Nolan", "Martin Scorsese", "Quentin Tarantino"], correct: 1 },
            { q: "Which movie won the first Academy Award for Best Picture?", options: ["Metropolis", "Wings", "The Jazz Singer", "Sunrise"], correct: 1 },
            { q: "What is the name of the fictional African country in 'Black Panther'?", options: ["Genosha", "Zamunda", "Wakanda", "Krakoa"], correct: 2 },
            { q: "Who played the Joker in 'The Dark Knight' (2008)?", options: ["Joaquin Phoenix", "Jared Leto", "Jack Nicholson", "Heath Ledger"], correct: 3 },
            { q: "Which film has the highest worldwide gross ever (as of 2023)?", options: ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"], correct: 0 },
            { q: "In 'The Matrix', what color pill does Neo take?", options: ["Blue", "Red", "Green", "Yellow"], correct: 1 },
            { q: "Who played Forrest Gump?", options: ["Tom Cruise", "Tom Hanks", "Brad Pitt", "Johnny Depp"], correct: 1 },
            { q: "Which 1994 film is currently rated #1 on IMDb's Top 250?", options: ["The Godfather", "Pulp Fiction", "The Shawshank Redemption", "Schindler's List"], correct: 2 },
            { q: "What is the famous line from 'The Terminator'?", options: ["I'll be seeing you", "Hasta la vista", "I'll be back", "Time to die"], correct: 2 },
            { q: "Who directed 'Jurassic Park'?", options: ["James Cameron", "George Lucas", "Steven Spielberg", "Ridley Scott"], correct: 2 }
        ],
        marvelDc: [
            { q: "What is the true name of Batman?", options: ["Clark Kent", "Bruce Wayne", "Hal Jordan", "Barry Allen"], correct: 1 },
            { q: "Which Infinity Stone was hidden on Vormir?", options: ["Soul Stone", "Mind Stone", "Time Stone", "Space Stone"], correct: 0 },
            { q: "What is Superman's home planet?", options: ["Krypton", "Mars", "Oa", "Apokolips"], correct: 0 },
            { q: "Who is the primary villain in the Avengers' 'Infinity Saga'?", options: ["Loki", "Ultron", "Kang", "Thanos"], correct: 3 },
            { q: "What is Wonder Woman's alias in the human world?", options: ["Diana Prince", "Kara Danvers", "Selina Kyle", "Barbara Gordon"], correct: 0 },
            { q: "Which metal is Wolverine's skeleton laced with?", options: ["Vibranium", "Adamantium", "Uru", "Nth Metal"], correct: 1 },
            { q: "What weapon does Thor primarily wield before obtaining Stormbreaker?", options: ["Gungnir", "Excelsior", "Mjolnir", "Jarnbjorn"], correct: 2 },
            { q: "Who is the 'Merc with a Mouth'?", options: ["Spider-Man", "Wolverine", "Deadpool", "Punisher"], correct: 2 },
            { q: "Which DC city is flash primarily from?", options: ["Gotham City", "Metropolis", "Central City", "Star City"], correct: 2 },
            { q: "Who directed the first 'Avengers' (2012) movie?", options: ["Zack Snyder", "Joss Whedon", "Russo Brothers", "Jon Favreau"], correct: 1 }
        ],
        franchises: [
            { q: "In 'Harry Potter', what is the name of Harry's pet owl?", options: ["Crookshanks", "Scabbers", "Hedwig", "Fawkes"], correct: 2 },
            { q: "How many films are in the original 'Lord of the Rings' trilogy?", options: ["Two", "Three", "Four", "Five"], correct: 1 },
            { q: "Who is the creator of the 'Star Wars' universe?", options: ["J.J. Abrams", "George Lucas", "Steven Spielberg", "James Cameron"], correct: 1 },
            { q: "What is the name of the central character in 'The Hunger Games' series?", options: ["Hermione Granger", "Katniss Everdeen", "Tris Prior", "Bella Swan"], correct: 1 },
            { q: "Which franchise features the T-800 cyborg?", options: ["RoboCop", "Transformers", "The Terminator", "The Matrix"], correct: 2 },
            { q: "In 'James Bond', what is the codename of the fictional MI6 agent?", options: ["006", "007", "008", "009"], correct: 1 },
            { q: "What is the main theme park called in the 'Jurassic' franchise?", options: ["Dinosaur World", "Isla Nublar Park", "Jurassic Park", "Cretaceous Zone"], correct: 2 },
            { q: "Who played Jack Sparrow in the 'Pirates of the Caribbean'?", options: ["Orlando Bloom", "Geoffrey Rush", "Jude Law", "Johnny Depp"], correct: 3 },
            { q: "Which franchise includes the characters Neo, Morpheus, and Trinity?", options: ["The Matrix", "John Wick", "Blade Runner", "Star Trek"], correct: 0 },
            { q: "What is the name of the car used for time travel in 'Back to the Future'?", options: ["Mustang", "Delorean", "Impala", "Camaro"], correct: 1 }
        ]
    };

    const topicTitles = {
        bollywood: "Bollywood",
        hollywood: "Hollywood",
        marvelDc: "Marvel & DC",
        franchises: "Famous Franchises"
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
        bollywood: document.getElementById('start-bollywood-btn'),
        hollywood: document.getElementById('start-hollywood-btn'),
        marvelDc: document.getElementById('start-marvelDc-btn'),
        franchises: document.getElementById('start-franchises-btn')
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
    const lastAttempted = localStorage.getItem('quizverse_last_category_movies');
    if(lastAttempted && startBtns[lastAttempted]) {
        // Highlight logic could be added here
    }

    // --- Core Logic ---

    function startQuiz(topic) {
        currentTopic = topic;
        currentQuestions = [...movieQuizData[topic]];
        currentQuestionIndex = 0;
        stats = { correct: 0, wrong: 0, skipped: 0 };
        
        topicTitleEl.textContent = topicTitles[topic];
        
        mainView.classList.add('hidden');
        resultContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        
        localStorage.setItem('quizverse_last_category_movies', topic);
        
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
            memeImageEl.alt = "Movie Success Meme";
            memeTextEl.textContent = "Bhai tu toh IMDb ka hidden reviewer nikla 😎🍿";
        } else if (stats.correct >= 5) {
            memeImageEl.src = "../assets/average-meme.webp";
            memeImageEl.alt = "Movie Average Meme";
            memeTextEl.textContent = "Not bad! Weekend movie nights ka असर dikh raha hai 😅🎥";
        } else {
            memeImageEl.src = "../assets/fail.webp";
            memeImageEl.alt = "Movie Fail Meme";
            memeTextEl.textContent = "Lagta hai OTT subscriptions ka paisa waste ja raha hai 😂📺";
        }

        // Local Storage
        const storageKey = `quizverse_high_score_movies_${currentTopic}`;
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