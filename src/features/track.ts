import library from '@/assets/data/library.json'
import { TrackWithPlaylist } from '@/helpers/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	tracks: library as TrackWithPlaylist[],
}

const tracksSlicer = createSlice({
	name: 'tracks',
	initialState: initialState,
	reducers: {
		toggleTrackFavorite: (state, action) => {
			state.tracks = state.tracks.map((currentTrack) => {
				if (currentTrack.url === action.payload.url) {
					return {
						...currentTrack,
						rating: currentTrack.rating === 1 ? 0 : 1,
					}
				}

				return currentTrack
			})
		},
		addToPlaylist: (state, action) => {
			console.log(action.payload.trackURL)
			console.log(action.payload.playlistName)

			state.tracks = state.tracks.map((currentTrack) => {
				if (currentTrack.url === action.payload.trackURL) {
					return {
						...currentTrack,
						playlist: [...(currentTrack.playlist ?? []), action.payload.playlistName],
					}
				}

				return currentTrack
			})
		},
	},
})

export const { addToPlaylist, toggleTrackFavorite } = tracksSlicer.actions

export default tracksSlicer.reducer
