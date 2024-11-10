import { createSlice } from "@reduxjs/toolkit";

const initialState={
	isLoggedIn: typeof window !== "undefined" ? JSON.parse(localStorage.getItem('isLoggedIn') ?? 'false') : false,
	userProfile: typeof window !== "undefined" ? JSON.parse(localStorage.getItem('user')?.toString() ?? '{}') : {}
}

const userSlice=createSlice({
	name:'user',
	initialState,
	reducers:{
		userLogin:(state,actions)=>{
			state.isLoggedIn=true;
			state.userProfile=actions.payload;
			localStorage.setItem('isLoggedIn', true.toString())
			localStorage.setItem('user', JSON.stringify(actions.payload))
		},
		userLogout:(state)=>{
			state.isLoggedIn=false;
			state.userProfile={};
			localStorage.setItem('isLoggedIn', false.toString())
		},
	}
})

export const {userLogin,userLogout}=userSlice.actions
export default userSlice.reducer