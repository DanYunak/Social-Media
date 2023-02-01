import { PostType } from './../../../entities/Post/model/types'
import { InferActionsTypes } from '../../../redux/redux-store'
import { PhotosType, ProfileType } from './types'
import { actions } from './profile-actions'

let initialState = { //? Одноразовий об'єкт, у випадку яку в profileReducer не прийде state, то він ним і буде локально, щоб не видавало помилку
    postsData: [
        { id: 1, message: 'Hello', likes: 24 },
        { id: 2, message: 'Please visit my acc', likes: 0 },
        { id: 3, message: 'Are you OK?', likes: 5 },
    ] as PostType[],
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'PROFILE/ADD_POST':
            let newPost = {
                id: 5,
                message: action.newPostBody,
                likes: 0
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            }
        case 'PROFILE/DELETE_POST':
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id != action.postId) //? ті айдішніки постів які не дорівннють postId в action creator проходять далі і залишаються
            }
        case 'PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'PROFILE/SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'PROFILE/SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType,
            }
        default:
            return state
    }
}

export default profileReducer