<template>
  <div>
    <h1>Weather & Travel Dashboard</h1>
    <input v-model="city" @keyup.enter="searchCity" />
    <button @click="searchCity">Search</button>

    <WeatherCard v-if="selectedCity" :city="selectedCity" lang="en" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import WeatherCard from "./components/WeatherCard.vue";

const city = ref("Lisbon");
const selectedCity = ref("Lisbon");

function searchCity() {
  selectedCity.value = city.value;
}
</script>
