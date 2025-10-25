// src/services/weather.js

// Базовий URL усіх endpoint'ів OpenWeather
const API_BASE = 'https://api.openweathermap.org/data/2.5'

// Функція отримує погоду за містом.
// city — назва міста; units='metric' — градуси Цельсія; lang — мова опису.
export async function fetchCurrentWeather(city, units = 'metric', lang = 'en') {
    // Дістаємо ключ з .env, Vite надає доступ через import.meta.env
    const key = import.meta.env.VITE_OPENWEATHER_KEY

    // Якщо ключу немає — кидаємо помилку одразу (допомагає дебажити)
    if (!key) throw new Error('Missing OpenWeather API key. Set VITE_OPENWEATHER_KEY in .env')

    // Формуємо URL. encodeURIComponent — щоб пробіли/символи в назві міста не ламали запит
    const url = `${API_BASE}/weather?q=${encodeURIComponent(city)}&units=${units}&lang=${lang}&appid=${key}`

    // Відправляємо HTTP-запит
    const res = await fetch(url)

    // Якщо статус не 2xx — кидаємо помилку з кодом (наприклад, 404, 401)
    if (!res.ok) {
        // Пробуємо витягнути повідомлення помилки з JSON (якщо є)
        let reason = ''
        try {
            const err = await res.json()
            reason = err?.message ? `: ${err.message}` : ''
        } catch (_) {}
        throw new Error(`OpenWeather error ${res.status}${reason}`)
    }

    // Повертаємо розпарсений JSON з даними погоди
    return res.json()
}
