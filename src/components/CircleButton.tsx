import { colors } from '@/constants/tokens'
import { FontAwesome6 } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableHighlight, TouchableHighlightProps } from 'react-native'

export type CircleButtonProps = {
	iconName: string
	size: number
	onPress: () => void
	style?: TouchableHighlightProps['style']
}

const CircleButton = ({ iconName, size, onPress, style }: CircleButtonProps) => {
	return (
		<TouchableHighlight
			onPress={onPress}
			style={[style, { ...styles.buttonContainer, width: size + 7, height: size + 7 }]}
		>
			<FontAwesome6 name={iconName} size={size} color={colors.icon} />
		</TouchableHighlight>
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
