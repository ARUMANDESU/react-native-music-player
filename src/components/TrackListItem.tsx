import { unknownTrackImageUri } from '@/constants/images'
import { colors, fontSize } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import LoaderKit from 'react-native-loader-kit'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player'

export type TrackListItemProps = {
	track: Track
	onTrackSelect: (track: Track) => void
}

const TrackListItem = ({ track, onTrackSelect }: TrackListItemProps) => {
	const { playing } = useIsPlaying()
	const router = useRouter()

	const isActiveTrack = useActiveTrack()?.url === track.url

	return (
		<TouchableHighlight
			onPress={() => {
				onTrackSelect(track)
			}}
		>
			<View style={styles.trackItemContainer}>
				<View>
					<FastImage
						source={{
							uri: track.artwork ?? unknownTrackImageUri,
							priority: FastImage.priority.normal,
						}}
						style={{
							...styles.trackArtworkImage,
							opacity: isActiveTrack ? 0.6 : 1,
						}}
					/>

					{isActiveTrack &&
						(playing ? (
							<LoaderKit
								name="LineScaleParty"
								style={styles.trackPlayingIconIndicator}
								color={colors.icon}
							/>
						) : (
							<Ionicons
								name="play"
								style={styles.trackPausedIndicator}
								size={24}
								color={colors.icon}
							/>
						))}
				</View>

				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View style={{ width: '100%' }}>
						<Text
							numberOfLines={1}
							style={{
								...styles.trackTitleText,
								color: isActiveTrack ? colors.primary : colors.text,
							}}
						>
							{track.title}
						</Text>

						{track.artist && (
							<Text numberOfLines={1} style={{ ...styles.trackArtistText }}>
								{track.artist}
							</Text>
						)}
					</View>

					<TouchableHighlight
						onPress={() => {
							router.push({ pathname: '/(modals)/addToPlaylists', params: { trackUrl: track.url } })
						}}
					>
						<Entypo name="dots-three-horizontal" size={18} color={colors.icon} />
					</TouchableHighlight>
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	trackItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 20,
	},
	trackArtworkImage: {
		borderRadius: 8,
		width: 50,
		height: 50,
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: fontSize.sm,
		fontWeight: '600',
		maxWidth: '90%',
	},
	trackArtistText: {
		...defaultStyles.text,
		fontSize: 14,
		color: colors.textMuted,
		marginTop: 4,
	},
	trackPlayingIconIndicator: {
		position: 'absolute',
		top: 15,
		left: 16,
		width: 20,
		height: 20,
	},
	trackPausedIndicator: {
		position: 'absolute',
		top: 14,
		left: 14,
	},
})

export default TrackListItem
