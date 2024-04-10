import { colors } from '@/constants/tokens'
import { utilsStyles } from '@/styles'
import React from 'react'
import { AwesomeSliderProps, Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'
import TrackPlayer, { useProgress } from 'react-native-track-player'

export type PlayerProgressBarProps = Omit<
	AwesomeSliderProps,
	'progress' | 'minimumValue' | 'maximumValue'
>

const PlayerProgressBar = ({ style, ...sliderProps }: PlayerProgressBarProps) => {
	const { duration, position } = useProgress(250)

	const isSliding = useSharedValue(false)
	const progress = useSharedValue(0)
	const min = useSharedValue(0)
	const max = useSharedValue(1)

	if (!isSliding.value) {
		progress.value = duration > 0 ? position / duration : 0
	}

	return (
		<Slider
			progress={progress}
			minimumValue={min}
			maximumValue={max}
			containerStyle={utilsStyles.slider}
			thumbWidth={0}
			theme={{
				minimumTrackTintColor: colors.minimumTrackTintColor,
				maximumTrackTintColor: colors.maximumTrackTintColor,
			}}
			onSlidingStart={() => (isSliding.value = true)}
			style={style}
            onValueChange={async (value) => {
                await TrackPlayer.seekTo(value * duration)
            }}
            onSlidingComplete={async (value) => {
                // if the user is not sliding, we should not update the position
                if (!isSliding.value) return

                isSliding.value = false

                await TrackPlayer.seekTo(value * duration)
            }}
			{...sliderProps}
		/>
	)
}

export default PlayerProgressBar
