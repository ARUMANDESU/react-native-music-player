import { colors, screenPadding } from '@/constants/tokens'
import { addToPlaylist } from '@/features/track'
import { defaultStyles } from '@/styles'
import { useHeaderHeight } from '@react-navigation/elements'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import { Track } from 'react-native-track-player'
import { useDispatch } from 'react-redux'

const CreateNewPlaylist = () => {
	const [playlistName, setPlaylistName] = useState('')

	const router = useRouter()
	const headerHeight = useHeaderHeight()
	const dispatch = useDispatch()

	const { trackUrl } = useLocalSearchParams<{ trackUrl: Track['url'] }>()
	console.log(trackUrl)

	return (
		<View style={styles.container}>
			<TextInput
				value={playlistName}
				onChangeText={setPlaylistName}
				style={styles.textInput}
				placeholder="playlist name..."
				placeholderTextColor={colors.textMuted}
			/>
			<Button
				onPress={() => {
					dispatch(addToPlaylist({ trackURL: trackUrl, playlistName: playlistName }))
					router.push('/(tabs)/playlists')
				}}
				title="Create"
				color={colors.primary}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
	},
	textInput: {
		...defaultStyles.text,
	},
})

export default CreateNewPlaylist
