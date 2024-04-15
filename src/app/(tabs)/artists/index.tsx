import { useArtists } from '@/app/store'
import CircleButton from '@/components/CircleButton'
import { ItemDevider } from '@/components/TracksList'
import { unknownArtistImageUri } from '@/constants/images'
import { screenPadding } from '@/constants/tokens'
import { artistNameFilter } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles, utilsStyles } from '@/styles'
import { Link } from 'expo-router'
import React, { useMemo, useRef, useState } from 'react'
import {
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from 'react-native'
import FastImage from 'react-native-fast-image'

const ArtistsScreen = () => {
	const [isReachedBackToTopOffset, setIsReachedHalfList] = useState(false)
	const scrollViewRef = useRef<ScrollView>(null)

	const handleOnScrollOffSetReached = ({
		nativeEvent,
	}: NativeSyntheticEvent<NativeScrollEvent>) => {
		if (nativeEvent.contentOffset.y > 250) setIsReachedHalfList(true)
		if (nativeEvent.contentOffset.y <= 250) setIsReachedHalfList(false)
	}

	const hanleOnPressBackToTop = () => {
		scrollViewRef?.current?.scrollTo({ y: 0, animated: true })
	}
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in artists',
		},
	})

	const artists = useArtists()

	const filteredArtists = useMemo(() => {
		if (!search) return artists

		return artists.filter(artistNameFilter(search))
	}, [artists, search])
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{
					paddingHorizontal: screenPadding.horizontal,
					paddingVertical: Platform.OS === 'android' ? screenPadding.vertical : 0,
					paddingBottom: Platform.OS === 'android' ? 200 : 0,
				}}
				onScroll={handleOnScrollOffSetReached}
				ref={scrollViewRef}
			>
				<FlatList
					contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
					scrollEnabled={false}
					ItemSeparatorComponent={ItemDevider}
					ListFooterComponent={ItemDevider}
					ListEmptyComponent={
						<View>
							<Text>No artist found</Text>

							<FastImage
								source={{
									uri: unknownArtistImageUri,
									priority: FastImage.priority.normal,
								}}
								style={utilsStyles.emptyContentImage}
							/>
						</View>
					}
					data={filteredArtists}
					renderItem={({ item: artist }) => {
						return (
							<Link href={`/artists/${artist.name}`} asChild>
								<TouchableHighlight activeOpacity={0.8}>
									<View style={styles.artistItemContainer}>
										<View>
											<FastImage
												source={{
													uri: unknownArtistImageUri,
													priority: FastImage.priority.normal,
												}}
												style={styles.artistImage}
											/>
										</View>

										<View style={{ width: '100%' }}>
											<Text numberOfLines={1} style={styles.artistNameText}>
												{artist.name}
											</Text>
										</View>
									</View>
								</TouchableHighlight>
							</Link>
						)
					}}
				/>
			</ScrollView>
			{isReachedBackToTopOffset && (
				<CircleButton style={{}} iconName="caret-up" size={40} onPress={hanleOnPressBackToTop} />
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	artistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
	},
	artistImage: {
		borderRadius: 32,
		width: 40,
		height: 40,
	},
	artistNameText: {
		...defaultStyles.text,
		fontSize: 17,
		maxWidth: '80%',
	},
})

export default ArtistsScreen
