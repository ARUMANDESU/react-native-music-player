import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	value: 0,
}

export const balanceSlicer = createSlice({
	name: 'balance',
	initialState: initialState,
	reducers: {
		deposit: (state, action) => {
			state.value += action.payload
		},
		withdraw: (state, action) => {
			state.value -= action.payload
		},
	},
})

export const { deposit, withdraw } = balanceSlicer.actions

export default balanceSlicer.reducer
