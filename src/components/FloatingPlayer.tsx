import { unknownTrackImageUri } from '@/constants/images'
import { colors } from '@/constants/tokens'
import useLastActiveTrack from '@/hooks/useLastActiveTrack'
import { defaultStyles } from '@/styles'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Track, useActiveTrack } from 'react-native-track-player'
import { PlayPauseButton, SkipToNextButton } from './PlayerControls'

const FloatingPlayer = ({ style }: ViewProps) => {
	const activeTrack = useActiveTrack()
	const lastActiveTrack = useLastActiveTrack()

	//todo: change this later
	const displayedTrack: Track = activeTrack ?? lastActiveTrack

	if (!displayedTrack) return null

	return (
		<TouchableOpacity activeOpacity={0.9} style={[styles.container, style]}>
			<>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<FastImage
						source={{ uri: displayedTrack.artwork ?? unknownTrackImageUri }}
						style={styles.trackArtworkImage}
					/>
					<Text style={styles.trackTitleText}>{displayedTrack.title}</Text>
				</View>
				<View style={styles.trackControlsContainer}>
					<PlayPauseButton iconSize={24} />
					<SkipToNextButton iconSize={22} />
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
})

export default FloatingPlayer
