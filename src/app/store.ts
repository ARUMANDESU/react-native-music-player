import { Artist, TrackWithPlaylist } from '@/helpers/types'
import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import balanceReducer from '../features/slice'
import trackReducer, { toggleTrackFavorite } from '../features/track'

export const store = configureStore({
	reducer: { balance: balanceReducer, track: trackReducer },
})

export type RootState = ReturnType<typeof store.getState>

export const useFavorites = () => {
	const favorites = useSelector<RootState>((state) =>
		state.track.tracks.filter((track) => track.rating === 1),
	) as TrackWithPlaylist[]

	return {
		favorites,
		toggleTrackFavorite,
	}
}

export const useArtists = () => {
	return useSelector<RootState>((state) =>
		state.track.tracks.reduce((acc, track) => {
			const existingArtist = acc.find((artist) => artist.name === track.artist)

			if (existingArtist) {
				existingArtist.tracks.push(track)
			} else {
				acc.push({
					name: track.artist ?? 'Unknown',
					tracks: [track],
				})
			}

			return acc
		}, [] as Artist[]),
	) as Artist[]
}
