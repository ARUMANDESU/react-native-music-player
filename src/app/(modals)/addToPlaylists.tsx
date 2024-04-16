import PlaylistsList from '@/components/PlaylistsList'
import { screenPadding } from '@/constants/tokens'
import { Playlist } from '@/helpers/types'
import { defaultStyles } from '@/styles'
import { useHeaderHeight } from '@react-navigation/elements'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Track } from 'react-native-track-player'
import { useDispatch } from 'react-redux'
import { usePlaylists, useTracks } from '../store'

const AddToPlaylists = () => {
	const { playlists, addToPlaylist } = usePlaylists()
	const router = useRouter()
	const headerHeight = useHeaderHeight()
	const dispatch = useDispatch()

	const { trackUrl } = useLocalSearchParams<{ trackUrl: Track['url'] }>()

	const tracks = useTracks()

	const track = tracks.find((currentTrack) => trackUrl === currentTrack.url)

	// track was not found
	if (!track) {
		return null
	}

	const availablePlaylists = playlists.filter(
		(playlist) => !playlist.tracks.some((playlistTrack) => playlistTrack.url === track.url),
	)

	const handlePlaylistPress = async (playlist: Playlist) => {
		dispatch(addToPlaylist({ trackURL: track.url, playlistName: playlist.name }))
		router.dismiss()
	}

	const handleNewPlaylist = () => {
		router.push({ pathname: '/(tabs)/playlists/create', params: { trackUrl: track.url } })
	}

	return (
		<View style={[styles.modalContainer, { paddingTop: headerHeight }]}>
			<PlaylistsList
				playlists={availablePlaylists}
				onPlaylistPress={handlePlaylistPress}
				onCreateNewPlaylistPress={handleNewPlaylist}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
	},
})

export default AddToPlaylists
