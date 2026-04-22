<template>
  <div class="min-h-screen pb-24">
    <router-view />
    <MusicPlayer v-if="currentSong" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePlayerStore } from './stores/player'
import MusicPlayer from './components/MusicPlayer.vue'

const playerStore = usePlayerStore()
const currentSong = computed(() => playerStore.currentSong)
</script>

<style scoped>
</style>
