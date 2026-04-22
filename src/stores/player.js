import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const currentSong = ref(null)
  const playlist = ref([])
  const currentIndex = ref(0)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(0.7)
  const playMode = ref('sequence')
  const recentPlays = ref([])

  const currentSongIndex = computed(() => {
    if (!currentSong.value || playlist.value.length === 0) return -1
    return playlist.value.findIndex(song => song.id === currentSong.value.id)
  })

  const hasPrev = computed(() => {
    return playlist.value.length > 0
  })

  const hasNext = computed(() => {
    return playlist.value.length > 0
  })

  const setCurrentSong = (song) => {
    currentSong.value = song
    currentTime.value = 0
    if (song && !recentPlays.value.find(s => s.id === song.id)) {
      recentPlays.value.unshift({ ...song, playTime: new Date() })
      if (recentPlays.value.length > 20) {
        recentPlays.value = recentPlays.value.slice(0, 20)
      }
    }
  }

  const setPlaylist = (songs, startIndex = 0) => {
    playlist.value = songs
    currentIndex.value = startIndex
    if (songs.length > 0) {
      setCurrentSong(songs[startIndex])
      isPlaying.value = true
    }
  }

  const addToPlaylist = (song) => {
    const exists = playlist.value.find(s => s.id === song.id)
    if (!exists) {
      playlist.value.push(song)
    }
  }

  const removeFromPlaylist = (songId) => {
    const index = playlist.value.findIndex(s => s.id === songId)
    if (index > -1) {
      playlist.value.splice(index, 1)
      if (currentSong.value && currentSong.value.id === songId) {
        if (playlist.value.length > 0) {
          currentSong.value = playlist.value[Math.min(index, playlist.value.length - 1)]
        } else {
          currentSong.value = null
          isPlaying.value = false
        }
      }
    }
  }

  const play = () => {
    if (currentSong.value) {
      isPlaying.value = true
    }
  }

  const pause = () => {
    isPlaying.value = false
  }

  const togglePlay = () => {
    if (isPlaying.value) {
      pause()
    } else {
      play()
    }
  }

  const playPrev = () => {
    if (playlist.value.length === 0) return

    if (playMode.value === 'random') {
      const randomIndex = Math.floor(Math.random() * playlist.value.length)
      currentIndex.value = randomIndex
      setCurrentSong(playlist.value[randomIndex])
    } else {
      currentIndex.value = (currentIndex.value - 1 + playlist.value.length) % playlist.value.length
      setCurrentSong(playlist.value[currentIndex.value])
    }
    isPlaying.value = true
  }

  const playNext = () => {
    if (playlist.value.length === 0) return

    if (playMode.value === 'random') {
      const randomIndex = Math.floor(Math.random() * playlist.value.length)
      currentIndex.value = randomIndex
      setCurrentSong(playlist.value[randomIndex])
    } else {
      currentIndex.value = (currentIndex.value + 1) % playlist.value.length
      setCurrentSong(playlist.value[currentIndex.value])
    }
    isPlaying.value = true
  }

  const setCurrentTime = (time) => {
    currentTime.value = time
  }

  const setDuration = (time) => {
    duration.value = time
  }

  const setVolume = (vol) => {
    volume.value = Math.max(0, Math.min(1, vol))
  }

  const setPlayMode = (mode) => {
    playMode.value = mode
  }

  const togglePlayMode = () => {
    const modes = ['sequence', 'loop', 'random']
    const currentIndex = modes.indexOf(playMode.value)
    playMode.value = modes[(currentIndex + 1) % modes.length]
  }

  const removeRecentPlay = (songId) => {
    const index = recentPlays.value.findIndex(s => s.id === songId)
    if (index > -1) {
      recentPlays.value.splice(index, 1)
    }
  }

  const clearRecentPlays = () => {
    recentPlays.value = []
  }

  return {
    currentSong,
    playlist,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    playMode,
    recentPlays,
    currentSongIndex,
    hasPrev,
    hasNext,
    setCurrentSong,
    setPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    play,
    pause,
    togglePlay,
    playPrev,
    playNext,
    setCurrentTime,
    setDuration,
    setVolume,
    setPlayMode,
    togglePlayMode,
    removeRecentPlay,
    clearRecentPlays
  }
})
