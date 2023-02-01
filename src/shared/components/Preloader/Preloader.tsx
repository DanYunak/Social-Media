const preloader = require('../../../shared/assets/preloader.svg')

export const Preloader = () => {
    return (
        <div className='preloader__img'>
            <img src={preloader} />
        </div>
    )
}