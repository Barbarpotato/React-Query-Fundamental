import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { superheroesObject } from './SuperheroesPage'

const fectSuperHeroes = (): Promise<any> => {
    return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperheroesPage = () => {

    const { isLoading, isError, data, isFetching } = useQuery('superheroes', fectSuperHeroes,
        {
            cacheTime: 120000,
            staleTime: 20000
        }
    )

    console.log("isloading", isLoading, "isfetching", isFetching)

    if (isLoading) {
        return (
            <>Loading data...</>
        )
    }

    return (
        <div>
            <h2>React Query Superheroes page</h2>
            {isError ? <p>There is Something Wrong!</p>
                :
                data?.data.map((item: superheroesObject, idx: number) => (
                    <div key={idx}>
                        <p>{item.name}</p>
                    </div>
                ))}
        </div>
    )
}