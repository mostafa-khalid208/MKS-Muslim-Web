/**
 * MKS Muslim - API Service
 * Handles all API calls to Aladhan and other services
 */

const API_BASE_URL = 'https://api.aladhan.com/v1';

class ApiService {
    constructor() {
        this.cache = new Map();
        this.cacheExpiry = 12 * 60 * 60 * 1000; // 12 hours
    }

    /**
     * Get prayer timings by city and country
     */
    async getPrayerTimings(city, country, date = null) {
        if (!date) {
            const now = new Date();
            date = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
        }

        const cacheKey = `prayer_${city}_${country}_${date}`;
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        try {
            const url = `${API_BASE_URL}/timingsByCity/${date}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.code !== 200 || !data.data) {
                throw new Error('Invalid response from API');
            }

            this.saveToCache(cacheKey, data.data);
            return data.data;
        } catch (error) {
            console.error('Error fetching prayer timings:', error);
            
            // Try to get from localStorage as fallback
            const fallback = this.getFromLocalStorage(cacheKey);
            if (fallback) return fallback;
            
            throw error;
        }
    }

    /**
     * Get prayer timings by coordinates
     */
    async getPrayerTimingsByCoords(latitude, longitude, date = null) {
        if (!date) {
            const now = new Date();
            date = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
        }

        const cacheKey = `prayer_coords_${latitude}_${longitude}_${date}`;
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        try {
            const url = `${API_BASE_URL}/timings/${date}?latitude=${latitude}&longitude=${longitude}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.code !== 200 || !data.data) {
                throw new Error('Invalid response from API');
            }

            this.saveToCache(cacheKey, data.data);
            return data.data;
        } catch (error) {
            console.error('Error fetching prayer timings by coords:', error);
            throw error;
        }
    }

    /**
     * Get Quran surahs list
     */
    async getQuranSurahs() {
        const cacheKey = 'quran_surahs';
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        try {
            const response = await fetch('https://api.alquran.cloud/v1/surah');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.code !== 200 || !data.data) {
                throw new Error('Invalid response from Quran API');
            }

            this.saveToCache(cacheKey, data.data);
            return data.data;
        } catch (error) {
            console.error('Error fetching Quran surahs:', error);
            throw error;
        }
    }

    /**
     * Get specific Surah with Arabic text
     */
    /**
     * Get specific Surah with Arabic text and Audio
     */
    async getSurah(surahNumber) {
        const cacheKey = `surah_${surahNumber}_audio`;
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        try {
            // Fetch both Uthmani text and Alafasy audio
            const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,ar.alafasy`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.code !== 200 || !data.data || data.data.length < 2) {
                throw new Error('Invalid response from Quran API');
            }

            // data.data[0] is typically the first requested edition (quran-uthmani)
            // data.data[1] is the second (ar.alafasy)
            // We need to merge them safely.
            const textEdition = data.data.find(e => e.identifier === 'quran-uthmani') || data.data[0];
            const audioEdition = data.data.find(e => e.identifier === 'ar.alafasy') || data.data[1];

            const mergedSurah = {
                ...textEdition,
                ayahs: textEdition.ayahs.map((ayah, index) => ({
                    ...ayah,
                    audio: audioEdition.ayahs[index] ? audioEdition.ayahs[index].audio : null,
                    audioSecondary: audioEdition.ayahs[index] ? audioEdition.ayahs[index].audioSecondary : null
                }))
            };

            this.saveToCache(cacheKey, mergedSurah);
            return mergedSurah;
        } catch (error) {
            console.error('Error fetching Surah:', error);
            throw error;
        }
    }

    /**
     * Get Hadith from sunnah.com API
     */
    /**
     * Get Hadith from hadith.gading.dev API (Same as Flutter App)
     */
    async getHadith(collection, hadithNumber) {
        const cacheKey = `hadith_${collection}_${hadithNumber}`;
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        try {
            // Using hadith.gading.dev matching Flutter app
            // range=X-Y logic is complex for individual numbering, but we can try to fetch a range containing the number
            // or use the specific endpoint if available. 
            // The Flutter app uses ranges. To simplify for web, we'll try to fetch the specific hadith if possible,
            // or fetch a range. 
            // However, the requested API `api.hadith.gading.dev` structure is: /books/{book}/{number}
            
            const response = await fetch(`https://api.hadith.gading.dev/books/${collection}/${hadithNumber}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
             // API structure: { code: 200, message: "...", data: { name: "...", id: "...", available: 100, contents: { number: 1, arab: "...", id: "..." } } }
             // Adapt response to match our display logic
             const formattedData = {
                 text: data.data.contents.arab,
                 hadiths: [{ text: data.data.contents.arab }]
             };

            this.saveToCache(cacheKey, formattedData);
            return formattedData;
        } catch (error) {
            console.error('Error fetching hadith:', error);
            throw error;
        }
    }

    /**
     * Get Islamic Culture Content (Same as Flutter App)
     */
    async getIslamicContent() {
        const cacheKey = 'islamic_culture_content';
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        try {
            const response = await fetch('https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/get-category-items/5366/showall/ar/ar/1/20/json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Data structure: { data: [ { title: "...", description: "...", attachments: [ { url: "...", type: "pdf" } ] } ] }
            
            this.saveToCache(cacheKey, data.data);
            return data.data;
        } catch (error) {
            console.error('Error fetching Islamic content:', error);
            throw error;
        }
    }

    /**
     * Get random hadith
     */
    async getRandomHadith(collection = 'bukhari') {
        const randomNumber = Math.floor(Math.random() * 7000) + 1;
        return await this.getHadith(collection, randomNumber);
    }

    /**
     * Calculate Qibla direction
     */
    calculateQiblaDirection(latitude, longitude) {
        // Kaaba coordinates
        const kaabaLat = 21.4225;
        const kaabaLng = 39.8262;

        const lat1 = this.toRadians(latitude);
        const lat2 = this.toRadians(kaabaLat);
        const deltaLng = this.toRadians(kaabaLng - longitude);

        const y = Math.sin(deltaLng);
        const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(deltaLng);
        
        let qiblaDirection = Math.atan2(y, x);
        qiblaDirection = this.toDegrees(qiblaDirection);
        
        // Normalize to 0-360
        qiblaDirection = (qiblaDirection + 360) % 360;
        
        return qiblaDirection;
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    toDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    // Cache methods
    getFromCache(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        
        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }
        
        return item.data;
    }

    saveToCache(key, data) {
        this.cache.set(key, {
            data,
            expiry: Date.now() + this.cacheExpiry
        });
        
        // Also save to localStorage for offline access
        this.saveToLocalStorage(key, data);
    }

    saveToLocalStorage(key, data) {
        try {
            const item = {
                data,
                expiry: Date.now() + this.cacheExpiry
            };
            localStorage.setItem(`mks_cache_${key}`, JSON.stringify(item));
        } catch (e) {
            console.warn('Could not save to localStorage:', e);
        }
    }

    getFromLocalStorage(key) {
        try {
            const item = localStorage.getItem(`mks_cache_${key}`);
            if (!item) return null;
            
            const parsed = JSON.parse(item);
            if (Date.now() > parsed.expiry) {
                localStorage.removeItem(`mks_cache_${key}`);
                return null;
            }
            
            return parsed.data;
        } catch (e) {
            return null;
        }
    }

    clearCache() {
        this.cache.clear();
        
        // Clear localStorage cache
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('mks_cache_')) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
    }
}

// Export singleton
const api = new ApiService();
