import { useQuery } from "react-query"
import { useState } from 'react'
import axios from 'axios'

interface colorType {
    id: number
    type: string
}

const fetchColorbyQuery = (pageIndex: number) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageIndex}`)
}

export const RQPaginatedPage = () => {

    const [pageIndex, setPageIndex] = useState<number>(1)

    const { data, isLoading } = useQuery(['colors', pageIndex], () => fetchColorbyQuery(pageIndex), {
        keepPreviousData: true,
        select: (data) => {
            const getObject = data.data
            return getObject
        }
    })

    if (isLoading) {
        return (<>Loading data...</>)
    }

    return (
        <div>
            <h1>Dependent Queries</h1>
            {isLoading ? <>Loading...</> : data?.map((item: colorType) => (
                <div>
                    <p>{item.id}</p>
                    <p>{item.type}</p>
                </div>
            ))}
            <button onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 1}>Prev Page</button>
            <button onClick={() => setPageIndex(pageIndex + 1)} disabled={pageIndex === 4}>Next Page</button>
        </div>
    )
}