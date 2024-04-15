import { unknownTrackImageUri } from '@/constants/images'
import { colors } from '@/constants/tokens'
import useLastActiveTrack from '@/hooks/useLastActiveTrack'
import { useTrackPlayerFavorite } from '@/hooks/useTrackPlayerFavorite'
import { defaultStyles } from '@/styles'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Track, useActiveTrack } from 'react-native-track-player'
import MovingText from './MovingText'
import { FavoriteButton, PlayPauseButton, SkipToNextButton } from './PlayerControls'
import PlayerProgressBar from './PlayerProgressBar'

const FloatingPlayer = ({ style }: ViewProps) => {
	const router = useRouter()
	const activeTrack = useActiveTrack()
	const lastActiveTrack = useLastActiveTrack()

	const { isFavorite, toggleFavorite } = useTrackPlayerFavorite()

	const displayedTrack: Track | undefined = activeTrack ?? lastActiveTrack

	const handlePress = () => {
		router.navigate('/player')
	}

	if (!displayedTrack) return null

	return (
		<TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={[style]}>
			<>
				<View style={styles.container}>
					<FastImage
						source={{
							uri: displayedTrack.artwork ?? unknownTrackImageUri,
						}}
						style={styles.trackArtworkImage}
					/>

					<View style={styles.trackTitleContainer}>
						<MovingText
							style={styles.trackTitleText}
							text={displayedTrack.title ?? ''}
							animationThreshold={25}
						/>
					</View>

					<View style={styles.trackControlsContainer}>
						<FavoriteButton isFavorite={isFavorite} onPress={toggleFavorite} />
						<PlayPauseButton iconSize={24} />
						<SkipToNextButton iconSize={22} />
					</View>
				</View>
				<View>
					<PlayerProgressBar
						style={styles.playerProgressSlider}
						sliderHeight={2}
						disableTrackFollow={true}
					/>
				</View>
			</>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.softBackground,
		padding: 8,
		borderRadius: 8,
		paddingVertical: 10,
		justifyContent: 'space-between',
	},
	trackArtworkImage: {
		width: 40,
		height: 40,
		borderRadius: 8,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: '600',
		paddingLeft: 10,
	},
	trackControlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginRight: 16,
		paddingLeft: 16,
	},
	playerProgressSlider: {
		paddingHorizontal: 10,
		paddingBottom: 3,
	},
})

export default FloatingPlayer
