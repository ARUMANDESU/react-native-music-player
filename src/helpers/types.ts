import { Track } from 'react-native-track-player'

export type Playlist = {
	name: string
	tracks: Track[]
	coverImg: string
}

export type Artist = {
	name: string
	tracks: Track[]
}

export type TrackWithPlaylist = Track & { playlist?: string[] }
