import { RootState } from '@/app/store'
import CircleButton from '@/components/CircleButton'
import TracksList from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { TrackWithPlaylist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import React, { useMemo, useRef, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, Platform, ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'

const SongsScreen = () => {
	const [isReachedBackToTopOffset, setIsReachedHalfList] = useState(false)
	const scrollViewRef = useRef<ScrollView>(null)

	const search = useNavigationSearch({
		searchBarOptions: { placeholder: 'Find in songs' },
	})

	const tracks = useSelector<RootState>((state) => state.track.tracks) as TrackWithPlaylist[]

	const filteredTracks = useMemo(() => {
		if (!search) return tracks

		return tracks.filter(trackTitleFilter(search))
	}, [search, tracks])

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
			{isReachedBackToTopOffset && (
				<CircleButton style={{}} iconName="caret-up" size={40} onPress={hanleOnPressBackToTop} />
			)}
		</View>
	)
}

export default SongsScreen
