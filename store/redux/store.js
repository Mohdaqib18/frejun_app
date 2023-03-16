import { configureStore, createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
	name: "User",
	initialState: {
		userData: [],
	},

	reducers: {
		addUserData: (state, action) => {
			state.userData = [...state.userData, ...action.payload];
		},

		refreshUserData: (state, action) => {
			state.userData = [...action.payload];
		},
	},
});

export const addUserData = userDataSlice.actions.addUserData;
export const refreshUserData = userDataSlice.actions.refreshUserData;
export default userDataSlice.reducer;
export const store = configureStore({
	reducer: {
		userDataStore: userDataSlice.reducer,
	},
});
