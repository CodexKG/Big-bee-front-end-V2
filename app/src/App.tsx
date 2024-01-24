import { Route, Routes } from 'react-router-dom';
import Main from 'routes/Main/Main';
import './scss/app.scss';
import MainPage from 'routes/MainPage/MainPage';
import { Catalog } from 'routes';
import {Favorites} from 'routes';
import { AuthRegister } from 'Components';
import { Catalog } from 'routes';

function App() {

  return (
    <Routes>

      <Route path='/register' element={<AuthRegister />} />
      <Route path='/' element={<Protected><Main /></Protected>}>
        <Route index element={<Protected> <MainPage /></Protected>} />
        <Route path='/catalog/:id' element={<Catalog />} />
        <Route path='/favorites' element={<Protected> <Favorites /></Protected>} />
      </Route>
      <Route path='*' element={<main className={'errorPage'}><p>Неверный адрес</p></main>} />
    </Routes>
  );
}

// const Authorization = ({ children }: any) => {
//   if (getCookie('access_token')) {


//     return <Navigate to='/' />
//   }

//   return children;
// }

export default App;