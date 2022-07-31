import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = { loading: false, hasErrors: false, profiles: [] }

const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        getProfiles: state => {
            state.loading = true
        },
        getProfilesSuccess: (state, { payload }) => {
            state.profiles = payload
            state.loading = false
            state.hasErrors = false
        },
        getProfilesFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
        addNewProfile: (state, { payload }) => {
            state.profiles.push(payload);
        },
        deleteProfile: (state, { payload }) => {
            //console.log('delete payload: ', payload);
            state.profiles = state.profiles.filter((element) => element.id !== payload.id);
            // state.profiles.push(payload);
        }
    }
})

// 5 actions generated
export const { getProfiles, getProfilesSuccess, getProfilesFailure, addNewProfile, deleteProfile } = profilesSlice.actions

// selector
export const profilesSelector = state => state.profiles

// the reducer
export default profilesSlice.reducer

// call this function to load the profile list
export function fetchProfiles() {
    return async dispatch => {
        dispatch(getProfiles())
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            //  console.log('api response: ', response.status);
            if (response.status == 200) {
                // console.log('response data: ', response.data);
                // console.log('response data true: ', response.data.length > 0)
                if (response.data.length > 0) {
                    dispatch(getProfilesSuccess(response.data));
                } else {
                    dispatch(getProfilesFailure())
                }


            } else {
                dispatch(getProfilesFailure())
            }
            // 



        } catch (error) {
            dispatch(getProfilesFailure())

        }

    }
}