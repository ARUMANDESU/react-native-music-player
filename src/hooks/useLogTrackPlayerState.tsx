import { Event, useTrackPlayerEvents } from 'react-native-track-player'

const events = [Event.PlaybackError, Event.PlaybackState, Event.PlaybackActiveTrackChanged]

export const useLogTrackPlayerState = () => {
	useTrackPlayerEvents(events, async (event) => {
		if (event.type === Event.PlaybackError) {
			console.warn('An error occurred: ', event)
		}
		if (event.type === Event.PlaybackState) {
			console.log('Playback state: ', event.state)
		}
		if (event.type === Event.PlaybackActiveTrackChanged) {
			console.warn('Track changed: ', event.index)
		}
	})
}
