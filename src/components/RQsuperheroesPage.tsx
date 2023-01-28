import { useDataSuperheroesname } from '../hooks/useDataSuperherosname'

export const RQSuperheroesPage = () => {

    const onSuccess = (response: any): void => {
        console.log('success fetched data!', response)
    }

    const onError = (response: any): void => {
        console.log('failed fetched data!', response)
    }

    const { isLoading, isError, data, isFetching } = useDataSuperheroesname(onError, onSuccess)

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
                data.map((name: string, idx: number) => (
                    <div key={idx}>
                        <p>{name}</p>
                    </div>
                ))}
        </div>
    )
}