import { AppStateType } from '../redux-store'

export const getPostsData = (state: AppStateType) => {
    return state.profilePage.postsData
}