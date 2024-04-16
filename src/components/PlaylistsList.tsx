import { colors } from '@/constants/tokens'
import { Playlist } from '@/helpers/types'
import { defaultStyles } from '@/styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { FlatList, Text, TouchableHighlight, View } from 'react-native'
import PlaylistsListItem from './PlaylistsListItem'

export type PlaylistsListProps = {
	playlists: Playlist[]
	onPlaylistPress: (playlist: Playlist) => void
	onCreateNewPlaylistPress: () => void
}

const PlaylistsList = ({
	playlists,
	onPlaylistPress,
	onCreateNewPlaylistPress,
}: PlaylistsListProps) => {
	const router = useRouter()
	return (
		<View>
			<FlatList
				data={playlists}
				ListHeaderComponent={
					<TouchableHighlight onPress={onCreateNewPlaylistPress}>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<MaterialCommunityIcons name="plus" size={24} color={colors.icon} />
							<Text style={{ ...defaultStyles.text }}>Create new playlist</Text>
						</View>
					</TouchableHighlight>
				}
				renderItem={({ item }) => (
					<PlaylistsListItem playlist={item} onPlaylistPress={onPlaylistPress} />
				)}
			/>
		</View>
	)
}

export default PlaylistsList
