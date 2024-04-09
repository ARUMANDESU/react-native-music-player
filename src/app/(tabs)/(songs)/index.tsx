import TracksList from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import React from 'react'
import { Platform, ScrollView, View } from 'react-native'

const SongsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: { placeholder: 'Find in songs' },
	})

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{
					paddingHorizontal: screenPadding.horizontal,
					paddingTop: Platform.OS === 'android' ? screenPadding.vertical : 0,
				}}
			>
				<TracksList scrollEnabled={false} />
			</ScrollView>
		</View>
	)
}

export default SongsScreen
