/**
 * MKS Muslim - Notifications Service
 * Handles Web Notifications API and Adhan sound
 */

class NotificationService {
    constructor() {
        this.permission = 'default';
        this.adhanAudio = null;
        this.isPlaying = false;
    }

    async init() {
        if ('Notification' in window) {
            this.permission = Notification.permission;
        }
        
        // Preload adhan audio
        this.adhanAudio = new Audio('assets/audio/audio_merger_الاذن_مع_الدعاء.mp3');
        this.adhanAudio.preload = 'auto';
    }

    async requestPermission() {
        if (!('Notification' in window)) {
            console.warn('This browser does not support notifications');
            return false;
        }

        if (Notification.permission === 'granted') {
            this.permission = 'granted';
            return true;
        }

        if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            this.permission = permission;
            return permission === 'granted';
        }

        return false;
    }

    showNotification(title, options = {}) {
        if (this.permission !== 'granted') {
            console.warn('Notification permission not granted');
            return null;
        }

        const defaultOptions = {
            icon: 'assets/images/icon.png',
            badge: 'assets/images/icon.png',
            vibrate: [200, 100, 200],
            tag: 'mks-muslim',
            requireInteraction: false,
            silent: false,
            ...options
        };

        try {
            const notification = new Notification(title, defaultOptions);
            
            notification.onclick = () => {
                window.focus();
                notification.close();
            };

            return notification;
        } catch (e) {
            console.error('Error showing notification:', e);
            return null;
        }
    }

    showPrayerNotification(prayerName, prayerTime) {
        const isArabic = localization?.isArabic ?? true;
        const title = isArabic ? 'حان وقت الصلاة' : 'Prayer Time';
        const body = isArabic 
            ? `حان الآن موعد صلاة ${prayerName}`
            : `It's time for ${prayerName} prayer`;

        return this.showNotification(title, {
            body,
            tag: `prayer-${prayerName}`,
            requireInteraction: true
        });
    }

    showTaskReminder(taskName, taskTime) {
        const isArabic = localization?.isArabic ?? true;
        const title = isArabic ? 'تذكير بالمهمة' : 'Task Reminder';
        
        return this.showNotification(title, {
            body: taskName,
            tag: `task-${Date.now()}`,
            requireInteraction: false
        });
    }

    // Adhan sound playback
    async playAdhan() {
        if (this.isPlaying) {
            this.stopAdhan();
            return;
        }

        try {
            if (!this.adhanAudio) {
                this.adhanAudio = new Audio('assets/audio/audio_merger_الاذن_مع_الدعاء.mp3');
            }

            this.adhanAudio.currentTime = 0;
            await this.adhanAudio.play();
            this.isPlaying = true;

            this.adhanAudio.onended = () => {
                this.isPlaying = false;
            };
        } catch (e) {
            console.error('Error playing adhan:', e);
            this.isPlaying = false;
        }
    }

    stopAdhan() {
        if (this.adhanAudio) {
            this.adhanAudio.pause();
            this.adhanAudio.currentTime = 0;
            this.isPlaying = false;
        }
    }

    testAdhan() {
        this.playAdhan();
        
        // Show notification too
        const isArabic = localization?.isArabic ?? true;
        this.showNotification(
            isArabic ? 'تجربة الأذان' : 'Adhan Test',
            { body: isArabic ? 'هذه تجربة لصوت الأذان' : 'This is a test of the Adhan sound' }
        );
    }

    // Schedule notifications (using setInterval for demo, real implementation would use Service Worker)
    schedulePrayerNotifications(timings) {
        // This is a simplified version - real implementation would use Service Worker
        // For demo purposes, we'll just store the times and check periodically
        
        if (!timings) return;

        // Store prayer times for checking
        localStorage.setItem('mks_prayer_times', JSON.stringify({
            timings,
            date: new Date().toDateString()
        }));
    }

    // Check if it's time for any prayer (call this periodically)
    checkPrayerTime() {
        const stored = localStorage.getItem('mks_prayer_times');
        if (!stored) return;

        const { timings, date } = JSON.parse(stored);
        
        // Check if it's still the same day
        if (date !== new Date().toDateString()) {
            localStorage.removeItem('mks_prayer_times');
            return;
        }

        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        
        for (const prayer of prayerNames) {
            const prayerTime = timings[prayer]?.split(' ')[0];
            if (prayerTime === currentTime) {
                const notifiedKey = `mks_notified_${prayer}_${date}`;
                if (!localStorage.getItem(notifiedKey)) {
                    this.showPrayerNotification(prayer, prayerTime);
                    
                    // Check if adhan should play
                    const playAdhan = localStorage.getItem(`mks_adhan_${prayer}`) === 'true';
                    if (playAdhan) {
                        this.playAdhan();
                    }
                    
                    localStorage.setItem(notifiedKey, 'true');
                }
            }
        }
    }

    // Start periodic checking (every minute)
    startPrayerTimeCheck() {
        // Check immediately
        this.checkPrayerTime();
        
        // Then check every minute
        setInterval(() => {
            this.checkPrayerTime();
        }, 60000);
    }
}

// Export singleton
const notifications = new NotificationService();
