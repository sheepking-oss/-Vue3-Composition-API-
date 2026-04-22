<template>
  <div class="home-view">
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-music-red rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
              </svg>
            </div>
            <h1 class="text-xl font-bold text-gray-800">云音乐</h1>
          </div>
          <nav class="hidden md:flex items-center space-x-8">
            <router-link to="/" class="text-music-red font-medium">发现音乐</router-link>
            <router-link to="/profile" class="text-gray-600 hover:text-music-red transition-colors">我的</router-link>
          </nav>
          <div class="flex items-center space-x-4">
            <button class="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
            <router-link to="/profile" class="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <section class="mb-8">
        <div class="relative rounded-2xl overflow-hidden shadow-lg">
          <div 
            v-if="banners.length > 0"
            class="relative h-48 sm:h-64 md:h-80 transition-all duration-500"
          >
            <img 
              :src="banners[currentBannerIndex].image" 
              :alt="banners[currentBannerIndex].title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div class="absolute bottom-4 left-6 text-white">
              <h2 class="text-lg sm:text-2xl font-bold">{{ banners[currentBannerIndex].title }}</h2>
            </div>
          </div>
          
          <button 
            @click="prevBanner"
            class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button 
            @click="nextBanner"
            class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
          
          <div class="absolute bottom-4 right-6 flex space-x-2">
            <button 
              v-for="(banner, index) in banners" 
              :key="banner.id"
              @click="goToBanner(index)"
              :class="['w-2 h-2 rounded-full transition-all', index === currentBannerIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/75']"
            ></button>
          </div>
        </div>
      </section>

      <section class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800">推荐歌单</h2>
          <button class="text-sm text-gray-500 hover:text-music-red transition-colors">
            更多
          </button>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div 
            v-for="playlist in playlists" 
            :key="playlist.id"
            class="group cursor-pointer"
            @click="goToPlaylist(playlist.id)"
          >
            <div class="relative rounded-xl overflow-hidden mb-2 shadow-md group-hover:shadow-xl transition-all duration-300">
              <img 
                :src="playlist.cover" 
                :alt="playlist.name"
                class="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              <div class="absolute top-2 right-2 flex items-center space-x-1 bg-black/50 rounded-full px-2 py-0.5">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                </svg>
                <span class="text-xs text-white">{{ formatPlayCount(playlist.playCount) }}</span>
              </div>
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  @click.stop="playPlaylist(playlist)"
                  class="w-12 h-12 bg-music-red rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
            <h3 class="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-music-red transition-colors">
              {{ playlist.name }}
            </h3>
          </div>
        </div>
      </section>

      <section class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800">热门榜单</h2>
          <button class="text-sm text-gray-500 hover:text-music-red transition-colors">
            更多
          </button>
        </div>
        <div class="bg-white rounded-2xl shadow-md overflow-hidden">
          <div class="divide-y divide-gray-100">
            <div 
              v-for="(song, index) in hotSongs" 
              :key="song.id"
              class="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors group"
              @click="playSong(song, index)"
            >
              <div 
                :class="['w-6 text-center font-bold text-lg', 
                  index < 3 ? 'text-music-red' : 'text-gray-400']"
              >
                {{ song.rank }}
              </div>
              <div class="ml-4 flex-1 min-w-0">
                <div class="flex items-center">
                  <h3 :class="['font-medium truncate', 
                    playerStore.currentSong?.id === song.id ? 'text-music-red' : 'text-gray-800 group-hover:text-music-red']">
                    {{ song.title }}
                  </h3>
                  <span class="ml-2 text-xs text-gray-400 hidden sm:inline">-</span>
                  <span class="ml-2 text-sm text-gray-500 truncate hidden sm:inline">
                    {{ song.artist }}
                  </span>
                </div>
                <p class="text-xs text-gray-400 truncate hidden md:block">
                  {{ song.album }}
                </p>
              </div>
              <div class="ml-4 flex items-center space-x-3">
                <span class="text-sm text-gray-400 hidden sm:block">
                  {{ formatDuration(song.duration) }}
                </span>
                <button 
                  @click.stop="addToPlaylist(song)"
                  class="p-2 rounded-full hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePlayerStore } from '../stores/player'
import { banners, playlists, hotSongs, formatDuration, formatPlayCount, getPlaylistById } from '../data/mockData'

const router = useRouter()
const playerStore = usePlayerStore()

const currentBannerIndex = ref(0)
let bannerInterval = null

const goToPlaylist = (id) => {
  router.push(`/playlist/${id}`)
}

const playPlaylist = (playlist) => {
  const fullPlaylist = getPlaylistById(playlist.id)
  if (fullPlaylist && fullPlaylist.songs.length > 0) {
    playerStore.setPlaylist(fullPlaylist.songs, 0)
  }
}

const playSong = (song, index) => {
  const playlistToPlay = hotSongs.map(s => ({ ...s }))
  playerStore.setPlaylist(playlistToPlay, index)
}

const addToPlaylist = (song) => {
  playerStore.addToPlaylist(song)
  if (!playerStore.currentSong) {
    playerStore.setCurrentSong(song)
  }
}

const nextBanner = () => {
  currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.length
}

const prevBanner = () => {
  currentBannerIndex.value = (currentBannerIndex.value - 1 + banners.length) % banners.length
}

const goToBanner = (index) => {
  currentBannerIndex.value = index
}

onMounted(() => {
  bannerInterval = setInterval(() => {
    nextBanner()
  }, 5000)
})

onUnmounted(() => {
  if (bannerInterval) {
    clearInterval(bannerInterval)
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
