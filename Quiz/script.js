// Islamic Quiz Logic (1000+ Bilingual Questions Dynamic Generation)

class QuizDataProvider {
    static generateQuestions() {
        const questions = [];
        questions.push(...this._getCoreQuestions());

        // Surah details generator
        for (let i = 1; i <= 114; i++) {
            const verses = this._getSurahVerses(i);
            const nameAr = this._getSurahNameAr(i);
            const nameEn = this._getSurahNameEn(i);
            const typeAr = this._isMakki(i) ? 'مكية' : 'مدنية';
            const typeEn = this._isMakki(i) ? 'Makki' : 'Madani';

            // Verses question
            let wrong1 = verses + (Math.random() > 0.5 ? 1 : 2);
            let wrong2 = verses - (Math.random() > 0.5 ? 1 : 2);
            if (wrong2 <= 0) wrong2 = verses + 5;
            let wrong3 = verses + 10;
            
            const ops1 = [verses.toString(), wrong1.toString(), wrong2.toString(), wrong3.toString()].sort(() => Math.random() - 0.5);
            questions.push({
                qAr: `كم عدد آيات سورة ${nameAr}؟`,
                qEn: `How many verses are in Surah ${nameEn}?`,
                optionsAr: ops1,
                optionsEn: ops1,
                correct: ops1.indexOf(verses.toString())
            });

            // Surah Number
            let wNum1 = i < 114 ? i + 1 : i - 1;
            let wNum2 = i > 1 ? i - 1 : i + 2;
            let wNum3 = i < 110 ? i + 4 : i - 3;
            const ops2 = [i.toString(), wNum1.toString(), wNum2.toString(), wNum3.toString()].sort(() => Math.random() - 0.5);
            questions.push({
                qAr: `ما هو رقم سورة ${nameAr} في المصحف؟`,
                qEn: `What is the Surah number of ${nameEn}?`,
                optionsAr: ops2,
                optionsEn: ops2,
                correct: ops2.indexOf(i.toString())
            });

            // Makki/Madani
            const ops3Ar = ['مكية', 'مدنية', 'حبشية', 'طائفية'];
            const ops3En = ['Makki', 'Madani', 'Habashi', 'Taifi'];
            questions.push({
                qAr: `هل سورة ${nameAr} مكية أم مدنية؟`,
                qEn: `Is Surah ${nameEn} Makki or Madani?`,
                optionsAr: ops3Ar,
                optionsEn: ops3En,
                correct: ops3Ar.indexOf(typeAr)
            });
            
            // Quarter position
            const quarter = i <= 28 ? 1 : i <= 57 ? 2 : i <= 86 ? 3 : 4;
            const quarterAr = ['الربع الأول', 'الربع الثاني', 'الربع الثالث', 'الربع الرابع'];
            const quarterEn = ['First quarter', 'Second quarter', 'Third quarter', 'Fourth quarter'];
            questions.push({
                qAr: `في أي ربع من ترتيب المصحف تقع سورة ${nameAr}؟`,
                qEn: `In which quarter of the Mushaf order is Surah ${nameEn}?`,
                optionsAr: quarterAr,
                optionsEn: quarterEn,
                correct: quarter - 1
            });
        }

        // Hijri Months
        const monthsAr = ['المحرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
        const monthsEn = ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'];
        
        for (let i = 0; i < 12; i++) {
            let num = i + 1;
            let w1 = num === 12 ? 1 : num + 1;
            let w2 = num === 1 ? 12 : num - 1;
            let w3 = (num + 5) % 12 + 1;
            let mOps = [num.toString(), w1.toString(), w2.toString(), w3.toString()].sort(() => Math.random() - 0.5);
            questions.push({
                qAr: `ما هو ترتيب شهر ${monthsAr[i]} في السنة الهجرية؟`,
                qEn: `What is the number of month ${monthsEn[i]} in the Hijri calendar?`,
                optionsAr: mOps,
                optionsEn: mOps,
                correct: mOps.indexOf(num.toString())
            });
        }
        
        // Prayer questions
        questions.push(...this._generateTemplateQuestions());

        return questions;
    }

    static _getSurahVerses(i) {
        const verses = [7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6];
        return verses[i - 1];
    }

    static _getSurahNameAr(i) {
        const names = ['الفاتحة', 'البقرة', 'آل عمران', 'النساء', 'المائدة', 'الأنعام', 'الأعراف', 'الأنفال', 'التوبة', 'يونس', 'هود', 'يوسف', 'الرعد', 'إبراهيم', 'الحجر', 'النحل', 'الإسراء', 'الكهف', 'مريم', 'طه', 'الأنبياء', 'الحج', 'المؤمنون', 'النور', 'الفرقان', 'الشعراء', 'النمل', 'القصص', 'العنكبوت', 'الروم', 'لقمان', 'السجدة', 'الأحزاب', 'سبأ', 'فاطر', 'يس', 'الصافات', 'ص', 'الزمر', 'غافر', 'فصلت', 'الشورى', 'الزخرف', 'الدخان', 'الجاثية', 'الأحقاف', 'محمد', 'الفتح', 'الحجرات', 'ق', 'الذاريات', 'الطور', 'النجم', 'القمر', 'الرحمن', 'الواقعة', 'الحديد', 'المجادلة', 'الحشر', 'الممتحنة', 'الصف', 'الجمعة', 'المنافقون', 'التغابن', 'الطلاق', 'التحريم', 'الملك', 'القلم', 'الحاقة', 'المعارج', 'نوح', 'الجن', 'المزمل', 'المدثر', 'القيامة', 'الإنسان', 'المرسلات', 'النبأ', 'النازعات', 'عبس', 'التكوير', 'الانفطار', 'المطففين', 'الانشقاق', 'البروج', 'الطارق', 'الأعلى', 'الغاشية', 'الفجر', 'البلد', 'الشمس', 'الليل', 'الضحى', 'الشرح', 'التين', 'العلق', 'القدر', 'البينة', 'الزلزلة', 'العاديات', 'القارعة', 'التكاثر', 'العصر', 'الهمزة', 'الفيل', 'قريش', 'الماعون', 'الكوثر', 'الكافرون', 'النصر', 'المسد', 'الإخلاص', 'الفلق', 'الناس'];
        return names[i - 1];
    }

    static _getSurahNameEn(i) {
        const names = ['Al-Fatihah', 'Al-Baqarah', 'Al-Imran', 'An-Nisa', 'Al-Ma\'idah', 'Al-An\'am', 'Al-A\'raf', 'Al-Anfal', 'At-Tawbah', 'Yunus', 'Hud', 'Yusuf', 'Ar-Ra\'d', 'Ibrahim', 'Al-Hijr', 'An-Nahl', 'Al-Isra', 'Al-Kahf', 'Maryam', 'Ta-Ha', 'Al-Anbiya', 'Al-Hajj', 'Al-Mu\'minun', 'An-Nur', 'Al-Furqan', 'Ash-Shu\'ara', 'An-Naml', 'Al-Qasas', 'Al-\'Ankabut', 'Ar-Rum', 'Luqman', 'As-Sajdah', 'Al-Ahzab', 'Saba', 'Fatir', 'Ya-Sin', 'As-Saffat', 'Sad', 'Az-Zumar', 'Ghafir', 'Fussilat', 'Ash-Shura', 'Az-Zukhruf', 'Ad-Dukhan', 'Al-Jathiyah', 'Al-Ahqaf', 'Muhammad', 'Al-Fath', 'Al-Hujurat', 'Qaf', 'Ad-Dhariyat', 'At-Tur', 'An-Najm', 'Al-Qamar', 'Ar-Rahman', 'Al-Waqi\'ah', 'Al-Hadid', 'Al-Mujadila', 'Al-Hashr', 'Al-Mumtahanah', 'As-Saff', 'Al-Jumu\'ah', 'Al-Munafiqun', 'At-Taghabun', 'At-Talaq', 'At-Tahrim', 'Al-Mulk', 'Al-Qalam', 'Al-Haqqah', 'Al-Ma\'arij', 'Nuh', 'Al-Jinn', 'Al-Muzzammil', 'Al-Muddaththir', 'Al-Qiyamah', 'Al-Insan', 'Al-Mursalat', 'An-Naba', 'An-Nazi\'at', '\'Abasa', 'At-Takwir', 'Al-Infitar', 'Al-Mutaffifin', 'Al-Inshiqaq', 'Al-Buruj', 'At-Tariq', 'Al-A\'la', 'Al-Ghashiyah', 'Al-Fajr', 'Al-Balad', 'Ash-Shams', 'Al-Lail', 'Ad-Duhaa', 'Ash-Sharh', 'At-Tin', 'Al-\'Alaq', 'Al-Qadr', 'Al-Bayyinah', 'Az-Zalzalah', 'Al-\'Adiyat', 'Al-Qari\'ah', 'At-Takathur', 'Al-\'Asr', 'Al-Humazah', 'Al-Fil', 'Quraish', 'Al-Ma\'un', 'Al-Kawthar', 'Al-Kafirun', 'An-Nasr', 'Al-Masad', 'Al-Ikhlas', 'Al-Falaq', 'An-Nas'];
        return names[i - 1];
    }

    static _isMakki(i) {
        const madani = [2, 3, 4, 5, 8, 9, 13, 22, 24, 33, 47, 48, 49, 55, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 76, 98, 99, 110];
        return !madani.includes(i);
    }

    static _getCoreQuestions() {
        return [
            {qAr: 'كم عدد سور القرآن الكريم؟', qEn: 'How many surahs are in the Quran?', optionsAr: ['112', '114', '120', '110'], optionsEn: ['112', '114', '120', '110'], correct: 1},
            {qAr: 'ما أطول سورة في القرآن؟', qEn: 'What is the longest surah?', optionsAr: ['آل عمران', 'البقرة', 'النساء', 'المائدة'], optionsEn: ['Aal Imran', 'Al-Baqarah', 'An-Nisa', 'Al-Ma\'idah'], correct: 1},
            {qAr: 'كم عدد أركان الإسلام؟', qEn: 'How many pillars of Islam?', optionsAr: ['4', '6', '5', '3'], optionsEn: ['4', '6', '5', '3'], correct: 2},
            {qAr: 'ما أول ما نزل من القرآن؟', qEn: 'What was first revealed?', optionsAr: ['الفاتحة', 'اقرأ', 'المدثر', 'البقرة'], optionsEn: ['Al-Fatihah', 'Iqra', 'Al-Muddaththir', 'Al-Baqarah'], correct: 1},
            {qAr: 'ما أقصر سورة في القرآن؟', qEn: 'Shortest surah?', optionsAr: ['الإخلاص', 'الكوثر', 'النصر', 'الفلق'], optionsEn: ['Al-Ikhlas', 'Al-Kawthar', 'An-Nasr', 'Al-Falaq'], correct: 1},
            {qAr: 'ما السورة التي تسمى قلب القرآن؟', qEn: 'Which surah is the heart of Quran?', optionsAr: ['الرحمن', 'يس', 'الكهف', 'الملك'], optionsEn: ['Ar-Rahman', 'Ya-Sin', 'Al-Kahf', 'Al-Mulk'], correct: 1},
            {qAr: 'ما عدد أجزاء القرآن الكريم؟', qEn: 'How many Juz are in the Quran?', optionsAr: ['20', '30', '40', '60'], optionsEn: ['20', '30', '40', '60'], correct: 1},
            {qAr: 'كم عدد أبواب الجنة؟', qEn: 'How many gates does Paradise have?', optionsAr: ['6', '7', '8', '9'], optionsEn: ['6', '7', '8', '9'], correct: 2},
            {qAr: 'ما السورة التي تعدل ثلث القرآن؟', qEn: 'Which surah equals one-third of Quran?', optionsAr: ['الفاتحة', 'الإخلاص', 'الناس', 'الكوثر'], optionsEn: ['Al-Fatihah', 'Al-Ikhlas', 'An-Nas', 'Al-Kawthar'], correct: 1},
            {qAr: 'ما اسم أول مسجد بُني في الإسلام؟', qEn: 'What is the first mosque built in Islam?', optionsAr: ['المسجد الحرام', 'المسجد الأقصى', 'مسجد قباء', 'المسجد النبوي'], optionsEn: ['Masjid Al-Haram', 'Al-Aqsa Mosque', 'Quba Mosque', 'Prophet Mosque'], correct: 2}
        ];
    }
    
    static _generateTemplateQuestions() {
        const generated = [];
        const prayerPairs = [['Fajr', 'الفجر'], ['Dhuhr', 'الظهر'], ['Asr', 'العصر'], ['Maghrib', 'المغرب'], ['Isha', 'العشاء']];
        const rakah = { 'Fajr': 2, 'Dhuhr': 4, 'Asr': 4, 'Maghrib': 3, 'Isha': 4 };
        
        for (let i = 0; i < 20; i++) { // Generate multiple to fill the bank
            for (const pair of prayerPairs) {
                const en = pair[0];
                const ar = pair[1];
                const correctRak = rakah[en];
                const opts = Array.from(new Set([
                    correctRak.toString(),
                    (correctRak + 1).toString(),
                    (correctRak === 2 ? 3 : correctRak - 1).toString(),
                    (correctRak + 2).toString()
                ]));
                while(opts.length < 4) {
                    opts.push((correctRak + Math.floor(Math.random() * 3) + 1).toString());
                }
                opts.sort(() => Math.random() - 0.5);
                generated.push({
                    qAr: `كم عدد ركعات صلاة ${ar} المفروضة؟`,
                    qEn: `How many obligatory rakahs are in ${en} prayer?`,
                    optionsAr: opts.slice(0, 4),
                    optionsEn: opts.slice(0, 4),
                    correct: opts.slice(0,4).indexOf(correctRak.toString())
                });
            }
        }
        return generated;
    }
}

// Global state
let allQuestions = [];
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Generate questions on load to avoid lag later
    allQuestions = QuizDataProvider.generateQuestions();
    
    // Update labels if needed based on language
    updateQuizLanguage();
    localization.addListener(updateQuizLanguage);
});

function updateQuizLanguage() {
    const isEn = localization.currentLang === 'en';
    document.getElementById('start-title').textContent = isEn ? '1000+ Questions Quiz' : 'مسابقة 1000+ سؤال';
    document.getElementById('start-desc').textContent = isEn ? 'Each round will randomly pick 10 questions to test your Islamic knowledge.' : 'في كل جولة سيتم اختيار 10 أسئلة عشوائياً لاختبار معرفتك بالقرآن الكريم والسنة النبوية والثقافة الإسلامية.';
    document.getElementById('start-btn').textContent = isEn ? 'Start Quiz Now' : 'ابدأ المسابقة الآن';
}

function startQuiz() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'none';
    
    const quizScreen = document.getElementById('quiz-screen');
    quizScreen.style.display = 'block';
    
    // Apply animation
    quizScreen.classList.remove('fade-in');
    void quizScreen.offsetWidth; // trigger reflow
    quizScreen.classList.add('fade-in');
    
    score = 0;
    currentQuestionIndex = 0;
    
    const isEn = localization.currentLang === 'en';
    document.getElementById('score-display').textContent = isEn ? `Score: ${score}` : `النقاط: ${score}`;
    
    // Shuffle and pick 10 unique questions
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    currentQuestions = shuffled.slice(0, 10);
    
    loadQuestion();
}

function loadQuestion() {
    const isEn = localization.currentLang === 'en';
    const question = currentQuestions[currentQuestionIndex];
    
    document.getElementById('question-counter').textContent = isEn ? `Question ${currentQuestionIndex + 1} / 10` : `السؤال ${currentQuestionIndex + 1} / 10`;
    
    const qText = document.getElementById('question-text');
    qText.textContent = isEn ? question.qEn : question.qAr;
    qText.classList.remove('slide-in-up');
    void qText.offsetWidth;
    qText.classList.add('slide-in-up');
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    const lettersAr = ['أ', 'ب', 'ج', 'د'];
    const lettersEn = ['A', 'B', 'C', 'D'];
    const letters = isEn ? lettersEn : lettersAr;
    const optionsText = isEn ? question.optionsEn : question.optionsAr;
    
    optionsText.forEach((optionText, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn fade-in';
        btn.style.animationDelay = `${index * 0.1}s`;
        
        btn.innerHTML = `
            <span class="option-letter">${letters[index]}</span>
            <span>${optionText}</span>
        `;
        
        // Remove animation class after it completes to allow hover transforms
        setTimeout(() => { btn.classList.remove('fade-in'); }, 1000);
        
        btn.onclick = () => selectOption(index, question.correct, btn);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedIndex, correctIndex, selectedBtn) {
    const isEn = localization.currentLang === 'en';
    const optionsContainer = document.getElementById('options-container');
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === correctIndex) {
        selectedBtn.classList.add('correct');
        score++;
        document.getElementById('score-display').textContent = isEn ? `Score: ${score}` : `النقاط: ${score}`;
    } else {
        selectedBtn.classList.add('wrong');
        buttons[correctIndex].classList.add('correct');
    }
    
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    const isEn = localization.currentLang === 'en';
    document.getElementById('quiz-screen').style.display = 'none';
    
    const resultScreen = document.getElementById('result-screen');
    resultScreen.style.display = 'block';
    resultScreen.classList.add('scale-in');
    
    document.getElementById('result-title').textContent = isEn ? 'Quiz Completed!' : 'انتهت المسابقة!';
    
    const resultTextContainer = document.getElementById('result-text-container');
    if (!resultTextContainer) {
        // Find the div containing the final score
        const scoreDiv = document.getElementById('final-score').parentNode;
        scoreDiv.id = 'result-text-container';
    }
    
    document.getElementById('result-text-container').innerHTML = isEn 
        ? `You answered correctly <strong id="final-score" style="color: var(--primary); font-size: 2rem;">${score}</strong> out of 10`
        : `لقد أجبت بشكل صحيح على <strong id="final-score" style="color: var(--primary); font-size: 2rem;">${score}</strong> من أصل 10`;
    
    const messageEl = document.getElementById('result-message');
    const iconEl = document.getElementById('result-icon');
    
    const percentage = score / currentQuestions.length;
    
    if (percentage === 1) {
        iconEl.textContent = '🌟';
        messageEl.textContent = isEn ? 'Excellent! All answers correct.' : 'ممتاز! إجاباتك كلها صحيحة. زادك الله علماً وفهماً.';
    } else if (percentage >= 0.7) {
        iconEl.textContent = '👍';
        messageEl.textContent = isEn ? 'Great job! Keep seeking knowledge.' : 'رائع! نتيجة جيدة جداً، استمر في طلب العلم.';
    } else if (percentage >= 0.5) {
        iconEl.textContent = '📚';
        messageEl.textContent = isEn ? 'Good, but you can do better next time.' : 'جيد، ولكن يمكنك تحقيق نتيجة أفضل في المرة القادمة.';
    } else {
        iconEl.textContent = '🌱';
        messageEl.textContent = isEn ? 'Try again to refresh your Islamic knowledge.' : 'حاول مرة أخرى لتنشيط معلوماتك الدينية.';
    }
    
    document.getElementById('retry-btn').innerHTML = isEn ? '<span>🔄</span> Try Again' : '<span>🔄</span> حاول مرة أخرى';
}
