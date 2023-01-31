import { useInfiniteQuery } from "react-query"
import axios from "axios"
import React from "react"

interface colorType {
    id: number
    type: string
}

const fetchColors = (pageParam: number) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

export const RQInfinitePage = () => {

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery('colorsInfitnite',
        ({ pageParam = 1 }) => fetchColors(pageParam),
        {
            getNextPageParam: (_lastpage, pages) => {
                if (pages.length < 4) {
                    return pages.length + 1
                } else {
                    return undefined
                }
            }
        })

    return (
        <div>
            {data?.pages.map((group: any, idx: number) => (
                <React.Fragment key={idx}>
                    {group.data.map((color: colorType, idx: number) => (
                        <p key={idx}>{color.type}</p>
                    ))}
                </React.Fragment>
            ))}
            <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                Load more...
            </button>
        </div>
    )
}