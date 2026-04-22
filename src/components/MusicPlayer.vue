<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
    <div 
      class="absolute top-0 left-0 right-0 h-2 bg-gray-200 cursor-pointer group"
      @mousedown="startSeek"
      @click="seekToPercentage"
      ref="progressContainer"
    >
      <div 
        class="h-full bg-music-red transition-all"
        :class="isSeeking ? 'duration-0' : 'duration-100'"
        :style="{ width: `${displayProgressPercentage}%` }"
      ></div>
      <div 
        class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-music-red rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        :style="{ left: `calc(${displayProgressPercentage}% - 8px)` }"
      ></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3 min-w-0 flex-1 max-w-xs">
          <div class="relative">
            <div 
              :class="['w-12 h-12 rounded-lg overflow-hidden shadow-md', 
                playerStore.isPlaying ? 'animate-rotate' : 'animate-rotate-paused']"
            >
              <img 
                :src="playerStore.currentSong?.cover || defaultCover" 
                :alt="playerStore.currentSong?.title || '专辑封面'"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <div class="min-w-0">
            <h4 class="font-medium text-gray-800 truncate hover:text-music-red cursor-pointer transition-colors">
              {{ playerStore.currentSong?.title || '未选择歌曲' }}
            </h4>
            <p class="text-sm text-gray-500 truncate">
              {{ playerStore.currentSong?.artist || '-' }}
            </p>
          </div>
          <button class="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
        </div>

        <div class="flex flex-col items-center space-y-1 flex-1 max-w-md hidden sm:flex">
          <div class="flex items-center space-x-4">
            <button 
              @click="handlePlayModeToggle"
              class="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 relative group"
              :title="playModeTitle"
            >
              <svg 
                v-if="playerStore.playMode === 'sequence'" 
                class="w-5 h-5 text-gray-600"
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
              </svg>
              <svg 
                v-else-if="playerStore.playMode === 'loop'" 
                class="w-5 h-5 text-music-red"
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
              </svg>
              <svg 
                v-else 
                class="w-5 h-5 text-music-red"
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
              
              <span class="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-gray-100 px-2 py-1 rounded">
                {{ playModeTitle }}
              </span>
            </button>

            <button 
              @click="playerStore.playPrev"
              class="p-2 rounded-full hover:bg-gray-100 transition-colors"
              :disabled="!playerStore.hasPrev"
            >
              <svg class="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/>
              </svg>
            </button>

            <button 
              @click="playerStore.togglePlay"
              class="w-12 h-12 bg-music-red rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
            >
              <svg v-if="playerStore.isPlaying" class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              <svg v-else class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
              </svg>
            </button>

            <button 
              @click="playerStore.playNext"
              class="p-2 rounded-full hover:bg-gray-100 transition-colors"
              :disabled="!playerStore.hasNext"
            >
              <svg class="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"/>
              </svg>
            </button>

            <button class="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
              </svg>
            </button>
          </div>

          <div class="flex items-center space-x-2 w-full">
            <span class="text-xs text-gray-500 w-10 text-right">
              {{ formatTime(playerStore.currentTime) }}
            </span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              :value="displayProgressPercentage"
              @input="onRangeInput"
              @mousedown="onRangeMouseDown"
              @mouseup="onRangeMouseUp"
              @change="onRangeChange"
              class="flex-1 cursor-pointer"
            />
            <span class="text-xs text-gray-500 w-10">
              {{ formatTime(playerStore.currentSong?.duration || 0) }}
            </span>
          </div>
        </div>

        <div class="hidden sm:flex items-center space-x-2 flex-1 max-w-xs justify-end">
          <button 
            @click="toggleMute"
            class="p-2 rounded-full hover:bg-gray-100 transition-colors"
            :title="isMuted ? '取消静音' : '静音'"
          >
            <svg v-if="isMuted || playerStore.volume === 0" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
            </svg>
            <svg v-else-if="playerStore.volume < 0.5" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
            </svg>
            <svg v-else class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
            </svg>
          </button>
          <div class="relative group">
            <input 
              type="range" 
              min="0" 
              max="100" 
              :value="isMuted ? 0 : playerStore.volume * 100"
              @input="onVolumeInput"
              @change="onVolumeChange"
              class="w-24 cursor-pointer"
            />
          </div>
          <span class="text-xs text-gray-500 w-8 text-center">
            {{ Math.round(isMuted ? 0 : playerStore.volume * 100) }}%
          </span>
        </div>

        <div class="flex sm:hidden items-center space-x-2">
          <button 
            @click="playerStore.togglePlay"
            class="w-10 h-10 bg-music-red rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <svg v-if="playerStore.isPlaying" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
            </svg>
          </button>
          <button 
            @click="playerStore.playNext"
            class="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { usePlayerStore } from '../stores/player'

const playerStore = usePlayerStore()
const progressContainer = ref(null)
const isSeeking = ref(false)
const seekPercentage = ref(0)
const isMuted = ref(false)
const previousVolume = ref(0.7)
let simulationInterval = null

const defaultCover = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20default%20placeholder%20musical%20notes%20simple&image_size=square_hd'

const progressPercentage = computed(() => {
  const duration = playerStore.currentSong?.duration || 0
  if (duration === 0) return 0
  return (playerStore.currentTime / duration) * 100
})

const displayProgressPercentage = computed(() => {
  return isSeeking.value ? seekPercentage.value : progressPercentage.value
})

const playModeTitle = computed(() => {
  switch (playerStore.playMode) {
    case 'sequence':
      return '顺序播放'
    case 'loop':
      return '单曲循环'
    case 'random':
      return '随机播放'
    default:
      return '顺序播放'
  }
})

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const setCurrentTimeByPercentage = (percentage) => {
  const duration = playerStore.currentSong?.duration || 0
  if (duration === 0) return
  const clampedPercentage = Math.max(0, Math.min(100, percentage))
  playerStore.setCurrentTime((clampedPercentage / 100) * duration)
}

const seekTo = (e) => {
  const percentage = parseFloat(e.target.value)
  setCurrentTimeByPercentage(percentage)
}

const seekToPercentage = (e) => {
  if (isSeeking.value) return
  if (!progressContainer.value) return
  const rect = progressContainer.value.getBoundingClientRect()
  const percentage = ((e.clientX - rect.left) / rect.width) * 100
  setCurrentTimeByPercentage(percentage)
}

const updateSeekPosition = (clientX) => {
  if (!progressContainer.value) return
  const rect = progressContainer.value.getBoundingClientRect()
  const percentage = ((clientX - rect.left) / rect.width) * 100
  seekPercentage.value = Math.max(0, Math.min(100, percentage))
}

const startSeek = (e) => {
  isSeeking.value = true
  updateSeekPosition(e.clientX)
  
  const handleMouseMove = (moveEvent) => {
    if (isSeeking.value) {
      updateSeekPosition(moveEvent.clientX)
    }
  }
  
  const handleMouseUp = (upEvent) => {
    if (isSeeking.value) {
      setCurrentTimeByPercentage(seekPercentage.value)
      isSeeking.value = false
    }
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const onRangeInput = (e) => {
  seekPercentage.value = parseFloat(e.target.value)
}

const onRangeMouseDown = (e) => {
  isSeeking.value = true
  seekPercentage.value = parseFloat(e.target.value)
}

const onRangeMouseUp = (e) => {
  if (isSeeking.value) {
    setCurrentTimeByPercentage(seekPercentage.value)
    isSeeking.value = false
  }
}

const onRangeChange = (e) => {
  if (isSeeking.value) {
    setCurrentTimeByPercentage(parseFloat(e.target.value))
    isSeeking.value = false
  }
}

const setVolume = (e) => {
  const percentage = parseFloat(e.target.value)
  playerStore.setVolume(percentage / 100)
}

const toggleMute = () => {
  if (isMuted.value) {
    playerStore.setVolume(previousVolume.value)
    isMuted.value = false
  } else {
    previousVolume.value = playerStore.volume
    playerStore.setVolume(0)
    isMuted.value = true
  }
}

const onVolumeInput = (e) => {
  const percentage = parseFloat(e.target.value)
  playerStore.setVolume(percentage / 100)
  if (percentage > 0 && isMuted.value) {
    isMuted.value = false
  }
}

const onVolumeChange = (e) => {
  const percentage = parseFloat(e.target.value)
  playerStore.setVolume(percentage / 100)
  if (percentage > 0) {
    isMuted.value = false
    previousVolume.value = percentage / 100
  }
}

const handlePlayModeToggle = () => {
  playerStore.togglePlayMode()
}

const simulatePlayback = () => {
  if (!isSeeking.value && playerStore.isPlaying && playerStore.currentSong) {
    const newTime = playerStore.currentTime + 1
    if (newTime >= playerStore.currentSong.duration) {
      if (playerStore.playMode === 'loop') {
        playerStore.setCurrentTime(0)
      } else {
        playerStore.playNext()
      }
    } else {
      playerStore.setCurrentTime(newTime)
    }
  }
}

onMounted(() => {
  simulationInterval = setInterval(simulatePlayback, 1000)
})

onUnmounted(() => {
  if (simulationInterval) {
    clearInterval(simulationInterval)
  }
})
</script>

<style scoped>
</style>
