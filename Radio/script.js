// Egyptian Quran Radio Logic (with backup stream and offline frequencies)

const PRIMARY_URL = 'https://n0b.radiojar.com/8s5u5tpdtwzuv';
const BACKUP_URL = 'https://n12.radiojar.com/8s5u5tpdtwzuv';

const offlineFrequencies = [
    { cityAr: 'القاهرة الكبرى', cityEn: 'Cairo', freq: 'FM 98.2' },
    { cityAr: 'الإسكندرية', cityEn: 'Alexandria', freq: 'FM 89.7' },
    { cityAr: 'الإسكندرية (بديل)', cityEn: 'Alexandria (Alt)', freq: 'FM 90.1' },
    { cityAr: 'المحلة الكبرى', cityEn: 'Mahalla', freq: 'FM 99.6' },
    { cityAr: 'المحلة الكبرى (بديل)', cityEn: 'Mahalla (Alt)', freq: 'FM 101.1' },
    { cityAr: 'بورسعيد', cityEn: 'Port Said', freq: 'FM 98.0' },
    { cityAr: 'شرم الشيخ', cityEn: 'Sharm El Sheikh', freq: 'FM 92.0' },
    { cityAr: 'الغردقة', cityEn: 'Hurghada', freq: 'FM 96.3' },
    { cityAr: 'أسوان', cityEn: 'Aswan', freq: 'FM 91.7' },
    { cityAr: 'مصر (موجة متوسطة)', cityEn: 'Egypt (Medium Wave)', freq: 'AM 864 kHz' },
];

let audioPlayer = new Audio();
let isPlaying = false;
let usingBackup = false;

document.addEventListener('DOMContentLoaded', () => {
    renderFrequencies();
    updateLanguageUI();
    localization.addListener(updateLanguageUI);
    
    // Audio event listeners
    audioPlayer.addEventListener('playing', () => {
        isPlaying = true;
        updatePlayerUI();
    });
    
    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayerUI();
    });
    
    audioPlayer.addEventListener('error', (e) => {
        console.error("Audio error", e);
        if (!usingBackup) {
            console.log("Switching to backup stream...");
            usingBackup = true;
            audioPlayer.src = BACKUP_URL;
            audioPlayer.play().catch(err => {
                handleAudioError();
            });
        } else {
            handleAudioError();
        }
    });
});

function handleAudioError() {
    const isEn = localization.currentLang === 'en';
    document.getElementById('player-status').textContent = isEn ? 'Error playing stream' : 'خطأ في تشغيل المحطة';
    isPlaying = false;
    updatePlayerUI();
}

function updateLanguageUI() {
    const isEn = localization.currentLang === 'en';
    document.getElementById('nav-quiz').textContent = isEn ? 'Quiz' : 'المسابقة';
    document.getElementById('nav-radio').textContent = isEn ? 'Radio' : 'الراديو';
    
    document.getElementById('page-title').textContent = isEn ? 'Quran Radio' : 'إذاعة القرآن الكريم';
    document.getElementById('page-desc').textContent = isEn ? 'Listen to live broadcast of Egyptian Quran Radio from Cairo' : 'استمع إلى البث المباشر لإذاعة القرآن الكريم من القاهرة';
    
    document.getElementById('current-station-name').textContent = isEn ? 'Egyptian Quran Radio (Cairo)' : 'إذاعة القرآن الكريم من القاهرة';
    
    if(!isPlaying && document.getElementById('player-status').textContent !== 'خطأ في تشغيل المحطة' && document.getElementById('player-status').textContent !== 'Error playing stream') {
        document.getElementById('player-status').textContent = isEn ? 'Stopped' : 'متوقف';
    }
    
    document.getElementById('freq-title').textContent = isEn ? 'Radio Frequencies (Offline FM/AM)' : 'ترددات الإذاعة (Offline FM/AM)';
    document.getElementById('freq-desc').textContent = isEn ? 'If you have no internet connection, you can tune in to Quran Radio using traditional radios on these frequencies:' : 'في حال انقطاع الإنترنت، يمكنك الاستماع إلى إذاعة القرآن الكريم عبر أجهزة الراديو التقليدية باستخدام الترددات التالية:';
    
    // Re-render frequencies to apply language
    renderFrequencies();
}

function renderFrequencies() {
    const isEn = localization.currentLang === 'en';
    const container = document.getElementById('freq-list');
    container.innerHTML = '';
    
    offlineFrequencies.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = `station-card animate-on-scroll`;
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="station-icon">📻</div>
            <div style="flex-grow: 1;">
                <div style="font-weight: 600; font-size: 1.1rem;">${isEn ? item.cityEn : item.cityAr}</div>
                <div style="color: var(--primary); font-family: monospace; font-size: 1rem;">${item.freq}</div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function togglePlay() {
    const isEn = localization.currentLang === 'en';
    
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        document.getElementById('player-status').textContent = isEn ? 'Loading...' : 'جاري التحميل...';
        
        // Always try primary first on a fresh play
        if (!audioPlayer.src) {
            audioPlayer.src = PRIMARY_URL;
            usingBackup = false;
        }
        
        audioPlayer.play().catch(e => {
             console.error(e);
             handleAudioError();
        });
    }
}

function updatePlayerUI() {
    const isEn = localization.currentLang === 'en';
    const playIcon = document.getElementById('play-icon');
    const visualizer = document.querySelector('.visualizer-container');
    const status = document.getElementById('player-status');
    
    if (isPlaying) {
        playIcon.textContent = '⏸️';
        visualizer.classList.add('playing');
        status.textContent = isEn ? 'Playing now' : 'يتم التشغيل الآن';
    } else {
        playIcon.textContent = '▶️';
        visualizer.classList.remove('playing');
        if (status.textContent !== 'خطأ في تشغيل المحطة' && status.textContent !== 'Error playing stream' && status.textContent !== 'جاري التحميل...' && status.textContent !== 'Loading...') {
             status.textContent = isEn ? 'Stopped' : 'متوقف';
        }
    }
}

function stopRadio() {
    const isEn = localization.currentLang === 'en';
    audioPlayer.pause();
    audioPlayer.src = ''; // Clear source to stop downloading stream
    isPlaying = false;
    document.getElementById('player-status').textContent = isEn ? 'Stopped' : 'متوقف';
    updatePlayerUI();
}

function setVolume(val) {
    audioPlayer.volume = parseFloat(val);
}
