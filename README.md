# Why React Query?
According to <a href="https://react-query-v3.tanstack.com/overview">React Query Documentation</a>, React applications do not come with an opinionated way of fetching or updating data from your components so developers end up building their own ways of fetching data. This usually means cobbling together component-based state and effect using React hooks, or using more general purpose state management libraries to store and provide asynchronous data throughout their apps. with React Query, You will remove <strong>Many</strong> lines of complicated and misunderstood code from your application and replace with just a handful of lines of React Query logic, Make your application more maintainable and easier to build new features without worrying about wiring up new server state data sources and Have a direct impact on your end-users by making your application feel faster and more responsive than ever before.

# Setup the React Query
First install the peckage:
```
npm install react-query
```

In your App.tsx file you can configure the file like this:
```
 import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
 
 const queryClient = new QueryClient()
 
 export default function App() {
   return (
     <QueryClientProvider client={queryClient}>
       <Example />
     </QueryClientProvider>
   )
 }
```

# React Query Dev Tools
This module will help you visualize all of the inner working of React Query. To start using it, import the necessary module in app.tsx file:
```
import { ReactQueryDevtools } from 'react-query/devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      ...
      ...
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}
```

# useQuery Hook
### Introduction
the hook we are going to use for data fetching is a <strong>useQuery()</strong>. this hooks requires atleast two arguments:
1. Unique key to identified this query.
2. A function that return a promise.
for the example:
```
import axios from 'axios'
import { useQuery } from 'react-query'

export const RQSuperheroesPage = () => {

    useQuery('superheroes', () => {
        return axios.get('http://localhost:4000/superheroes')
    })

    return (
        <>RQ superheroes page</>
    )
}
```

### Handling the query results return
You can de-structuring useQuery hooks variables values:
```
    const { isLoading, data } = useQuery('superheroes', () => {
        return axios.get('http://localhost:4000/superheroes')
    })
``` 
with this 3 lines of code, we can handling the state hook(refers to loading state) and useEffect hooks(refers to data fecthing before rendering the component), in a traditional way. What a powerful library!

### Extracted the fetcher function
In the second argument of useQuery hooks we can create the individual function, it is used to create more readable code compared to make the anonymous function in the second argument of useQuery.<br>
For the example:
```
const fectSuperHeroes = (): Promise<any> => {
    return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperheroesPage = () => {

    const { isLoading, data } = useQuery('superheroes', fectSuperHeroes)
    ...
    ...
```

### Handling Query Error
You can added more flags in useQuery using error and isError:
```
const { isLoading, data, isError, error} = useQuery('superheroes', fectSuperHeroes)    
```

# Query Caching
the React Query library provides the cache data when we fetched some data. By default, every query result is cached for 5 minutes. React Query can also knows the server data might have updated and the cached might not contained the latest React Query will use the caching data that not been changed and rendering it to the UI, while React Query trying to re-fetching to check whether the data has changed or not. if some data has been changed, then the new data will update the caching data to the UI. We can use the boolean flag in useQuery by using: <strong>isFetching</strong> to check the data is fetching or not.
<br/><br/>
We can also manage the cache time in React Query by setting up the third argument in useQuery. The third argument will be type of Object, inside the object create the cacheTime property and added some integer value, value will count as a miliseconds. After the cache time was expired, the data that has been fetched will be turned to be a garbage collected:
```
const { isLoading, isError, data, isFetching } = useQuery('superheroes', fectSuperHeroes,
        { cacheTime: 5000 }
    )
```

# Stale Time
You can reduce your network request in your application by using the staleTime Property in third argument of useQuery. By using this property, You can set how long for some data to be refetching again. So whenever we trying to rendering some component, it wont be refetching the same data, instead using the cache data until the staleTime was passed. the default value of this property is 0 miliseconds:
```
 const { isLoading, isError, data } = useQuery('superheroes', fectSuperHeroes,
        {
            cacheTime: 120000,
            staleTime: 30000
        }
    )
```

# Refetch Default
there are some properties we can try to play around this React Query library, we can squeeze the third argument properties of useQuery to playing around:
### refetchOnMount
the first property is refetchOnMount, this property is used to decide to always fetching the data whenever the component on mount or not. this property was a boolean type. if the value was true, then every component that on mount will re-fetching all the data, otherwise it wont refetch when ever the component on mount. For Example:
```
 const { isLoading, isError, data, isFetching } = useQuery('superheroes', fectSuperHeroes,
        {
            refetchOnMount: true,
        }
    )
```
### refetchOnWindowFocus
refetchOnWindowFocus is used to automatically update the data in the UI that has been fetched previous time when the data has changed in the server side without re-rendering the component. the refetchOnWindowFocus was a boolean type. the default value of this property was false. For Example:
```
const { isLoading, isError, data, isFetching } = useQuery('superheroes', fectSuperHeroes,
        {
            refetchOnWindowFocus: true,
        }
    )
```

# Polling
Polling was basically refers to the process of fetching data at regular intervals. for example if we have some component that shows the real time price of different stocks, we might want to fetch data every second to update the User Interface. By using the polling technique in React Query, we can squeeze the third argument of useQuery again by using the <strong>refetchInterval</strong>. this property have default value false. we can set this property to be a integer value (miliseconds) which will result in a continous refetch of the query at that interval. Note: automatic refecthing data will be paused if the window loses focus, it means that whenever we are not on our application sight, the refetching data will be paused. If we want to keep refecthing the data even the window loses focus, we can added new propertiy name <strong>refetchIntervalInBackground</strong> this property was a boolean type.
```
const { isLoading, isError, data, isFetching } = useQuery('superheroes', fectSuperHeroes,
        {
            refetchInterval: 1000,
            refetchIntervalInBackground: true
        }
    )
```

# useQuery on Click
We might have to fetch the data based on a user event and not when the component is mount. 
1. The first step we are going to do is to squeeze the third argument od useQuery using enable: false. By default, enable was set to true. the data fecthing will be disabled.
2. second step is to create fetching data on a click of a button. first thing is build button tag HTML and prepared the onClick Function, then used <strong>refetch</strong> in return of useQuery to manually trigger the query. then passed the refetch to the onClick Handler. Note: refetch is a function
```
const { isLoading, isError, data, isFetching, refetch } = useQuery('superheroes', fectSuperHeroes,
        {
            enable: false
        }
    )

 return (
        <div>
            <button onClick={() => refetch()}>Fetch Heroes</button>
            <h2>React Query Superheroes page</h2>
            {
                isError ? <p>There is Something Wrong!</p>
                    :
                    data?.data.map((item: superheroesObject, idx: number) => (
                        <div key={idx}>
                            <p>{item.name}</p>
                        </div>
                    ))
            }
        </div >
```

# Callback with useQuery
Sometimes when we are dealing with the data fetching, we might want to perform a side effect when the query completes, for the example like opening the modal, navigating to a different route or even displaying the toast notifications. Reacy Query let us specify success and error callback as configurations to the useQuery hook.
First, create success and error function. then added this function in the onSucess and onError property in the third argument of useQuery hook.
```
    ...
    ...
    const [refetchInterval, setRefecthInterval] = useState<number>(3000)

    const onSuccess = (response: any): void => {
        if (response.data.length == 4) setRefecthInterval(0)
        else {
            setRefecthInterval(3000)
        }
    }

     const onError = (response: any): void => {
        if (response.name === 'AxiosError') {
            setRefecthInterval(0)
        }   
    }

    const { isLoading, isError, data, isFetching } = useQuery('superheroes', fectSuperHeroes,
        {
            onError,
            onSuccess,
            refetchInterval,
            refetchOnWindowFocus: true
        }
    )
    ...
    ...
```

# Data Transformation
You can specified the form of the data by transforming them. You can change the form of the data by the API that we consumend and then changing it to a specific way that developer needs. To achieve this, we can specify the useQuery third argument configuration called <strong>select</strong>. Select is a function that automatically recevies the API data as an argument.
```
    const { isLoading, isError, data, isFetching } = useQuery('superheroes', fectSuperHeroes,
        {
            onError,
            onSuccess,
            refetchInterval,
            refetchOnWindowFocus: true,
            select: (data) => {
                const superherosName = data.data.map((item: superheroesObject) => item.name)
                return superherosName
            }
        }
    )
    ...
    ...
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
```
# Custom Query Hook
as far we know about useQuery hooks, it have 3 argument, first is the key, second is a fetcher function, and the third argument is a configuration to tweak its behavior. this pattern is great for building the samll applications, but it not fit for the larger app. in larger app, we might want to re-use the data fetching, for example: the same query might be required in the other component that we created.
1. Create new file. inside this file, create the useQuery functionality:
```
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
            const superherosName = data.data.map((item: superheroesObject) => item.name)
            return superherosName
        }
    })
}

```
2. Use the custom hook we made in step 1 to the component:
```
    ...
    ...
    const { isLoading, isError, data, isFetching } = useDataSuperheroesname(onError, onSuccess)
```

# Parallel Queries
Sometimes a single component needs to call multiple API's to fetch the necessary data. to implement it in React Query we can just use multiple useQuery in a single component. but when we destructure the values return, we cannot use the value because we have the same variable conflict. to solve this, we can use appropriate alias and make us of it.
```
import { useQuery, useQueryClient } from 'react-query'
    ...
    ...
    ...
    const { data: superheroes, isLoading: superheroesLoading } = useDataSuperheroesname(onError, onSuccess)
    const { data: friends, isLoading: friendsLoading } = useQuery('friends-name', fetchFriends)
    ...
    ...
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
```
# Dynamic Parallel Queries
If the number of queries you need to execute is changing from render to render, you cannot use manual querying like in a above, since that would violate the rules of hooks. Instead, React Query provides a useQueries hook, which you can use to dynamically execute as many queries in parallel as you'd like.
```
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
    ...
    ...
```

# Dependent Queries
This Queries was related to the Parallel Queries. Where some specific Query depend on one other Query to finish, before they can execute the other specific Query. For Example:
```
    ...
    ...
    // Get the user
    const { data: user } = useQuery(['user', email], getUserByEmail)
    
    const userId = user?.id
    
    // Then get the user's projects
    const { isIdle, data: projects } = useQuery(
    ['projects', userId],
    getProjectsByUser,
    {
        // The query will not execute until the userId exists
        enabled: !!userId,
    }
    )
    // isIdle will be `true` until `enabled` is true and the query begins to fetch.
    // It will then go to the `isLoading` stage and hopefully the `isSuccess` stage :)
    ...
    ...
```
In this scenario, we want the projects query fired after the userId value has been retrieved from the users query. to implement it, we use the enabled property in the projects query third argument and setup the value to be -> !!userId (double nagation converts the value to a boolean. true if the value is not undefined anymore otherwise it will be false). 

# Initial Query Data
This feature improves the data viewing experiences for a user. for the use case of this course, if we want to access the superhero detail, from the superheroes component, it will always fetching the specific superhero data from the id itself, which is make the user going to see the loading component, because the query will trying to fetch some specific detail of superhero.<br/>
But what if we utilize the cache data of superheroes query from the superheroes component to get used in the superhero detail component? The query is not set a loading state, because we used the initial data from superheroes cache query, which are make users not waiting the data to delivered to them anymore. Only a background refetch is initiated and once details are retrieved they will overwrite any initial data we might have set. In our study case, we will modify our custom hook that we made before and change it like this:
```
export const useDataSuperheroname = (onError: (response: any) => void,
    onSuccess: (response: any) => void, heroId: any) => {
    const queryClient: any = useQueryClient()
    return useQuery(['superhero-name', heroId], () => {
        return axios.get(`http://localhost:4000/superheroes/${heroId}`)
    }, {
        ...
        ...
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
```
The thing you should notice is, if we want to access the caching data from specific query, you need to import a hook called <strong>useQueryClient</strong>. then, create the instance of it. in query configuration, add initialData property which is a function type. If we want to access the caching data from some queries. just calling the instanciate useQueryClient and call getQueryData method. You need to fill the query key of what cache we want to get in getQueryData argument. then return what do you want to return from it.

# Paginated Queries
To implement data fecthing in Pagination, We simply using the basic useQuery hook. Hoewever, React Query treated all the data like a brand new query each time user move to another page index. To handle this performance, we can use the property named <strong>keepPreviousData</strong>.The data from the last successful fetch will available, while new data is being requested, even though the query key has changed and when the new data arrives, the previous data is seamlessly swapped to show the new data. with this thing, the loading state of useQuery will be dissapear.
```
    ...
    ...
    const [pageIndex, setPageIndex] = useState<number>(1)

    const { data, isLoading } = useQuery(['colors', pageIndex], () => fetchColorbyQuery(pageIndex), {
        keepPreviousData: true,
        select: (data) => {
            const getObject = data.data
            return getObject
        }
    })
    ...
    ...
    return (
        <div>
            <h1>Dependent Queries</h1>
            {isLoading ? <>Loading...</> : data?.map((item: colorType) => (
                <div>
                    <p>{item.id}</p>
                    <p>{item.type}</p>
                </div>
            ))}
            <button onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 1}>Prev Page</button>
            <button onClick={() => setPageIndex(pageIndex + 1)} disabled={pageIndex === 4}>Next Page</button>
        </div>
    )
```
# Infinite Queries
Rendering lists that can additively "load more" data onto an existing set of data or "infinite scroll" is also a very common UI pattern. React Query supports a useful version of useQuery called useInfiniteQuery for querying these types of lists.<br/>
In our case, when using useInfiniteQuery, you'll notice a few things are different:
- data is now an object containing infinite query data
- data.pages array containing the fetched pages
- data.pageParams array containing the page params used to fetch the pages
- The <strong>fetchNextPage</strong> and <strong>fetchPreviousPage</strong> functions are now available
- The <strong>getNextPageParam</strong> and <strong>getPreviousPageParam</strong> options are available for both determining if there is more data to load and the information to fetch it. This information is supplied as an additional parameter in the query function (which can optionally be overridden when calling the fetchNextPage or fetchPreviousPage functions)
- A <strong>hasNextPage</strong> boolean is now available and is true if getNextPageParam returns a value other than undefined
- A <strong>hasPreviousPage</strong> boolean is now available and is true if getPreviousPageParam returns a value other than undefined
- The <strong>isFetchingNextPage</strong> and <strong>isFetchingPreviousPage</strong> booleans are now available to distinguish between a background refresh state and a loading more state
```
const fetchColors = (pageParam: number) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

export const RQInfinitePage = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery('colorsInfitnite',
        ({ pageParam = 1 }) => fetchColors(pageParam),
        {
            getNextPageParam: (_lastpage, pages) => {
                if (pages.length < 4) {
                    return pages.length + 1
                } else {
                    return undefined
                }
            }
        })

    return (
        <div>
            {data?.pages.map((group: any, idx: number) => (
                <React.Fragment key={idx}>
                    {group.data.map((color: colorType, idx: number) => (
                        <p key={idx}>{color.type}</p>
                    ))}
                </React.Fragment>
            ))}
            <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                Load more...
            </button>
        </div>
    )
}
```
# Mutations
Mutation is used to Posting & Updating some data from the front end client user to the backend application so the data that has been written from the user can be save in the backend layer logic. to implementing it, first we need to import  useMutations from the React-Query itself. For our case, we will creating the custom hook for post data using useMutation:
```
type postSuperheroType = {
    name: string,
    alterEgo: string
}

const postSuperhero = (superhero: postSuperheroType): Promise<any> => {
    return axios.post('http://localhost:4000/superheroes', superhero)
}

export const AddDataSuperheroname = () => {
    return useMutation(postSuperhero)
}
```
In the component file, we can use the custom hook we made above and configuring the code like: 
```
export const RQSuperheroesPage = () => {

    const [name, setName] = useState<string>('')
    const [alterEgo, setAlterEgo] = useState<string>('')
    ...
    ...
    const { isLoading, isError, data, refetch } = useDataSuperheroesname(onError, onSuccess)
    const { mutate: addHero, isSuccess } = AddDataSuperheroname()

    const handleAddSuperhero = (): void => {
        const dataPost = { name, alterEgo }
        addHero(dataPost)
        refetch()
    }
    if (isSuccess) {
        refetch()
    }
     <div>
            <h2>React Query Superheroes page</h2>
            <input onChange={(e) => setName(e.target.value)} value={name}></input><br />
            <input onChange={(e) => setAlterEgo(e.target.value)} value={alterEgo} ></input><br />
            <button onClick={handleAddSuperhero}> Post</button>
            ...
            ...
```
- useMutation unlike the useQuery, it does not necessarily need the query key. 
- The First argument is the post function that return promise, which will post the data to the backend.
- There is one important value that useMutation return, which is <strong>mutate</strong>. mutate is a function that we have to call to make the post request. where the argument of this function is the data that we are going to send to the backend layer.

### Query Invalidation
In above example, we using isSuccess return to refetching superheroes query again, it's because as soon as we posting a data using useMutation, the superheroes query data is out of date. There is another way to implement it. It called <strong>Query Invalidation</strong>. We are going to use the useQueryClient instance and access the invalidateQueries method in useMutate second argument (2nd argument of useMutate is a object type). This method required 1 argument which is the query key name that we are going to refetch again.
```
export const AddDataSuperheroname = () => {
    const queryClient = useQueryClient()
    return useMutation(postSuperhero, {
        onSuccess: () => {
            queryClient.invalidateQueries('superheroes-name')
        }
    })
}
```