import library from '@/assets/data/library.json'
import CircleButton from '@/components/CircleButton'
import TracksList from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import React, { useMemo, useRef, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, Platform, ScrollView, View } from 'react-native'

const SongsScreen = () => {
	const [isReachedHalfList, setIsReachedHalfList] = useState(false)
	const scrollViewRef = useRef<ScrollView>(null)

	const search = useNavigationSearch({
		searchBarOptions: { placeholder: 'Find in songs' },
	})

	const filteredTracks = useMemo(() => {
		if (!search) return library

		return library.filter(trackTitleFilter(search))
	}, [search])

	const handleOnScrollOffSetReached = ({
		nativeEvent,
	}: NativeSyntheticEvent<NativeScrollEvent>) => {
		if (nativeEvent.contentOffset.y > 250) setIsReachedHalfList(true)
		if (nativeEvent.contentOffset.y <= 250) setIsReachedHalfList(false)
	}

	const hanleOnPressBackToTop = () => {
		scrollViewRef?.current?.scrollTo({ y: 0, animated: true })
	}

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{
					paddingHorizontal: screenPadding.horizontal,
					paddingTop: Platform.OS === 'android' ? screenPadding.vertical : 0,
				}}
				onScroll={handleOnScrollOffSetReached}
				ref={scrollViewRef}
			>
				<TracksList tracks={filteredTracks} scrollEnabled={false} />
			</ScrollView>
			{isReachedHalfList && (
				<CircleButton style={{}} iconName="caret-up" size={40} onPress={hanleOnPressBackToTop} />
			)}
		</View>
	)
}

export default SongsScreen
