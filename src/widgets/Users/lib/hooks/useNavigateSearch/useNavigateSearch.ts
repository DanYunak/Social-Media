import { createSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router'

export const useNavigateSearch = () => {
    const navigate = useNavigate()
    return (pathname: any, params: any) => navigate(`${pathname}?${createSearchParams(params)}`)
}