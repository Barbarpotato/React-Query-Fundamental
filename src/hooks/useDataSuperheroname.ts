import axios from 'axios'
import { useQuery } from 'react-query'

export const useDataSuperheroname = (onError: (response: any) => void,
    onSuccess: (response: any) => void, heroId: any) => {
    return useQuery(['superhero-name', heroId], () => {
        return axios.get(`http://localhost:4000/superheroes/${heroId}`)
    }, {
        onError,
        onSuccess,
        select: (data) => {
            const object = data.data
            return object
        }
    })
}
