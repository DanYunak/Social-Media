import { AppStateType } from '../redux/redux-store'
import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

type PropsType = {
    isAuth: boolean
}

export const withAuthRedirect = (WrappedComponent: React.ComponentType<PropsType>) => {

    const RedirectComponent: FC<PropsType> = (props) => {
        let {isAuth, ...restProps} = props

        if (!isAuth) return <Navigate to='/login' />

        return <WrappedComponent { ...restProps as PropsType } />
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}