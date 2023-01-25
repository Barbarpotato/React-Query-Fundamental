import { Routes, Route } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import { HomePage } from './components/HomePage';
import { SuperheroesPage } from './components/SuperheroesPage';
import { RQSuperheroesPage } from './components/RQsuperheroesPage';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <li><a href='/'>Home</a></li>
        <li><a href='/superheroesPage'>Superheroes</a></li>
        <li><a href='/RQsuperheroesPage'>RQ Superheroes</a></li>
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path='/superheroesPage' element={<SuperheroesPage></SuperheroesPage>}></Route>
          <Route path='/RQsuperheroesPage' element={<RQSuperheroesPage></RQSuperheroesPage>}></Route>
        </Routes>
      </div >
    </QueryClientProvider>
  );
}

export default App;
