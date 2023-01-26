# Why React Query?
According to <a href="https://react-query-v3.tanstack.com/overview">Reacy Query Documentation</a>, React applications do not come with an opinionated way of fetching or updating data from your components so developers end up building their own ways of fetching data. This usually means cobbling together component-based state and effect using React hooks, or using more general purpose state management libraries to store and provide asynchronous data throughout their apps. with React Query, You will remove <strong>Many</strong> lines of complicated and misunderstood code from your application and replace with just a handful of lines of React Query logic, Make your application more maintainable and easier to build new features without worrying about wiring up new server state data sources and Have a direct impact on your end-users by making your application feel faster and more responsive than ever before.

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
the React Query library provides the cache data when we fetched some data. Not like the traditional way, when we rendering some specific component that having a fetch data function, it will always fecthing the data again and again as long as we rendering the component. Reacy Query can handle that weaknesess by using <strong>Caching</strong>. By default, every query result is cached for 5 minutes. <br/>
React Query can also knows the server data might have updated and the cached might not contained the latest data. React Query will use the caching data that not been changed and rendering it to the UI, while some other data that has been changed in the server will re-fetching by React Query and deliver it to the UI. We can use the boolean flag in useQuery by using: <strong>isFetching</strong>.
<br/>
We can also manage the cache time in React Query by setting up the third argument in useQuery. The third argument will be type of Object, inside the object create the cacheTime propery and added some integer value, value will count as a miliseconds. After the cache time was expired, the data that has been fetched will be turned to be a garbage collected:
```
const { isLoading, isError, data, isFetching } = useQuery('superheroes', fectSuperHeroes,
        { cacheTime: 5000 }
    )
```

