import { unknownTrackImageUri } from '@/constants/images'
import { Artist, Playlist, TrackWithPlaylist } from '@/helpers/types'
import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import balanceReducer from '../features/slice'
import trackReducer, { addToPlaylist, toggleTrackFavorite } from '../features/track'

export const store = configureStore({
	reducer: { balance: balanceReducer, track: trackReducer },
})

export type RootState = ReturnType<typeof store.getState>

export const useTracks = () => {
	return useSelector<RootState>((state) => state.track.tracks) as TrackWithPlaylist[]
}

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

export const usePlaylists = () => {
	const playlists = useSelector<RootState>((state) =>
		state.track.tracks.reduce((acc, track) => {
			track.playlist?.forEach((playlistName) => {
				const existingPlaylist = acc.find((playlist) => playlist.name === playlistName)

				if (existingPlaylist) {
					existingPlaylist.tracks.push(track)
				} else {
					acc.push({
						name: playlistName,
						tracks: [track],
						coverImg: track.artwork ?? unknownTrackImageUri,
					})
				}
			})

			return acc
		}, [] as Playlist[]),
	) as Playlist[]

	return { playlists, addToPlaylist }
}
