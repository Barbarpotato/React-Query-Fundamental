import { useDataSuperheroname } from '../hooks/useDataSuperheroname'
import { useParams } from 'react-router-dom'

export const RQSuperheroPage = () => {

    const { heroId } = useParams()

    const onSuccess = (response: any): void => {
        console.log('success fetched data!', response)
    }

    const onError = (response: any): void => {
        console.log('failed fetched data!', response)
    }

    const { isLoading, data } = useDataSuperheroname(onError, onSuccess, heroId)

    if (isLoading) {
        return (
            <>Loading data...</>
        )
    }

    return (
        <div>
            <h1>{data.id}</h1>
            <p>{data.name}</p>
            <p>{data.alterEgo}</p>
        </div>
    )
}