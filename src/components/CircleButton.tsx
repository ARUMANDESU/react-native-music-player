import { colors } from '@/constants/tokens'
import { FontAwesome6 } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { StyleSheet, TouchableHighlightProps, TouchableOpacity } from 'react-native'
import Animated, {
	cancelAnimation,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

export type CircleButtonProps = {
	iconName: string
	size: number
	onPress: () => void
	style?: TouchableHighlightProps['style']
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const CircleButton = ({ iconName, size, onPress, style }: CircleButtonProps) => {
	const opacity = useSharedValue(0)

	useEffect(() => {
		opacity.value = opacity.value + 1

		return () => {
			cancelAnimation(opacity)
			opacity.value = 1
		}
	}, [opacity])

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(opacity.value),
		}
	})

	return (
		<AnimatedTouchableOpacity
			onPress={onPress}
			style={[
				animatedStyle,
				style,
				{ ...styles.buttonContainer, width: size + 7, height: size + 7 },
			]}
		>
			<FontAwesome6 name={iconName} size={size} color={colors.icon} />
		</AnimatedTouchableOpacity>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		backgroundColor: colors.softBackground,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 125, // Adjust this value to change the distance from the bottom
		right: 10,
	},
})

export default CircleButton
