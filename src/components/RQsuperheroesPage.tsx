import { useDataSuperheroesname, AddDataSuperheroname } from '../hooks/useDataSuperheroesname'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { superheroesObject } from './SuperheroesPage'

export const RQSuperheroesPage = () => {

    const [name, setName] = useState<string>('')
    const [alterEgo, setAlterEgo] = useState<string>('')

    const onSuccess = (response: any): void => {
        console.log('success fetched data!', response)
    }

    const onError = (response: any): void => {
        console.log('failed fetched data!', response)
    }

    const { isLoading, isError, data } = useDataSuperheroesname(onError, onSuccess)
    const { mutate: addHero } = AddDataSuperheroname()

    const handleAddSuperhero = (): void => {
        const dataPost = { name, alterEgo }
        addHero(dataPost)
    }

    if (isLoading) {
        return (
            <>Loading data...</>
        )
    }

    return (
        <div>
            <h2>React Query Superheroes page</h2>
            <input onChange={(e) => setName(e.target.value)} value={name}></input><br />
            <input onChange={(e) => setAlterEgo(e.target.value)} value={alterEgo} ></input><br />
            <button onClick={handleAddSuperhero}> Post</button>
            {
                isError ? <p>There is Something Wrong!</p>
                    :
                    data.map((item: superheroesObject, idx: number) => (
                        <div key={idx}>
                            <Link to={`/RQsuperheroPage/${item.id}`}>{item.name}</Link>
                        </div>
                    ))
            }
        </div >
    )
}