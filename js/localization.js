/**
 * MKS Muslim - Localization Service
 * Supports Arabic (RTL) and English (LTR)
 */

const translations = {
    // Navigation
    nav_prayer: { ar: 'الصلاة', en: 'Prayer' },
    nav_quran: { ar: 'القرآن', en: 'Quran' },
    nav_tasbih: { ar: 'تسبيح', en: 'Tasbih' },
    nav_tasks: { ar: 'المهام', en: 'Tasks' },
    nav_culture: { ar: 'ثقافة', en: 'Culture' },
    nav_hadith: { ar: 'الأحاديث', en: 'Hadith' },
    nav_qibla: { ar: 'البوصلة', en: 'Qibla' },
    nav_settings: { ar: 'الإعدادات', en: 'Settings' },
    nav_about: { ar: 'عن التطبيق', en: 'About' },

    // Common
    app_name: { ar: 'MKS المسلم', en: 'MKS Muslim' },
    app_tagline: { ar: 'تطبيق إسلامي شامل', en: 'Comprehensive Islamic App' },
    loading: { ar: 'جاري التحميل...', en: 'Loading...' },
    error: { ar: 'حدث خطأ', en: 'Error occurred' },
    retry: { ar: 'إعادة المحاولة', en: 'Retry' },
    refresh: { ar: 'تحديث', en: 'Refresh' },
    save: { ar: 'حفظ', en: 'Save' },
    cancel: { ar: 'إلغاء', en: 'Cancel' },
    search: { ar: 'بحث', en: 'Search' },
    no_data: { ar: 'لا توجد بيانات', en: 'No data available' },
    last_update: { ar: 'آخر تحديث', en: 'Last update' },
    download: { ar: 'تحميل', en: 'Download' },
    yes: { ar: 'نعم', en: 'Yes' },
    no: { ar: 'لا', en: 'No' },

    // Prayer
    prayer_times: { ar: 'مواقيت الصلاة', en: 'Prayer Times' },
    enter_city: { ar: 'أدخل اسم المدينة', en: 'Enter city name' },
    enter_country: { ar: 'أدخل اسم الدولة', en: 'Enter country name' },
    fajr: { ar: 'الفجر', en: 'Fajr' },
    sunrise: { ar: 'الشروق', en: 'Sunrise' },
    dhuhr: { ar: 'الظهر', en: 'Dhuhr' },
    asr: { ar: 'العصر', en: 'Asr' },
    maghrib: { ar: 'المغرب', en: 'Maghrib' },
    isha: { ar: 'العشاء', en: 'Isha' },
    imsak: { ar: 'الإمساك', en: 'Imsak' },
    midnight: { ar: 'منتصف الليل', en: 'Midnight' },
    sunset: { ar: 'الغروب', en: 'Sunset' },
    first_third: { ar: 'الثلث الأول', en: 'First Third' },
    last_third: { ar: 'الثلث الأخير', en: 'Last Third' },
    auto_location: { ar: 'تحديد الموقع تلقائياً', en: 'Auto Location' },
    location_permission_denied: { ar: 'تم رفض إذن الموقع', en: 'Location permission denied' },

    // Quran
    quran: { ar: 'القرآن الكريم', en: 'The Holy Quran' },
    search_surah: { ar: 'ابحث عن سورة', en: 'Search for Surah' },
    verses: { ar: 'آيات', en: 'Verses' },
    last_read: { ar: 'آخر قراءة', en: 'Last Read' },
    continue_reading: { ar: 'استمر في القراءة', en: 'Continue Reading' },
    meccan: { ar: 'مكية', en: 'Meccan' },
    medinan: { ar: 'مدنية', en: 'Medinan' },

    // Hadith
    hadith: { ar: 'الأحاديث النبوية', en: 'Prophetic Hadiths' },
    bukhari: { ar: 'صحيح البخاري', en: 'Sahih Al-Bukhari' },
    muslim: { ar: 'صحيح مسلم', en: 'Sahih Muslim' },
    hadith_number: { ar: 'حديث رقم', en: 'Hadith #' },
    search_hadith: { ar: 'ابحث عن حديث برقم', en: 'Search hadith by number' },

    // Tasbih
    tasbih: { ar: 'السبحة الإلكترونية', en: 'Digital Tasbih' },
    digital_tasbih: { ar: 'السبحة الإلكترونية', en: 'Digital Tasbih' },
    tasbih_phrases: { ar: 'جمل التسبيح', en: 'Tasbih Phrases' },
    morning_evening: { ar: 'أذكار الصباح والمساء', en: 'Morning & Evening Azkar' },
    supplications: { ar: 'الأدعية', en: 'Supplications' },
    reset_counter: { ar: 'تصفير العداد', en: 'Reset Counter' },
    tap_to_count: { ar: 'اضغط للعد', en: 'Tap to count' },
    tashahhud: { ar: 'التشهد', en: 'Tashahhud' },

    // Tasks
    tasks: { ar: 'المهام', en: 'Tasks' },
    task_list: { ar: 'قائمة المهام', en: 'Task List' },
    add_task: { ar: 'إضافة مهمة', en: 'Add Task' },
    no_tasks: { ar: 'لا توجد مهام', en: 'No tasks' },
    task_name: { ar: 'اسم المهمة', en: 'Task Name' },
    task_reminder: { ar: 'تذكير بالمهمة', en: 'Task Reminder' },
    tasks_completed: { ar: 'المهام المكتملة', en: 'Completed' },
    tasks_pending: { ar: 'المهام المتبقية', en: 'Pending' },
    add_new_task: { ar: 'إضافة مهمة جديدة', en: 'Add New Task' },
    task_color: { ar: 'لون المهمة', en: 'Task Color' },
    reminders: { ar: 'التذكيرات', en: 'Reminders' },
    date: { ar: 'التاريخ', en: 'Date' },
    time: { ar: 'الوقت', en: 'Time' },

    // Culture
    islamic_culture: { ar: 'ثقافة إسلامية', en: 'Islamic Culture' },

    // Qibla
    qibla_compass: { ar: 'بوصلة القبلة', en: 'Qibla Compass' },
    qibla_direction: { ar: 'اتجاه القبلة', en: 'Qibla Direction' },
    location_required: { ar: 'يجب تحديد الموقع أولاً', en: 'Location is required' },
    qibla_note: { ar: 'وجه هاتفك نحو الاتجاه الموضح', en: 'Point your device towards the indicated direction' },
    facing_qibla: { ar: 'أنت تواجه القبلة', en: 'You are facing Qibla' },

    // Settings
    settings: { ar: 'الإعدادات', en: 'Settings' },
    language: { ar: 'اللغة', en: 'Language' },
    arabic: { ar: 'العربية', en: 'Arabic' },
    english: { ar: 'الإنجليزية', en: 'English' },
    theme: { ar: 'المظهر', en: 'Theme' },
    dark_mode: { ar: 'الوضع الداكن', en: 'Dark Mode' },
    light_mode: { ar: 'الوضع الفاتح', en: 'Light Mode' },
    notifications: { ar: 'الإشعارات', en: 'Notifications' },
    enable_notifications: { ar: 'تفعيل الإشعارات', en: 'Enable Notifications' },
    prayer_reminders: { ar: 'تذكير أوقات الصلاة', en: 'Prayer Time Reminders' },
    clear_cache: { ar: 'مسح الذاكرة المؤقتة', en: 'Clear Cache' },
    cache_cleared: { ar: 'تم مسح الذاكرة المؤقتة', en: 'Cache cleared' },
    install_app: { ar: 'تثبيت التطبيق', en: 'Install App' },
    install_hint: { ar: 'قم بتثبيت التطبيق على جهازك', en: 'Install the app on your device' },
    hadith_notifications: { ar: 'إشعارات الحديث اليومي', en: 'Daily Hadith Notifications' },
    cycle_completed: { ar: 'اكتملت الدورة', en: 'Cycle Completed' },
    reset_confirm: { ar: 'هل د تريد تصفير العداد؟', en: 'Reset counter?' },
    target: { ar: 'الهدف', en: 'Target' },
    cycle: { ar: 'الدورة', en: 'Round' },
    unlimited: { ar: 'مفتوح', en: 'Unlimited' },

    // About
    about: { ar: 'عن التطبيق', en: 'About' },
    developer: { ar: 'المطور', en: 'Developer' },
    developed_by: { ar: 'تم التطوير بواسطة', en: 'Developed by' },
    version: { ar: 'الإصدار', en: 'Version' },
    about_developer: { ar: 'السيرة الذاتية', en: 'About Developer' },

    // Dates
    gregorian: { ar: 'الميلادي', en: 'Gregorian' },
    hijri: { ar: 'الهجري', en: 'Hijri' },
    today: { ar: 'اليوم', en: 'Today' },

    // Hijri Months
    Muharram: { ar: 'محرم', en: 'Muharram' },
    Safar: { ar: 'صفر', en: 'Safar' },
    'Rabi al-Awwal': { ar: 'ربيع الأول', en: "Rabi' al-Awwal" },
    'Rabi al-Thani': { ar: 'ربيع الثاني', en: "Rabi' al-Thani" },
    'Jumada al-Ula': { ar: 'جمادى الأولى', en: 'Jumada al-Ula' },
    'Jumada al-Akhira': { ar: 'جمادى الآخرة', en: 'Jumada al-Akhira' },
    Rajab: { ar: 'رجب', en: 'Rajab' },
    Shaban: { ar: 'شعبان', en: "Sha'ban" },
    Ramadan: { ar: 'رمضان', en: 'Ramadan' },
    Shawwal: { ar: 'شوال', en: 'Shawwal' },
    'Dhu al-Qadah': { ar: 'ذو القعدة', en: "Dhu al-Qi'dah" },
    'Dhu al-Hijjah': { ar: 'ذو الحجة', en: "Dhu al-Hijjah" },

    // Weekdays
    Sunday: { ar: 'الأحد', en: 'Sunday' },
    Monday: { ar: 'الإثنين', en: 'Monday' },
    Tuesday: { ar: 'الثلاثاء', en: 'Tuesday' },
    Wednesday: { ar: 'الأربعاء', en: 'Wednesday' },
    Thursday: { ar: 'الخميس', en: 'Thursday' },
    Friday: { ar: 'الجمعة', en: 'Friday' },
    Saturday: { ar: 'السبت', en: 'Saturday' },
    'Al Ahad': { ar: 'الأحد', en: 'Sunday' },
    'Al Ithnain': { ar: 'الإثنين', en: 'Monday' },
    'Al Thulatha': { ar: 'الثلاثاء', en: 'Tuesday' },
    "Al Arba'a": { ar: 'الأربعاء', en: 'Wednesday' },
    'Al Khamis': { ar: 'الخميس', en: 'Thursday' },
    "Al Juma'a": { ar: 'الجمعة', en: 'Friday' },
    'Al Sabt': { ar: 'السبت', en: 'Saturday' },

    // Tasbih Phrases
    subhanallah: { ar: 'سبحان الله', en: 'SubhanAllah' },
    alhamdulillah: { ar: 'الحمد لله', en: 'Alhamdulillah' },
    allahuakbar: { ar: 'الله أكبر', en: 'Allahu Akbar' },
    lailahaillallah: { ar: 'لا إله إلا الله', en: 'La ilaha illallah' },
    astaghfirullah: { ar: 'أستغفر الله', en: 'Astaghfirullah' },

    // PWA
    pwa_install_title: { ar: 'تثبيت التطبيق', en: 'Install App' },
    pwa_install_message: { ar: 'ثبّت التطبيق على جهازك للوصول السريع', en: 'Install the app for quick access' },
    install: { ar: 'تثبيت', en: 'Install' },

    // Adhan
    adhan: { ar: 'الأذان', en: 'Adhan' },
    test_adhan: { ar: 'تجربة الأذان', en: 'Test Adhan' },
    stop_adhan: { ar: 'إيقاف الأذان', en: 'Stop Adhan' },

    // Sunnah
    sunnah_prayers: { ar: 'السنن الرواتب', en: 'Sunnah Prayers' },
    duha_prayer: { ar: 'صلاة الضحى', en: 'Duha Prayer' },
    qiyam_prayer: { ar: 'صلاة القيام', en: 'Qiyam Prayer' },

    // Countdown Timer
    next_prayer: { ar: 'الصلاة القادمة', en: 'Next Prayer' },
    time_remaining: { ar: 'الوقت المتبقي', en: 'Time Remaining' },
    hours: { ar: 'ساعة', en: 'Hours' },
    minutes: { ar: 'دقيقة', en: 'Minutes' },
    seconds: { ar: 'ثانية', en: 'Seconds' },

    // Adhan Toggle
    adhan_enabled: { ar: 'تم تفعيل الأذان', en: 'Adhan Enabled' },
    adhan_disabled: { ar: 'تم إيقاف الأذان', en: 'Adhan Disabled' },
    toggle_adhan: { ar: 'تفعيل/إيقاف الأذان', en: 'Toggle Adhan' },

    // Quran Audio
    play_full_surah: { ar: 'تشغيل السورة كاملة', en: 'Play Full Surah' },
    stop_surah: { ar: 'إيقاف السورة', en: 'Stop Surah' },
    play_verse: { ar: 'تشغيل الآية', en: 'Play Verse' },
    verse: { ar: 'الآية', en: 'Verse' },

    // Bookmarks
    saved_places: { ar: 'الأماكن المحفوظة', en: 'Saved Places' },
    save_position: { ar: 'حفظ الموضع', en: 'Save Position' },
    bookmark_saved: { ar: 'تم حفظ الموضع', en: 'Bookmark Saved' },
    bookmark_deleted: { ar: 'تم حذف الموضع', en: 'Bookmark Deleted' },
    delete: { ar: 'حذف', en: 'Delete' },
};

class LocalizationService {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'ar';
        this.listeners = [];
    }

    get isArabic() {
        return this.currentLang === 'ar';
    }

    get isEnglish() {
        return this.currentLang === 'en';
    }

    get direction() {
        return this.isArabic ? 'rtl' : 'ltr';
    }

    tr(key) {
        const translation = translations[key];
        if (!translation) return key;
        return translation[this.currentLang] || translation.en || key;
    }

    setLanguage(lang) {
        if (lang !== 'ar' && lang !== 'en') return;
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.dir = this.direction;
        document.documentElement.lang = lang;
        this.notifyListeners();
        this.updatePageContent();
    }

    toggleLanguage() {
        this.setLanguage(this.isArabic ? 'en' : 'ar');
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback(this.currentLang));
    }

    init() {
        document.documentElement.dir = this.direction;
        document.documentElement.lang = this.currentLang;
        this.updatePageContent();
    }

    updatePageContent() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.tr(key);
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.tr(key);
        });

        // Update titles
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            el.title = this.tr(key);
        });

        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            btn.classList.toggle('active', lang === this.currentLang);
        });
    }
}

// Export singleton
const localization = new LocalizationService();
