<script setup></script>

<template>
    <div>
        <h1>Weather Dashboard</h1>

        <!-- поле вводу -->
        <form @submit.prevent="searchCity">
            <input
                v-model="city"
                placeholder="Enter the city..."
                class="border border-gray-300 rounded-md p-2"
            />
            <button type="submit" class="bg-blue-500 text-white rounded-md p-2">Search</button>
        </form>

        <!-- картка погоди зʼявляється тільки якщо місто вибране -->
        <WeatherCard v-if="selectedCity" :city="selectedCity" lang="en" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import WeatherCard from '../components/WeatherCard.vue'

// поле для вводу
const city = ref('')

// вибране місто для пошуку
const selectedCity = ref('')

// функція пошуку
function searchCity() {
    if (city.value.trim()) {
        selectedCity.value = city.value
    }
}
</script>
