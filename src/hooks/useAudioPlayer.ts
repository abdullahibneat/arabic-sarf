import { AudioPlayerContext } from '../contexts/AudioPlayerContext'
import { useContext } from 'preact/hooks'

const useAudioPlayer = () => useContext(AudioPlayerContext)

export default useAudioPlayer
