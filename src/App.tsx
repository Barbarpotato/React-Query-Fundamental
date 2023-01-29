import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { HomePage } from './components/HomePage';
import { SuperheroesPage } from './components/SuperheroesPage';
import { RQSuperheroesPage } from './components/RQsuperheroesPage';
import { RQSuperheroPage } from './components/RQsuperheroPage';
import { RQparallelPage } from './components/RQparallelPage';
import { RQDynamicparallelPage } from './components/RQDynamicparallelPage';

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">

        <li><Link to={'/'}>HomePage</Link></li>
        <li><Link to={'/superheroesPage'}>Traditional Superheroes</Link></li>
        <li><Link to={'/RQsuperheroesPage'}>RQSuperheroesPage</Link></li>
        <li><Link to={'/RQparallelPage'}>RQparallelPage</Link></li>
        <li><Link to={'/RQDynamicParallelPage'}>RQparallelPage</Link></li>

        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path='/superheroesPage' element={<SuperheroesPage></SuperheroesPage>}></Route>
          <Route path='/RQsuperheroesPage' element={<RQSuperheroesPage></RQSuperheroesPage>}></Route>
          <Route path='/RQparallelPage' element={<RQparallelPage></RQparallelPage>}></Route>
          <Route path='RQDynamicParallelPage' element={<RQDynamicparallelPage heroId={[1, 3]}></RQDynamicparallelPage>}></Route>
          <Route path='/RQsuperheroPage/:heroId' element={<RQSuperheroPage></RQSuperheroPage>}></Route>

        </Routes>
      </div >
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider >
  );
}

export default App;
