import { unknownTrackImageUri } from '@/constants/images'
import { utilsStyles } from '@/styles'
import React from 'react'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import TrackPlayer, { Track } from 'react-native-track-player'
import TrackListItem from './TrackListItem'

export type TracksListProps = Partial<FlatListProps<Track>> & {
	tracks: Track[]
}

const ItemDevider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

const TracksList = ({ tracks, ...flatlistProps }: TracksListProps) => {
	const handleTrackSelect = async (track: Track) => {
		await TrackPlayer.load(track)
		await TrackPlayer.play()
	}

	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 228 }}
			ItemSeparatorComponent={ItemDevider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No songs found</Text>
					<FastImage
						source={{
							uri: unknownTrackImageUri,
							priority: FastImage.priority.normal,
						}}
						style={utilsStyles.emptyContentImage}
					/>
				</View>
			}
			ListFooterComponent={ItemDevider}
			renderItem={({ item: track }) => (
				<TrackListItem track={track} onTrackSelect={handleTrackSelect} />
			)}
			{...flatlistProps}
		/>
	)
}

export default TracksList
