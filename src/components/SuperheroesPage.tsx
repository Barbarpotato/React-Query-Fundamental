import axios from 'axios'
import { useEffect, useState } from 'react'
import { setLogger } from 'react-query'

export interface superheroesObject {
    id: number,
    name: string,
    alterEgo: string
}

export const SuperheroesPage = () => {

    const [data, setData] = useState<Array<superheroesObject>>([])
    const [loading, isLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        setTimeout(() => {
            axios.get('http://localhost:4000/superheroes').then((res) => {
                setData(res.data)
                isLoading(false)
            }).catch(error => {
                setError(error.message)
                isLoading(false)
            })
        }, 500);
    }, [])

    if (loading) {
        return (
            <p>Loading data...</p>
        )
    }

    if (error) {
        return (
            <h1>{error}</h1>
        )
    }

    return (
        <div>
            <h2>Superheroes page</h2>
            {data.map((item: superheroesObject, idx: number) => (
                <div key={idx}>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    )
}