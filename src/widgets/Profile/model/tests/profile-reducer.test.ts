import profileReducer, { InitialStateType } from '../profile-reducer'
import { actions } from '../profile-actions'

let state: InitialStateType

beforeEach(() => {
    state = {
        postsData: [
            // @ts-ignore
            { id: 1, message: 'Hello', likes: 24 },
            // @ts-ignore
            { id: 2, message: 'Please visit my acc', likes: 0 },
            // @ts-ignore
            { id: 3, message: 'Are you OK?', likes: 5 },
        ],
        profile: {
            userId: 1,
            lookingForAJob: true,
            lookingForAJobDescription: 'React',
            fullName: 'Dan',
            contacts: {
                github: '',
                facebook: '',
                instagram: '',
                twitter: '',
                website: '',
                youtube: ''
            },
            photos: {
                small: null,
                large: null
            },
            newPostBody: '',
            aboutMe: '1',
        },
        status: ''
    }
})

test('length of postsData should be incremente ', () => {
    //* 1) test data
    let action = actions.addPost('some text')

    //* 2) action
    let newState = profileReducer(state, action)

    //* 3) exprectation
    expect(newState.postsData.length).toBe(4) //? Очікування, що після action в postData з'явиться 4 елемент
})

test('message of new post should be correct', () => {
    //* 1) test data
    let action = actions.addPost('some text')

    //* 2) action
    let newState = profileReducer(state, action)

    //* 3) exprectation
    expect(newState.postsData[3].message).toBe('some text')
})

test('after deleting length of postsData should be decremented', () => {
    let action = actions.deletePost(1)

    let newState = profileReducer(state, action)

    expect(newState.postsData.length).toBe(2)
})

test(`after deleting length of postsData shouldn't be decremented if is incorrect`, () => { //* Якщо id було передано некоректне, то пост не має видалятися
    let action = actions.deletePost(100)

    let newState = profileReducer(state, action)

    expect(newState.postsData.length).toBe(3)
})

test('setStatus change value of status', () => {
    const newState = profileReducer(state, actions.setStatus('new status'))

    expect(newState.status).toBe('new status')
})

test('savePhotoSuccess change images in photos(object)', () => {
    const action = actions.savePhotoSuccess({ small: 'smallImg', large: 'largeImg' })

    const newState = profileReducer(state, action)

    expect(newState.profile?.photos.small).toBe('smallImg')
    expect(newState.profile?.photos.large).toBe('largeImg')
})