import { AppStateType } from '../../../redux/redux-store'

export const getUserFullName = (state: AppStateType) => {
    return state.profilePage.profile?.fullName
}

export const getUserSmallPhoto = (state: AppStateType) => {
    return state.profilePage.profile?.photos.small
}