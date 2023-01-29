import { useDataSuperheroesname } from '../hooks/useDataSuperheroesname'
import { superheroesObject } from './SuperheroesPage'
import axios from 'axios'
import { useQuery } from 'react-query'

interface friendsObject {
    id: number,
    name: string
}

const fetchFriends = () => {
    return axios.get('http://localhost:4000/friends')
}

export const RQparallelPage = () => {

    const onSuccess = (response: any): void => {
        console.log('success fetched data!', response)
    }

    const onError = (response: any): void => {
        console.log('failed fetched data!', response)
    }

    const { data: superheroes, isLoading: superheroesLoading } = useDataSuperheroesname(onError, onSuccess)
    const { data: friends, isLoading: friendsLoading } = useQuery('friends-name', fetchFriends)

    if (friendsLoading || superheroesLoading) {
        return (
            <div>Loading data...</div>
        )
    }

    return (
        <div>
            <h1>Superheroes List</h1>
            <ol>
                {superheroes.map((item: superheroesObject) => (
                    <li>{item.name}</li>
                ))}
            </ol>
            <h1>Friends List</h1>
            <ol>
                {friends?.data.map((item: friendsObject) => (
                    <li>{item.name}</li>
                ))}
            </ol>
        </div>
    )
}