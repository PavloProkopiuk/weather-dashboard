<template>
    <div class="h-screen w-full flex flex-col justify-between">
        <header class="bg-white shadow w-full">
            <div
                class="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8"
            >
                <h1 class="text-3xl font-bold text-gray-900">Weather Dashboard</h1>
                <div class="flex items-center gap-4">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-md">
                        <router-link :to="{ name: 'home' }">Home</router-link>
                    </button>
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-md">
                        <router-link :to="{ name: 'about' }">About</router-link>
                    </button>
                </div>
            </div>
        </header>
        <main class="grow max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <slot />
        </main>
        <footer class="bg-white shadow text-center">
            <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <p class="text-gray-500">Pavlo Prokopiuk {{ new Date().getFullYear() }} (c) copyright</p>
            </div>
        </footer>
    </div>
</template>
