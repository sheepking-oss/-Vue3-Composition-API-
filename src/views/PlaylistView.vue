<template>
  <div class="playlist-view">
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button 
              @click="$router.back()"
              class="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <h1 class="text-xl font-bold text-gray-800">歌单</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button class="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main v-if="playlist" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div class="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div class="relative">
            <img 
              :src="playlist.cover" 
              :alt="playlist.name"
              class="w-40 h-40 sm:w-48 sm:h-48 rounded-xl shadow-lg object-cover"
            />
            <div class="absolute top-2 right-2 flex items-center space-x-1 bg-black/50 rounded-full px-2 py-0.5">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-xs text-white">{{ formatPlayCount(playlist.playCount) }}</span>
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-2 mb-2">
              <span class="px-2 py-0.5 bg-music-red text-white text-xs rounded">歌单</span>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ playlist.name }}</h2>
            <div class="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 bg-gray-200 rounded-full"></div>
                <span>云音乐官方</span>
              </div>
              <span>{{ new Date().toLocaleDateString() }} 创建</span>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <button 
                @click="playAll"
                class="flex items-center space-x-2 px-6 py-2 bg-music-red text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                </svg>
                <span>播放全部</span>
              </button>
              <button class="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full hover:border-music-red hover:text-music-red transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <span>收藏</span>
              </button>
              <button class="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full hover:border-music-red hover:text-music-red transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                </svg>
                <span>分享</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-gray-800">歌曲列表</h3>
            <span class="text-sm text-gray-500">{{ playlist.songs?.length || 0 }} 首歌</span>
          </div>
        </div>

        <div class="hidden sm:flex items-center px-6 py-2 bg-gray-50 text-sm text-gray-500">
          <div class="w-8 text-center">#</div>
          <div class="flex-1 ml-4">标题</div>
          <div class="w-32 text-center">专辑</div>
          <div class="w-20 text-center">时长</div>
          <div class="w-16"></div>
        </div>

        <div class="divide-y divide-gray-100">
          <div 
            v-for="(song, index) in playlist.songs" 
            :key="song.id"
            class="flex items-center px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors group"
            @click="playSong(song, index)"
          >
            <div class="w-8 text-center">
              <span 
                v-if="playerStore.currentSong?.id === song.id"
                class="text-music-red"
              >
                <svg class="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                </svg>
              </span>
              <span v-else :class="['text-gray-400', index < 3 ? 'font-bold' : '']">
                {{ index + 1 }}
              </span>
            </div>
            <div class="flex-1 ml-4 min-w-0">
              <div class="flex items-center">
                <h4 :class="['font-medium truncate', 
                  playerStore.currentSong?.id === song.id ? 'text-music-red' : 'text-gray-800 group-hover:text-music-red']">
                  {{ song.title }}
                </h4>
              </div>
              <p class="text-sm text-gray-500 truncate sm:hidden">
                {{ song.artist }}
              </p>
              <p class="text-xs text-gray-400 truncate hidden sm:block">
                {{ song.artist }}
              </p>
            </div>
            <div class="w-32 text-center hidden sm:block">
              <span class="text-sm text-gray-500 truncate">{{ song.album }}</span>
            </div>
            <div class="w-20 text-center hidden sm:block">
              <span class="text-sm text-gray-400">{{ formatDuration(song.duration) }}</span>
            </div>
            <div class="w-16 flex justify-end">
              <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  @click.stop="addToPlaylist(song)"
                  class="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
                  title="添加到播放队列"
                >
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
                <button 
                  class="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
                  title="收藏"
                >
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
        </svg>
        <p class="text-gray-500">歌单不存在</p>
        <button 
          @click="$router.push('/')"
          class="mt-4 px-6 py-2 bg-music-red text-white rounded-full hover:bg-red-600 transition-colors"
        >
          返回首页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePlayerStore } from '../stores/player'
import { getPlaylistById, formatDuration, formatPlayCount } from '../data/mockData'

const route = useRoute()
const playerStore = usePlayerStore()

const playlist = ref(null)

const loadPlaylist = () => {
  const id = route.params.id
  playlist.value = getPlaylistById(id)
}

const playAll = () => {
  if (playlist.value && playlist.value.songs.length > 0) {
    playerStore.setPlaylist(playlist.value.songs, 0)
  }
}

const playSong = (song, index) => {
  if (playlist.value && playlist.value.songs.length > 0) {
    playerStore.setPlaylist(playlist.value.songs, index)
  }
}

const addToPlaylist = (song) => {
  playerStore.addToPlaylist(song)
  if (!playerStore.currentSong) {
    playerStore.setCurrentSong(song)
  }
}

onMounted(() => {
  loadPlaylist()
})

watch(() => route.params.id, () => {
  loadPlaylist()
})
</script>

<style scoped>
</style>
