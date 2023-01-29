import usersReducer, { InitialStateType, actions } from '../users-reducer'

let state: InitialStateType
 

beforeEach(() => {
    state = {
        users: [
            {
                id: 1, name: 'Dan', status: '1', followed: false,
                photos: { small: null, large: null },
            },
            {
                id: 2, name: 'Alexander', status: '2', followed: true,
                photos: { small: null, large: null },
            }
        ],
        pageSize: 10,
        totalUsersCount: 50,
        currentPage: 3000,
        isFetching: false,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null as null | boolean
        }
    }
})


test('follow success', () => {

    const action = actions.followSuccess(1)

    const newState = usersReducer(state, action)

    expect(newState.users[0].followed).toBeTruthy()
    expect(newState.users[1].followed).toBeTruthy()

})

test('unfollow success', () => {

    const newState = usersReducer(state, actions.unfollowSuccess(2))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeFalsy()
})

test('setCurrentPage change value of currentPage', () => {

    const newState = usersReducer(state, actions.setCurrentPage(5))

    expect(newState.currentPage).toBe(5)

})