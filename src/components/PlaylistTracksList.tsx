import { unknownArtistImageUri } from '@/constants/images'
import { fontSize } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { Playlist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import TracksList from './TracksList'

const PlaylistTracksList = ({ playlist }: { playlist: Playlist }) => {
	const search = useNavigationSearch({
		searchBarOptions: {
			hideWhenScrolling: true,
			placeholder: 'Find in playlist',
		},
	})

	const filteredArtistTracks = useMemo(() => {
		return playlist.tracks.filter(trackTitleFilter(search))
	}, [playlist.tracks, search])

	return (
		<TracksList
			scrollEnabled={false}
			ListHeaderComponentStyle={styles.artistHeaderContainer}
			ListHeaderComponent={
				<View>
					<View style={styles.artworkImageContainer}>
						<FastImage
							source={{
								uri: unknownArtistImageUri,
								priority: FastImage.priority.high,
							}}
							style={styles.artistImage}
						/>
					</View>

					<Text numberOfLines={1} style={styles.artistNameText}>
						{playlist.name}
					</Text>
				</View>
			}
			tracks={filteredArtistTracks}
		/>
	)
}

const styles = StyleSheet.create({
	artistHeaderContainer: {
		flex: 1,
		marginBottom: 32,
	},
	artworkImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 200,
	},
	artistImage: {
		width: '60%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 128,
	},
	artistNameText: {
		...defaultStyles.text,
		marginTop: 22,
		textAlign: 'center',
		fontSize: fontSize.lg,
		fontWeight: '800',
	},
})

export default PlaylistTracksList
