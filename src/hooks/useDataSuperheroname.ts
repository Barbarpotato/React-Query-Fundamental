import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'

export const useDataSuperheroname = (onError: (response: any) => void,
    onSuccess: (response: any) => void, heroId: any) => {
    const queryClient: any = useQueryClient()
    return useQuery(['superhero-name', heroId], () => {
        return axios.get(`http://localhost:4000/superheroes/${heroId}`)
    }, {
        onError,
        onSuccess,
        select: (data) => {
            const object = data.data
            return object
        },
        initialData: (): any => {
            const superheroDetail = queryClient.getQueryData('superheroes-name')?.data?.find((data: any) => {
                return data.id === parseInt(heroId)
            })
            if (superheroDetail) {
                return { data: superheroDetail }
            } else {
                return undefined
            }
        }
    })
}
