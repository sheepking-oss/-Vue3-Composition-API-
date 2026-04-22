<template>
  <div class="profile-view">
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
            <h1 class="text-xl font-bold text-gray-800">我的</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button class="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div class="w-24 h-24 rounded-full bg-gradient-to-br from-music-red to-pink-500 flex items-center justify-center shadow-lg">
            <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="text-center sm:text-left">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">音乐爱好者</h2>
            <p class="text-gray-500 mb-3">用音乐点亮生活</p>
            <div class="flex items-center justify-center sm:justify-start space-x-6 text-sm">
              <div class="text-center">
                <p class="font-bold text-gray-800">128</p>
                <p class="text-gray-500">关注</p>
              </div>
              <div class="w-px h-8 bg-gray-200"></div>
              <div class="text-center">
                <p class="font-bold text-gray-800">256</p>
                <p class="text-gray-500">粉丝</p>
              </div>
              <div class="w-px h-8 bg-gray-200"></div>
              <div class="text-center">
                <p class="font-bold text-gray-800">52</p>
                <p class="text-gray-500">歌单</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-gray-800">我喜欢的音乐</h3>
          <span class="text-sm text-gray-500">{{ favoritePlaylists.length }} 个歌单</span>
        </div>
        <div v-if="favoritePlaylists.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div 
            v-for="playlist in favoritePlaylists" 
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
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
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
            <h4 class="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-music-red transition-colors">
              {{ playlist.name }}
            </h4>
          </div>
        </div>
        <div v-else class="bg-gray-50 rounded-xl p-8 text-center">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          <p class="text-gray-500">还没有收藏的歌单</p>
        </div>
      </div>

      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-gray-800">最近播放</h3>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500">{{ playerStore.recentPlays.length }} 首</span>
            <button 
              v-if="playerStore.recentPlays.length > 0"
              @click="clearRecentPlays"
              class="text-sm text-gray-500 hover:text-music-red transition-colors"
            >
              清空
            </button>
          </div>
        </div>
        <div v-if="playerStore.recentPlays.length > 0" class="bg-white rounded-2xl shadow-md overflow-hidden">
          <div class="hidden sm:flex items-center px-6 py-2 bg-gray-50 text-sm text-gray-500">
            <div class="w-8 text-center">#</div>
            <div class="flex-1 ml-4">标题</div>
            <div class="w-32 text-center hidden md:block">歌手</div>
            <div class="w-24 text-center">播放时间</div>
            <div class="w-16"></div>
          </div>
          <div class="divide-y divide-gray-100">
            <div 
              v-for="(song, index) in playerStore.recentPlays" 
              :key="song.id"
              class="flex items-center px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors group"
              @click="playSong(song)"
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
                <span v-else class="text-gray-400">{{ index + 1 }}</span>
              </div>
              <div class="flex items-center ml-4 flex-1 min-w-0">
                <img 
                  :src="song.cover" 
                  :alt="song.title"
                  class="w-10 h-10 rounded-lg object-cover mr-3"
                />
                <div class="min-w-0">
                  <h4 :class="['font-medium truncate', 
                    playerStore.currentSong?.id === song.id ? 'text-music-red' : 'text-gray-800 group-hover:text-music-red']">
                    {{ song.title }}
                  </h4>
                  <p class="text-sm text-gray-500 truncate sm:hidden">
                    {{ song.artist }}
                  </p>
                </div>
              </div>
              <div class="w-32 text-center hidden md:block">
                <span class="text-sm text-gray-500">{{ song.artist }}</span>
              </div>
              <div class="w-24 text-center">
                <span class="text-xs text-gray-400">{{ formatPlayTime(song.playTime) }}</span>
              </div>
              <div class="w-16 flex justify-end">
                <button 
                  @click.stop="removeRecentPlay(song.id)"
                  class="p-1.5 rounded-full hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100"
                  title="删除"
                >
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="bg-gray-50 rounded-xl p-8 text-center">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-gray-500">还没有播放记录</p>
        </div>
      </div>

      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-gray-800">播放队列</h3>
          <span class="text-sm text-gray-500">{{ playerStore.playlist.length }} 首</span>
        </div>
        <div v-if="playerStore.playlist.length > 0" class="bg-white rounded-2xl shadow-md overflow-hidden">
          <div class="divide-y divide-gray-100">
            <div 
              v-for="(song, index) in playerStore.playlist" 
              :key="song.id"
              class="flex items-center px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors group"
              @click="playFromQueue(index)"
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
                <span v-else class="text-gray-400">{{ index + 1 }}</span>
              </div>
              <div class="flex items-center ml-4 flex-1 min-w-0">
                <img 
                  :src="song.cover" 
                  :alt="song.title"
                  class="w-10 h-10 rounded-lg object-cover mr-3"
                />
                <div class="min-w-0">
                  <h4 :class="['font-medium truncate', 
                    playerStore.currentSong?.id === song.id ? 'text-music-red' : 'text-gray-800 group-hover:text-music-red']">
                    {{ song.title }}
                  </h4>
                  <p class="text-sm text-gray-500 truncate">{{ song.artist }}</p>
                </div>
              </div>
              <div class="w-16 flex justify-end">
                <button 
                  @click.stop="removeFromQueue(song.id)"
                  class="p-1.5 rounded-full hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100"
                  title="移除"
                >
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="bg-gray-50 rounded-xl p-8 text-center">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
          </svg>
          <p class="text-gray-500">播放队列为空</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { usePlayerStore } from '../stores/player'
import { favoritePlaylists, getPlaylistById, formatPlayCount } from '../data/mockData'

const router = useRouter()
const playerStore = usePlayerStore()

const goToPlaylist = (id) => {
  router.push(`/playlist/${id}`)
}

const playPlaylist = (playlist) => {
  const fullPlaylist = getPlaylistById(playlist.id)
  if (fullPlaylist && fullPlaylist.songs.length > 0) {
    playerStore.setPlaylist(fullPlaylist.songs, 0)
  }
}

const playSong = (song) => {
  playerStore.setCurrentSong(song)
  playerStore.play()
}

const playFromQueue = (index) => {
  playerStore.setPlaylist(playerStore.playlist, index)
}

const removeRecentPlay = (songId) => {
  playerStore.removeRecentPlay(songId)
}

const removeFromQueue = (songId) => {
  playerStore.removeFromPlaylist(songId)
}

const clearRecentPlays = () => {
  playerStore.clearRecentPlays()
}

const formatPlayTime = (date) => {
  if (!date) return ''
  const now = new Date()
  const playTime = new Date(date)
  const diff = now - playTime
  
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  
  return playTime.toLocaleDateString()
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
