import { useQueries } from "react-query"
import axios from 'axios'

type DynamicProps = {
    heroId: Array<number>
}

export const RQDynamicparallelPage = ({ heroId }: DynamicProps) => {

    const queryResults = useQueries(heroId.map((id) => {
        return {
            queryKey: ['superhero-name', id],
            queryFn: () => {
                return axios.get(`http://localhost:4000/superheroes/${id}`)
            }
        }
    }))

    console.log(queryResults[1])

    return (
        <h1>Dynamic Parallel Queries</h1>
    )
}