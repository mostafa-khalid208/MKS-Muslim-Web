/**
 * MKS Muslim - Storage Service
 * Handles localStorage operations for settings and data persistence
 */

class StorageService {
    constructor() {
        this.prefix = 'mks_';
    }

    // Settings
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            if (item === null) return defaultValue;
            return JSON.parse(item);
        } catch (e) {
            return defaultValue;
        }
    }

    set(key, value) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    }

    remove(key) {
        localStorage.removeItem(this.prefix + key);
    }

    // Convenience getters/setters
    get theme() {
        return this.get('theme', 'light');
    }

    set theme(value) {
        this.set('theme', value);
    }

    get language() {
        return this.get('language', 'ar');
    }

    set language(value) {
        this.set('language', value);
    }

    get lastCity() {
        return this.get('lastCity', 'Tanta');
    }

    set lastCity(value) {
        this.set('lastCity', value);
    }

    get lastCountry() {
        return this.get('lastCountry', 'Egypt');
    }

    set lastCountry(value) {
        this.set('lastCountry', value);
    }

    get notificationsEnabled() {
        return this.get('notificationsEnabled', false);
    }

    set notificationsEnabled(value) {
        this.set('notificationsEnabled', value);
    }

    get prayerRemindersEnabled() {
        return this.get('prayerRemindersEnabled', true);
    }

    set prayerRemindersEnabled(value) {
        this.set('prayerRemindersEnabled', value);
    }

    get tasbihCount() {
        return this.get('tasbihCount', 0);
    }

    set tasbihCount(value) {
        this.set('tasbihCount', value);
    }

    get lastReadSurah() {
        return this.get('lastReadSurah', null);
    }

    set lastReadSurah(value) {
        this.set('lastReadSurah', value);
    }

    get lastReadVerse() {
        return this.get('lastReadVerse', null);
    }

    set lastReadVerse(value) {
        this.set('lastReadVerse', value);
    }

    // Tasks
    get tasks() {
        return this.get('tasks', []);
    }

    set tasks(value) {
        this.set('tasks', value);
    }

    addTask(task) {
        const tasks = this.tasks;
        task.id = Date.now();
        task.createdAt = new Date().toISOString();
        task.completed = false;
        tasks.push(task);
        this.tasks = tasks;
        return task;
    }

    updateTask(id, updates) {
        const tasks = this.tasks;
        const index = tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...updates };
            this.tasks = tasks;
            return tasks[index];
        }
        return null;
    }

    deleteTask(id) {
        const tasks = this.tasks;
        this.tasks = tasks.filter(t => t.id !== id);
    }

    toggleTaskComplete(id) {
        const tasks = this.tasks;
        const index = tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            tasks[index].completed = !tasks[index].completed;
            this.tasks = tasks;
            return tasks[index];
        }
        return null;
    }

    // Quran Bookmarks
    get quranBookmarks() {
        return this.get('quranBookmarks', []);
    }

    set quranBookmarks(value) {
        this.set('quranBookmarks', value);
    }

    addQuranBookmark(bookmark) {
        const bookmarks = this.quranBookmarks;
        bookmark.id = Date.now();
        bookmark.createdAt = new Date().toISOString();
        bookmarks.push(bookmark);
        this.quranBookmarks = bookmarks;
        return bookmark;
    }

    deleteQuranBookmark(id) {
        const bookmarks = this.quranBookmarks;
        this.quranBookmarks = bookmarks.filter(b => b.id !== id);
    }

    // Hadith Favorites
    get hadithFavorites() {
        return this.get('hadithFavorites', []);
    }

    set hadithFavorites(value) {
        this.set('hadithFavorites', value);
    }

    addHadithFavorite(hadith) {
        const favorites = this.hadithFavorites;
        hadith.savedAt = new Date().toISOString();
        favorites.push(hadith);
        this.hadithFavorites = favorites;
        return hadith;
    }

    removeHadithFavorite(collection, number) {
        const favorites = this.hadithFavorites;
        this.hadithFavorites = favorites.filter(h => 
            !(h.collection === collection && h.number === number)
        );
    }

    isHadithFavorite(collection, number) {
        return this.hadithFavorites.some(h => 
            h.collection === collection && h.number === number
        );
    }

    // Clear all data
    clearAll() {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(this.prefix)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
    }
}

// Export singleton
const storage = new StorageService();
