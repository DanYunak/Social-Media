import React, { Component, FC, memo, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import {
    createSearchParams,
    useLocation,
    useNavigate,
    useParams
} from 'react-router-dom'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { getStatus, getUserProfile, savePhoto, saveProfile, updateStatus } from '../../redux/profile-reducer'
import { getAuthorizedId, getIsAuth, getProfile, getStatusSelector } from '../../redux/profile-selectors'
import { AppStateType } from '../../redux/redux-store'
import { ProfileType } from '../../redux/types/types'
import { HeaderApp } from '../Header/Header'
import Profile from './Profile'

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => any
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

let withRouter = (ProfileContainer: any) => {
    let ComponentWithRouterProp = (props: PropsType) => {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        const match = { params: useParams() }

        return (
            <ProfileContainer
                {...props}
                router={{ location, navigate, params }}
                match={match}
            />
        )
    }
    return ComponentWithRouterProp
}

class ProfileContainer extends Component<PropsType> {

    refreshProfile() {
        const { authorizedId, getUserProfile, getStatus } = this.props
        // @ts-ignore
        let userId = this.props.match.params.userIdde
        if (!userId) {
            userId = authorizedId
            if (!userId) {
                // @ts-ignore
                this.props.history.push('/login')
            }
        }

        getUserProfile(userId)
        getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType) {
        // @ts-ignore
        if (this.props.match.params.userIdde != prevProps.match.params.userIdde) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <>
                <Profile {...this.props} profile={this.props.profile}
                    status={this.props.status} updateStatus={this.props.updateStatus}
                    // @ts-ignore
                    isOwner={!this.props.match.params.userIdde} savePhoto={this.props.savePhoto} saveProfile={this.props.saveProfile} //* Якщо userId присутній, то значить не власник сторінки і я можу змінити собі аватарку
                />
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        profile: getProfile(state),
        status: state.profilePage.status,
        authorizedId: getAuthorizedId(state),
        isAuth: getIsAuth(state)
    }
}

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter, withAuthRedirect)(ProfileContainer)