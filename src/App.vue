<template>
  <div>
    <h1>Weather & Travel Dashboard</h1>
    
    <!-- поле вводу -->
    <input 
      v-model="city" 
      @keyup.enter="searchCity" 
      placeholder="Enter the city..." 
    />

    <!-- кнопка -->
    <button @click="searchCity">Search</button>

    <!-- картка погоди зʼявляється тільки якщо місто вибране -->
    <WeatherCard v-if="selectedCity" :city="selectedCity" lang="en" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import WeatherCard from "./components/WeatherCard.vue";

// поле для вводу
const city = ref("");

// вибране місто для пошуку
const selectedCity = ref("");

// функція пошуку
function searchCity() {
  if (city.value.trim()) {
    selectedCity.value = city.value;
  }
}
</script>
