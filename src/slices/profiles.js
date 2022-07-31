import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import data from '../../assets/data.json'

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
        getSearchedProfiles: (state, { payload }) => {
            console.log('payload to search: ', payload);

            state.profiles = state.profiles.filter((profile) =>
                profile.firstName.toLowerCase().includes(payload.toLowerCase()) ||
                profile.lastName.toLowerCase().includes(payload.toLowerCase()))

            // state.profiles.push(payload);
        },
        addNewProfile: (state, { payload }) => {
            state.profiles.push(payload);
        },
        editProfileAndSave: (state, { payload }) => {

            state.profiles = state.profiles.map(profile => {
                if (profile.id == payload.id) {
                    console.log('payload inside if: ', profile)
                    return { ...profile, firstName: payload.firstName, lastName: payload.lastName, phone: payload.phone, email: payload.email }
                }
                return profile;
            });


        },

    }
})

// 5 actions generated
export const { getProfiles, getProfilesSuccess, getProfilesFailure, editProfileAndSave, getSearchedProfiles, addNewProfile } = profilesSlice.actions

// selector
export const profilesSelector = state => state.profiles

// the reducer
export default profilesSlice.reducer

// call this function to load the profile list
export function fetchProfiles() {
    return async dispatch => {
        dispatch(getProfiles())
        try {
            console.log('data json: ', data);
            if (data.length > 0) {
                dispatch(getProfilesSuccess(data));
            } else {
                dispatch(getProfilesFailure())
            }




        } catch (error) {
            dispatch(getProfilesFailure())

        }

    }
}