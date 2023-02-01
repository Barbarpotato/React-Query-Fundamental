import { superheroesObject } from '../components/SuperheroesPage'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from 'react-query'

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

type postSuperheroType = {
    name: string,
    alterEgo: string
}

const postSuperhero = (superhero: postSuperheroType): Promise<any> => {
    return axios.post('http://localhost:4000/superheroes', superhero)
}

export const AddDataSuperheroname = () => {
    const queryClient = useQueryClient()
    return useMutation(postSuperhero, {
        onMutate: async (newHeroData: postSuperheroType) => {
            await queryClient.cancelQueries()
            const prevData: any = queryClient.getQueryData('superheroes-name')
            queryClient.setQueryData('superheroes-name', (oldQueryData: any) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, { ...newHeroData, id: prevData.data.length + 1 }]
                }
            })
            return {
                prevData
            }
        },
        onError: (_error, _data, context) => {
            queryClient.setQueryData('superheroes-name', context?.prevData)
        },
        onSettled: () => {
            queryClient.invalidateQueries('superheroes-name')
        }
    })
}
