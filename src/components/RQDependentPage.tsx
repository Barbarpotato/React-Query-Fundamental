import { useQuery } from "react-query"
import axios from 'axios'

type DependentProps = {
    userId: string
}

const fetchUserbyId = (userId: string) => {
    return axios.get(`http://localhost:4000/users/${userId}`)
}

const fetchChannelbyId = (channelId: string) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`)
}

export const RQDependentPage = ({ userId }: DependentProps) => {

    const { data: user } = useQuery(['user', userId], () => fetchUserbyId(userId))

    const channelId = user?.data.channelId

    const { data: channel } = useQuery(['channel', channelId], () => fetchChannelbyId(channelId), {
        enabled: !!channelId
    })

    return (
        <h1>Dependent Queries</h1>
    )
}