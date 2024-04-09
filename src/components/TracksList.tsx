import library from '@/assets/data/library.json'
import { utilsStyles } from '@/styles'
import React from 'react'
import { FlatList, FlatListProps, View } from 'react-native'
import TrackListItem from './TrackListItem'

export type TracksListProps = Partial<FlatListProps<unknown>>

const ItemDevider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

const TracksList = ({ ...flatlistProps }: TracksListProps) => {
	return (
		<FlatList
			data={library}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 228 }}
			ItemSeparatorComponent={ItemDevider}
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
