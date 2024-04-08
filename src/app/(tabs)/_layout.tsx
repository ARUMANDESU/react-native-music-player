import { Tabs } from 'expo-router'
import React from 'react'

const TabsNavigation = () => {
	return (
		<Tabs>
			<Tabs.Screen name="favorites" options={{ headerShown: false }} />
			<Tabs.Screen name="playlists" options={{ headerShown: false }} />
			<Tabs.Screen name="(songs)" options={{ headerShown: false }} />
			<Tabs.Screen name="artists" options={{ headerShown: false }} />
		</Tabs>
	)
}

export default TabsNavigation
