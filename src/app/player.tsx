import { screenPadding } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const PlayerScreen = () => {
	const router = useRouter()

	const isPressed = useSharedValue(false)
	const offset = useSharedValue({ x: 0, y: 0 })
	const opacity = useSharedValue(1)
	const start = useSharedValue({ x: 0, y: 0 })

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: offset.value.y }],
			opacity: opacity.value,
		}
	})

	const handleSwipeDown = () => {
		'worklet'
		if (router.canGoBack()) {
			router.back()
			return
		}

		router.navigate('(tabs)')
	}

	const gesture = Gesture.Pan()
		.onBegin(() => {
			isPressed.value = true
		})
		.onUpdate((e) => {
			offset.value = {
				x: start.value.x,
				y: e.translationY + start.value.y,
			}
			opacity.value = e.translationY / 100
			console.log('translationY: ', e.translationY)
		})
		.onEnd(() => {
			start.value = {
				x: offset.value.x,
				y: offset.value.y,
			}
			runOnJS(handleSwipeDown)()
		})

	return (
		<GestureDetector gesture={gesture}>
			<Animated.View style={[styles.overlayContainer, animatedStyles]}>
				<DismissPlayerSymbol />
			</Animated.View>
		</GestureDetector>
	)
}

const DismissPlayerSymbol = () => {
	const { top } = useSafeAreaInsets()

	return (
		<View
			style={{
				position: 'absolute',
				top: top + 8,
				left: 0,
				right: 0,
				flexDirection: 'row',
				justifyContent: 'center',
			}}
		>
			<View
				style={{
					width: 80,
					height: 8,
					borderRadius: 8,
					backgroundColor: '#fff',
					opacity: 0.7,
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
		backgroundColor: '#000005',
	},
})

export default PlayerScreen
