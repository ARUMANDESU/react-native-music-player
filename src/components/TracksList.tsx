import { utilsStyles } from '@/styles'
import React from 'react'
import { FlatList, FlatListProps, View } from 'react-native'
import TrackListItem from './TrackListItem'

export type TracksListProps = Partial<FlatListProps<unknown>> & {
	tracks: any[]
}

const ItemDevider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

const TracksList = ({ tracks, ...flatlistProps }: TracksListProps) => {
	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 228 }}
			ItemSeparatorComponent={ItemDevider}
			ListFooterComponent={ItemDevider}
			renderItem={({ item: track }) => (
				<TrackListItem
					track={{
						...track,
						image: track.artwork,
					}}
				/>
			)}
			{...flatlistProps}
		/>
	)
}

export default TracksList
