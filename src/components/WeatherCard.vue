<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  city: String,
  lang: String
});

const weatherData = ref(null);
const loading = ref(false);
const error = ref(null);

const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;

async function fetchWeather() {
  if (!apiKey) {
    error.value = "API key is missing!";
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=metric&lang=${props.lang}`
    );

    if (!res.ok) {
      throw new Error("City not found");
    }

    weatherData.value = await res.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

watch(() => props.city, fetchWeather, { immediate: true });
</script>

<template>
  <div>
    <p v-if="loading">Завантаження…</p>
    <p v-else-if="error">{{ error }}</p>
    <div v-else-if="weatherData">
      <h2>{{ weatherData.name }}</h2>
      <p v-if="weatherData.weather">
        {{ weatherData.weather[0].description }}
      </p>
      <p>{{ weatherData.main.temp }} °C</p>
    </div>
  </div>
</template>
