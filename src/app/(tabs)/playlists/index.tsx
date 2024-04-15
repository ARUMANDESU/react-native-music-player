import { deposit, withdraw } from '@/features/slice'
import { defaultStyles } from '@/styles'
import React from 'react'
import { Button, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const PlaylistsScreen = () => {
	const dispatch = useDispatch()
	const balance = useSelector((state) => state.balance.value)
	return (
		<View style={defaultStyles.container}>
			<Text style={defaultStyles.text}></Text>
			<View style={{ marginVertical: 40 }}>
				<Button
					title="Deposit 10$"
					onPress={() => {
						dispatch(deposit(10))
					}}
				/>
				<Button
					title="Withdraw 10$"
					onPress={() => {
						dispatch(withdraw(10))
					}}
				/>
			</View>
			<View style={{ marginTop: 20 }}>
				<Text style={{ ...defaultStyles.text, fontSize: 20 }}>Current Balance: {balance}$</Text>
			</View>
		</View>
	)
}

export default PlaylistsScreen
