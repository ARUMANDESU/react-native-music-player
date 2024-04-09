import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import React from 'react'
import { Text, View } from 'react-native'

const ArtistsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: { placeholder: 'Find in songs' },
	})
	return (
		<View style={defaultStyles.container}>
			<Text style={defaultStyles.text}></Text>
		</View>
	)
}

export default ArtistsScreen
