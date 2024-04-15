import { colors } from '@/constants/tokens'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'
import { TouchableOpacity, View, ViewStyle } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'

type PlayerButtonProps = {
	style?: ViewStyle
	iconSize?: number
}

export const PlayPauseButton = ({ iconSize, style }: PlayerButtonProps) => {
	const { playing } = useIsPlaying()

	return (
		<View style={[{ height: iconSize }, style]}>
			<TouchableOpacity
				activeOpacity={0.85}
				onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
			>
				<FontAwesome name={playing ? 'pause' : 'play'} size={iconSize} color={colors.icon} />
			</TouchableOpacity>
		</View>
	)
}

export const FavoriteButton = ({
	isFavorite,
	onPress,
}: {
	isFavorite: boolean
	onPress: () => void
}) => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={() => {
				onPress()
			}}
		>
			<FontAwesome
				name={isFavorite ? 'heart' : 'heart-o'}
				size={20}
				color={isFavorite ? colors.primary : colors.icon}
				style={{ marginHorizontal: 14 }}
				onPress={onPress}
			/>
		</TouchableOpacity>
	)
}

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={() => {
				TrackPlayer.skipToNext()
			}}
		>
			<FontAwesome6 name="forward" size={iconSize} color={colors.icon} />
		</TouchableOpacity>
	)
}

export const SkipToPrevButton = ({ iconSize = 30 }: PlayerButtonProps) => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={() => {
				TrackPlayer.skipToPrevious()
			}}
		>
			<FontAwesome6 name="backward" size={iconSize} color={colors.icon} />
		</TouchableOpacity>
	)
}
