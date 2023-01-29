import { superheroesObject } from '../components/SuperheroesPage'
import axios from 'axios'
import { useQuery } from 'react-query'

const fectSuperHeroes = (): Promise<any> => {
    return axios.get('http://localhost:4000/superheroes')
}

export const useDataSuperheroesname = (onError: (response: any) => void,
    onSuccess: (response: any) => void) => {
    return useQuery('superheroes-name', fectSuperHeroes, {
        onError,
        onSuccess,
        refetchOnWindowFocus: true,
        select: (data) => {
            const superherosName = data.data.map((item: superheroesObject) => ({ name: item.name, id: item.id }))
            return superherosName
        }
    })
}
