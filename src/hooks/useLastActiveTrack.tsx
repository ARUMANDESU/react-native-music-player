import { useEffect, useState } from 'react'
import { Track, useActiveTrack } from 'react-native-track-player'

const useLastActiveTrack = () => {
	const activeTrack = useActiveTrack()
	const [lastActiveTract, setLastActiveTract] = useState<Track>()

	useEffect(() => {
		if (!activeTrack) return

		setLastActiveTract(activeTrack)
	}, [activeTrack])

	return lastActiveTract
}

export default useLastActiveTrack
