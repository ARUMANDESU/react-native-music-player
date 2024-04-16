import { unknownTrackImageUri } from '@/constants/images'
import { Playlist } from '@/helpers/types'
import { defaultStyles } from '@/styles'
import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import FastImage from 'react-native-fast-image'

export type PlaylistsListItemProps = {
	playlist: Playlist
	onPlaylistPress: (playlist: Playlist) => void
}

const PlaylistsListItem = ({ playlist, onPlaylistPress }: PlaylistsListItemProps) => {
	return (
		<TouchableHighlight
			onPress={() => {
				onPlaylistPress(playlist)
			}}
		>
			<View style={defaultStyles.container}>
				<FastImage source={{ uri: playlist.coverImg ?? unknownTrackImageUri }} />
				<Text style={defaultStyles.text}>{playlist.name}</Text>
			</View>
		</TouchableHighlight>
	)
}

export default PlaylistsListItem
