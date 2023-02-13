import { Button, Space } from 'antd'
import { FC, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getLanguage } from '../../../app/model/app-selectors'
import { eng } from '../../../shared/constants/languageConsts'
import './Paginator.css'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    portionSize: number
    onPageChanged: (pageNumber: number) => void
}

export const Paginator: FC<PropsType> = memo(({ totalUsersCount, pageSize, currentPage, onPageChanged, portionSize }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize) //* Округляння в більшу сторону, щоб показувало повну кількість номер людей в пошуку, бо якщо цього не зробити і буде виходити десяткове число - остання сторінка показувати не буде

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)

    let [portionNumber, setPortionNumber] = useState(1)

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    const language = useSelector(getLanguage)

    return (
        <>
            {window.innerWidth >= 635
                ? <div className='search__num'>
                    {portionNumber > 1 &&
                        <Space wrap>
                            <Button type='primary' className='prev__btn' onClick={() => { setPortionNumber(portionNumber - 1) }}
                                size={window.innerWidth >= 698 ? 'large' : 'middle'}>{language === eng ? 'Prev' : 'Назад'}</Button>
                        </Space>
                    }
                    <div className='pages__num'>
                        {pages
                            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                            .map(p => {
                                return (
                                    // @ts-ignore
                                    <span className={currentPage === p && 'selectedPage'} onClick={() => { onPageChanged(p) }}>{p}</span>
                                )
                            })}
                    </div>
                    {portionCount > portionNumber &&
                        <Space wrap>
                            <Button type='primary' className='next__btn' onClick={() => { setPortionNumber(portionNumber + 1) }}
                                size={window.innerWidth >= 698 ? 'large' : 'middle'}>{language === eng ? 'Next' : 'Далі'}</Button>
                        </Space>
                    }
                </div>
                
                : <div className='search__num_mobile'>
                    <div className='pages__num'>
                        {pages
                            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                            .map(p => {
                                return (
                                    // @ts-ignore
                                    <span className={currentPage === p && 'selectedPage'} onClick={() => { onPageChanged(p) }}>{p}</span>
                                )
                            })}
                    </div>
                    <div className='action__buttons_mobile'>
                        {portionNumber > 1 &&
                            <Space wrap>
                                <Button type='primary' className='prev__btn' onClick={() => { setPortionNumber(portionNumber - 1) }}
                                    size={window.innerWidth >= 698 ? 'large' : 'middle'}>{language === eng ? 'Prev' : 'Назад'}</Button>
                            </Space>
                        }
                        {portionCount > portionNumber &&
                            <Space wrap>
                                <Button type='primary' className='next__btn' onClick={() => { setPortionNumber(portionNumber + 1) }}
                                    size={window.innerWidth >= 698 ? 'large' : 'middle'}>{language === eng ? 'Next' : 'Далі'}</Button>
                            </Space>
                        }
                    </div>
                </div>
            }
        </>
    )
})

export default Paginator