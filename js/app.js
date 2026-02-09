/**
 * MKS Muslim - Main Application
 * Core app logic, initialization, and event handlers
 */

class MKSMuslimApp {
    constructor() {
        this.isInitialized = false;
        this.sidebar = null;
        this.overlay = null;
        this.deferredPrompt = null;
    }

    async init() {
        if (this.isInitialized) return;

        // Initialize services
        localization.init();
        await notifications.init();
        
        // Load theme
        this.loadTheme();
        
        // Setup DOM elements
        this.sidebar = document.getElementById('sidebar');
        this.overlay = document.getElementById('sidebar-overlay');
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Setup PWA
        this.setupPWA();
        
        // Setup Security
        this.setupSecurity();
        
        // Start prayer time checks if notifications enabled
        if (storage.notificationsEnabled) {
            notifications.startPrayerTimeCheck();
        }

        if (window.innerWidth >= 768) {
            this.sidebar.style.transform = ''; // Clear inline styles
            this.sidebar.classList.remove('open'); // Let CSS handle desktop state
        }

        this.isInitialized = true;
        console.log('MKS Muslim App initialized');
    }

    // Theme Management
    loadTheme() {
        const theme = storage.theme;
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeIcon(theme);
    }

    toggleTheme() {
        const currentTheme = storage.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        storage.theme = newTheme;
        document.documentElement.setAttribute('data-theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const themeIcons = document.querySelectorAll('.theme-icon');
        themeIcons.forEach(icon => {
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        });
    }

    // Sidebar Management
    openSidebar() {
        if (this.sidebar) {
            this.sidebar.classList.add('open');
        }
        if (this.overlay) {
            this.overlay.classList.add('visible');
        }
        document.body.style.overflow = 'hidden';
    }

    closeSidebar() {
        if (this.sidebar) {
            this.sidebar.classList.remove('open');
        }
        if (this.overlay) {
            this.overlay.classList.remove('visible');
        }
        document.body.style.overflow = '';
    }

    toggleSidebar() {
        console.log('Toggle Sidebar called');
        if (!this.sidebar || !this.overlay) {
            console.error('Sidebar elements not found');
            this.sidebar = document.getElementById('sidebar');
            this.overlay = document.getElementById('sidebar-overlay');
            if (!this.sidebar || !this.overlay) return;
        }

        if (this.sidebar.classList.contains('open')) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    // Language
    setLanguage(lang) {
        localization.setLanguage(lang);
        storage.language = lang;
    }

    toggleLanguage() {
        localization.toggleLanguage();
        storage.language = localization.currentLang;
    }

    // Event Listeners
    setupEventListeners() {
        // Hamburger button
        // Hamburger button
        const hamburgerBtn = document.querySelector('.hamburger-btn');
        if (hamburgerBtn) {
            // Remove any existing inline onclick to prevent double firing if possible, 
            // though usually they coexist. We'll just listen.
            hamburgerBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleSidebar();
            };
        }

        // Also query all in case there are multiple
        document.querySelectorAll('.hamburger-btn').forEach(btn => {
            if (btn !== hamburgerBtn) { // Avoid duplicate
                btn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleSidebar();
                };
            }
        });

        // Sidebar overlay
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.closeSidebar());
        }

        // Theme toggle buttons handled by onclick attribute
        // document.querySelectorAll('.theme-toggle, .theme-btn').forEach(btn => {
        //     btn.addEventListener('click', () => this.toggleTheme());
        // });

        // Language toggle buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                if (lang) {
                    this.setLanguage(lang);
                }
            });
        });

        // Close sidebar on nav item click (mobile)
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    this.closeSidebar();
                }
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                this.closeSidebar();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSidebar();
            }
        });
    }

    // PWA Installation
    setupPWA() {
        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallBanner();
        });

        // Listen for successful installation
        window.addEventListener('appinstalled', () => {
            console.log('PWA installed successfully');
            this.hideInstallBanner();
            this.deferredPrompt = null;
        });
    }

    showInstallBanner() {
        const banner = document.getElementById('install-banner');
        if (banner) {
            banner.classList.add('show');
        }
    }

    hideInstallBanner() {
        const banner = document.getElementById('install-banner');
        if (banner) {
            banner.classList.remove('show');
        }
    }

    async installPWA() {
        if (!this.deferredPrompt) {
            console.warn('Install prompt not available');
            return;
        }

        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        
        console.log(`User ${outcome === 'accepted' ? 'accepted' : 'dismissed'} the install prompt`);
        
        this.hideInstallBanner();
        this.deferredPrompt = null;
    }

    // Toast notifications
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        if (!toast) {
            // Create toast if it doesn't exist
            const toastEl = document.createElement('div');
            toastEl.id = 'toast';
            toastEl.className = 'toast';
            document.body.appendChild(toastEl);
        }

        const toastEl = document.getElementById('toast');
        toastEl.textContent = message;
        toastEl.className = `toast ${type} show`;

        setTimeout(() => {
            toastEl.classList.remove('show');
        }, 3000);
    }

    // Utility: Format time for display
    formatTime(timeString) {
        if (!timeString) return '--:--';
        
        // Remove timezone info if present
        const cleanTime = timeString.split(' ')[0];
        
        // Parse and format
        const [hours, minutes] = cleanTime.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        
        return `${hour12}:${minutes} ${ampm}`;
    }

    // Utility: Get current prayer
    getCurrentPrayer(timings) {
        if (!timings) return null;

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        let currentPrayer = null;

        for (let i = prayers.length - 1; i >= 0; i--) {
            const prayerTime = timings[prayers[i]]?.split(' ')[0];
            if (!prayerTime) continue;

            const [hours, minutes] = prayerTime.split(':').map(Number);
            const prayerMinutes = hours * 60 + minutes;

            if (currentMinutes >= prayerMinutes) {
                currentPrayer = prayers[i];
                break;
            }
        }

        return currentPrayer || 'Isha'; // Default to Isha if before Fajr
    }

    // Utility: Time until next prayer
    getTimeUntilNextPrayer(timings) {
        if (!timings) return null;

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

        for (const prayer of prayers) {
            const prayerTime = timings[prayer]?.split(' ')[0];
            if (!prayerTime) continue;

            const [hours, minutes] = prayerTime.split(':').map(Number);
            const prayerMinutes = hours * 60 + minutes;

            if (prayerMinutes > currentMinutes) {
                const diff = prayerMinutes - currentMinutes;
                const h = Math.floor(diff / 60);
                const m = diff % 60;
                return { prayer, hours: h, minutes: m };
            }
        }

        // Next prayer is tomorrow's Fajr
        const fajrTime = timings.Fajr?.split(' ')[0];
        if (fajrTime) {
            const [hours, minutes] = fajrTime.split(':').map(Number);
            const fajrMinutes = hours * 60 + minutes;
            const diff = (24 * 60 - currentMinutes) + fajrMinutes;
            const h = Math.floor(diff / 60);
            const m = diff % 60;
            return { prayer: 'Fajr', hours: h, minutes: m };
        }

        return null;
    }
    // Security: Prevent context menu and inspection shortcuts
    setupSecurity() {
        // Disable Right Click
        document.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            return false;
        });

        // Disable specific key combinations (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
        document.addEventListener('keydown', (event) => {
            if (
                event.key === 'F12' ||
                (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'i')) ||
                (event.ctrlKey && event.shiftKey && (event.key === 'J' || event.key === 'j')) ||
                (event.ctrlKey && (event.key === 'U' || event.key === 'u'))
            ) {
                event.preventDefault();
                return false;
            }
        });
    }
}

// Create and export app instance
const app = new MKSMuslimApp();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

// Global functions for onclick handlers
function toggleSidebar() { app.toggleSidebar(); }
function openSidebar() { app.openSidebar(); }
function closeSidebar() { app.closeSidebar(); }
function toggleTheme() { app.toggleTheme(); }
function toggleLanguage() { app.toggleLanguage(); }
function setLanguage(lang) { app.setLanguage(lang); }
function installPWA() { app.installPWA(); }
function hideInstallBanner() { app.hideInstallBanner(); }
function playAdhan() { notifications.playAdhan(); }
function stopAdhan() { notifications.stopAdhan(); }
function testAdhan() { notifications.testAdhan(); }
