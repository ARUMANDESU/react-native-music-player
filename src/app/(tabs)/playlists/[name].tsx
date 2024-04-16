import { usePlaylists } from '@/app/store'
import PlaylistTracksList from '@/components/PlaylistTracksList'
import { screenPadding } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { Redirect, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ScrollView, View } from 'react-native'

const PlaylistPage = () => {
	const { name: playlistName } = useLocalSearchParams<{ name: string }>()

	const { playlists } = usePlaylists()

	const playlistsList = playlists.find((playlist) => playlist.name === playlistName)

	if (!playlistsList) {
		console.warn(`Playlist ${playlistName} not found!`)

		return <Redirect href={'/(tabs)/playlists'} />
	}
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<PlaylistTracksList playlist={playlistsList} />
			</ScrollView>
		</View>
	)
}

export default PlaylistPage
