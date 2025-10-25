<template>
    <div class="w-full max-w-4xl mx-auto space-y-6">
        <!-- Header + Search -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 class="text-2xl font-bold text-gray-900">Weather Dashboard</h1>
                <form @submit.prevent="searchCity" class="flex items-center w-full md:w-auto gap-3">
                    <input
                        v-model="city"
                        placeholder="Enter the city..."
                        class="w-full md:w-64 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        class="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2 transition-colors"
                    >
                        Search
                    </button>
                </form>
            </div>
        </div>
        <!-- Loading State -->
        <div v-if="loading" class="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div class="animate-pulse">
                <div class="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4"></div>
                <div class="h-4 bg-blue-200 rounded w-32 mx-auto mb-2"></div>
                <div class="h-4 bg-blue-200 rounded w-24 mx-auto"></div>
            </div>
            <p class="text-blue-600 font-medium mt-4">Loading…</p>
        </div>

        <!-- Error State -->
        <div
            v-else-if="error"
            class="bg-red-50 border border-red-200 rounded-2xl shadow-lg p-8 text-center"
        >
            <div
                class="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center"
            >
                <svg
                    class="w-8 h-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                </svg>
            </div>
            <h3 class="text-red-800 font-semibold mb-2">Error</h3>
            <p class="text-red-600">{{ error }}</p>
        </div>

        <!-- Weather Data -->
        <div v-else-if="weatherData" class="space-y-6">
            <!-- Main Weather Card -->
            <div
                class="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden"
            >
                <!-- Background Pattern -->
                <div class="absolute inset-0 opacity-10">
                    <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path
                                    d="M 10 0 L 0 0 0 10"
                                    fill="none"
                                    stroke="white"
                                    stroke-width="0.5"
                                />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div class="relative z-10">
                    <div class="flex items-start justify-between mb-6">
                        <div>
                            <h2 class="text-3xl font-bold mb-2">{{ weatherData.name }}</h2>
                            <p class="text-blue-100 capitalize text-lg" v-if="weatherData.weather">
                                {{ weatherData.weather[0].description }}
                            </p>
                        </div>
                        <div class="text-right">
                            <div class="text-5xl font-light">
                                {{ Math.round(weatherData.main.temp) }}°
                            </div>
                            <div class="text-blue-100 text-sm">
                                Feels like {{ Math.round(weatherData.main.feels_like) }}°
                            </div>
                        </div>
                    </div>

                    <!-- Weather Details -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                            <div class="text-blue-100 text-sm mb-1">Humidity</div>
                            <div class="text-xl font-semibold">
                                {{ weatherData.main.humidity }}%
                            </div>
                        </div>
                        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                            <div class="text-blue-100 text-sm mb-1">Pressure</div>
                            <div class="text-xl font-semibold">
                                {{ weatherData.main.pressure }} hPa
                            </div>
                        </div>
                        <div
                            class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                            v-if="weatherData.wind"
                        >
                            <div class="text-blue-100 text-sm mb-1">Wind</div>
                            <div class="text-xl font-semibold">
                                {{ Math.round(weatherData.wind.speed) }} m/s
                            </div>
                        </div>
                        <div
                            class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                            v-if="weatherData.visibility"
                        >
                            <div class="text-blue-100 text-sm mb-1">Visibility</div>
                            <div class="text-xl font-semibold">
                                {{ Math.round(weatherData.visibility / 1000) }} km
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Forecast Section -->
            <div v-if="forecastData" class="bg-white rounded-2xl shadow-lg p-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <svg
                        class="w-6 h-6 mr-2 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    5-day forecast
                </h3>

                <div class="grid gap-3 overflow-x-auto">
                    <div
                        v-for="(forecast, index) in getDailyForecast(forecastData.list)"
                        :key="forecast.dt"
                        class="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer"
                        :class="{ 'bg-blue-50/30': index === 0 }"
                        @click="selectDay(forecast)"
                    >
                        <div class="flex items-center space-x-4">
                            <div class="text-sm font-medium text-gray-600 min-w-[80px]">
                                {{ formatDate(forecast.dt_txt) }}
                            </div>
                            <div class="flex items-center space-x-2">
                                <div
                                    class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                                >
                                    {{ getWeatherEmoji(forecast.weather[0].main) }}
                                </div>
                                <div class="text-sm text-gray-600 capitalize min-w-[120px]">
                                    {{ forecast.weather[0].description }}
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div class="text-right">
                                <div class="font-semibold text-gray-800">
                                    {{ Math.round(forecast.main.temp_max) }}°
                                </div>
                                <div class="text-sm text-gray-500">
                                    {{ Math.round(forecast.main.temp_min) }}°
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Detailed Day Modal -->
            <div
                v-if="showDetailModal && selectedDay"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
                @click="closeModal"
            >
                <div
                    class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                    @click.stop
                >
                    <div
                        class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl"
                    >
                        <div class="flex items-center justify-between">
                            <h2 class="text-2xl font-bold text-gray-800">
                                {{ formatDate(selectedDay.dt_txt) }}
                            </h2>
                            <button
                                @click="closeModal"
                                class="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                            >
                                <svg
                                    class="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="p-6 space-y-6">
                        <!-- Temperature Chart -->
                        <div class="bg-gray-50 rounded-xl p-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4">
                                Temperature chart
                            </h3>
                            <div class="h-64">
                                <Line v-if="chartData" :data="chartData" :options="chartOptions" />
                            </div>
                        </div>

                        <!-- Hourly Forecast -->
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-4">
                                Hourly forecast
                            </h3>
                            <div class="grid gap-3">
                                <div
                                    v-for="hourly in selectedDayHourlyData"
                                    :key="hourly.dt"
                                    class="bg-gray-50 rounded-xl p-4"
                                >
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center space-x-4">
                                            <div
                                                class="text-lg font-semibold text-gray-700 min-w-[80px]"
                                            >
                                                {{
                                                    new Date(hourly.dt_txt).toLocaleTimeString(
                                                        'en-US',
                                                        {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        },
                                                    )
                                                }}
                                            </div>
                                            <div class="flex items-center space-x-3">
                                                <div
                                                    class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl"
                                                >
                                                    {{ getWeatherEmoji(hourly.weather[0].main) }}
                                                </div>
                                                <div>
                                                    <div
                                                        class="font-medium text-gray-800 capitalize"
                                                    >
                                                        {{ hourly.weather[0].description }}
                                                    </div>
                                                    <div class="text-sm text-gray-500">
                                                        Humidity: {{ hourly.main.humidity }}%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex items-center space-x-6">
                                            <div class="text-right">
                                                <div class="text-2xl font-bold text-gray-800">
                                                    {{ Math.round(hourly.main.temp) }}°
                                                </div>
                                                <div class="text-sm text-gray-500">
                                                    feels like
                                                    {{ Math.round(hourly.main.feels_like) }}°
                                                </div>
                                            </div>
                                            <div class="grid grid-cols-2 gap-4 text-center">
                                                <div
                                                    v-if="hourly.wind"
                                                    class="bg-white rounded-lg p-2 min-w-[60px]"
                                                >
                                                    <div class="text-xs text-gray-500 mb-1">
                                                        Wind
                                                    </div>
                                                    <div class="text-sm font-semibold">
                                                        {{ Math.round(hourly.wind.speed) }} m/s
                                                    </div>
                                                </div>
                                                <div class="bg-white rounded-lg p-2 min-w-[60px]">
                                                    <div class="text-xs text-gray-500 mb-1">
                                                        Pressure
                                                    </div>
                                                    <div class="text-sm font-semibold">
                                                        {{ hourly.main.pressure }}
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="hourly.pop"
                                                    class="bg-white rounded-lg p-2 min-w-[60px]"
                                                >
                                                    <div class="text-xs text-gray-500 mb-1">
                                                        Rain
                                                    </div>
                                                    <div class="text-sm font-semibold">
                                                        {{ Math.round(hourly.pop * 100) }}%
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="hourly.visibility"
                                                    class="bg-white rounded-lg p-2 min-w-[60px]"
                                                >
                                                    <div class="text-xs text-gray-500 mb-1">
                                                        Visibility
                                                    </div>
                                                    <div class="text-sm font-semibold">
                                                        {{ Math.round(hourly.visibility / 1000) }}km
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Initial Preloader / Empty State -->
        <div v-else class="bg-white rounded-2xl shadow-lg p-10 text-center">
            <div class="animate-pulse">
                <div class="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-6"></div>
                <div class="h-4 bg-blue-100 rounded w-48 mx-auto mb-3"></div>
                <div class="h-4 bg-blue-100 rounded w-32 mx-auto"></div>
            </div>
            <p class="text-gray-500 mt-6">Enter a city above to see the weather</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
)

const cityData = ref(null)
const weatherData = ref(null)
const forecastData = ref(null)
const loading = ref(false)
const error = ref(null)
const selectedDay = ref(null)
const showDetailModal = ref(false)
const city = ref('')

const apiKey = import.meta.env.VITE_OPENWEATHER_KEY

// Computed properties for selected day details
const selectedDayHourlyData = computed(() => {
    if (!selectedDay.value || !forecastData.value) return []

    const selectedDate = new Date(selectedDay.value.dt_txt).toDateString()
    return forecastData.value.list.filter(
        (forecast) => new Date(forecast.dt_txt).toDateString() === selectedDate,
    )
})

const chartData = computed(() => {
    if (!selectedDayHourlyData.value.length) return null

    const hours = selectedDayHourlyData.value.map((item) =>
        new Date(item.dt_txt).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        }),
    )

    const temps = selectedDayHourlyData.value.map((item) => Math.round(item.main.temp))
    const feelsLike = selectedDayHourlyData.value.map((item) => Math.round(item.main.feels_like))

    return {
        labels: hours,
        datasets: [
            {
                label: 'Temperature',
                data: temps,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: 'white',
                pointBorderWidth: 2,
                pointRadius: 4,
            },
            {
                label: 'Feels like',
                data: feelsLike,
                borderColor: 'rgb(168, 85, 247)',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                fill: false,
                tension: 0.4,
                borderWidth: 2,
                borderDash: [5, 5],
                pointBackgroundColor: 'rgb(168, 85, 247)',
                pointBorderColor: 'white',
                pointBorderWidth: 2,
                pointRadius: 3,
            },
        ],
    }
})

const chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    return `${context.dataset.label}: ${context.parsed.y}°C`
                },
            },
        },
    },
    scales: {
        y: {
            beginAtZero: false,
            grid: {
                color: 'rgba(0, 0, 0, 0.1)',
            },
            ticks: {
                callback: function (value) {
                    return value + '°C'
                },
            },
        },
        x: {
            grid: {
                color: 'rgba(0, 0, 0, 0.05)',
            },
        },
    },
}))

// Helper functions
function selectDay(day) {
    selectedDay.value = day
    showDetailModal.value = true
}

function closeModal() {
    showDetailModal.value = false
    selectedDay.value = null
}

// Helper functions
function getDailyForecast(forecastList) {
    if (!forecastList) return []

    // Group forecasts by date and take the first forecast for each day
    const dailyForecasts = new Map()

    forecastList.forEach((forecast) => {
        const date = new Date(forecast.dt_txt).toDateString()
        if (!dailyForecasts.has(date)) {
            // Calculate min/max temps for the day
            const dayForecasts = forecastList.filter(
                (f) => new Date(f.dt_txt).toDateString() === date,
            )
            const temps = dayForecasts.map((f) => f.main.temp)

            dailyForecasts.set(date, {
                ...forecast,
                main: {
                    ...forecast.main,
                    temp_min: Math.min(...temps),
                    temp_max: Math.max(...temps),
                },
            })
        }
    })

    return Array.from(dailyForecasts.values()).slice(0, 5)
}

function formatDate(dateStr) {
    const date = new Date(dateStr)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
        return 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow'
    } else {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
        })
    }
}

function getWeatherEmoji(weatherMain) {
    const weatherEmojis = {
        Clear: '☀️',
        Clouds: '☁️',
        Rain: '🌧️',
        Drizzle: '🌦️',
        Thunderstorm: '⛈️',
        Snow: '❄️',
        Mist: '🌫️',
        Smoke: '🌫️',
        Haze: '🌫️',
        Dust: '🌪️',
        Fog: '🌫️',
        Sand: '🌪️',
        Ash: '🌋',
        Squall: '🌬️',
        Tornado: '🌪️',
    }

    return weatherEmojis[weatherMain] || '🌤️'
}

function getCityCoordinates() {
    if (!city.value.trim()) {
        error.value = 'Please enter a city name'
        return
    }
    axios
        .get(`http://api.openweathermap.org/geo/1.0/direct`, {
            params: {
                q: city.value,
                appid: apiKey,
                limit: 1,
            },
        })
        .then((res) => {
            if (!res.data || !res.data.length) {
                throw new Error('City not found')
            }
            cityData.value = res.data[0]
            fetchWeather()
        })
        .catch((err) => {
            error.value = err.message
        })
}

function fetchWeather() {
    if (!apiKey) {
        error.value = 'API key is missing!'
        return
    }

    loading.value = true
    error.value = null

    axios
        .get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                lat: cityData.value.lat,
                lon: cityData.value.lon,
                appid: apiKey,
                units: 'metric',
                lang: 'en',
            },
        })
        .then((res) => {
            weatherData.value = res.data
            fetchForecast()
        })
        .catch((err) => {
            error.value = err.message
        })
        .finally(() => {
            loading.value = false
        })
}

function fetchForecast() {
    axios
        .get(`https://api.openweathermap.org/data/2.5/forecast`, {
            params: {
                lat: cityData.value.lat,
                lon: cityData.value.lon,
                appid: apiKey,
                units: 'metric',
                lang: 'en',
            },
        })
        .then((res) => {
            forecastData.value = res.data
        })
        .catch((err) => {
            error.value = err.message
        })
}

function searchCity() {
    error.value = null
    weatherData.value = null
    forecastData.value = null
    selectedDay.value = null
    showDetailModal.value = false
    getCityCoordinates()
}
</script>
