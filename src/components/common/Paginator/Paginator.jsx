import { useState } from 'react'
import './Paginator.css'
import { Button, Pagination, Space } from 'antd'

const Paginator = ({ totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize) //* Округляння в більшу сторону, щоб показувало повну кількість номер людей в пошуку, бо якщо цього не зробити і буде виходити десяткове число - остання сторінка показувати не буде

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)

    let [portionNumber, setPortionNumber] = useState(1)

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize


    return (
        <div className='search__num'>

            {/* <Pagination
                total={totalUsersCount}
                defaultPageSize={20}
                defaultCurrent={1}
            /> */}

            {portionNumber > 1 &&
                <Space wrap>
                    <Button type='primary' onClick={() => { setPortionNumber(portionNumber - 1) }}
                        size='large'>Prev</Button>
                </Space>
            }
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return (
                        <span className={currentPage === p && 'selectedPage'} onClick={() => { onPageChanged(p) }}>{p}</span>
                    )
                })}
            {portionCount > portionNumber &&
                <Space wrap>
                    <Button type='primary' onClick={() => { setPortionNumber(portionNumber + 1) }}
                        size='large'>Next</Button>
                </Space>
            }
        </div>
    )
}

export default Paginator