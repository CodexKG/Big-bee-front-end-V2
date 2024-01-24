import { Route, Routes } from 'react-router-dom';
import Main from 'routes/Main/Main';
import './scss/app.scss';
import MainPage from 'routes/MainPage/MainPage';
import { Catalog } from 'routes';
import { Favorites } from 'routes';
import { AuthRegister } from 'Components';

function App() {

  return (
    <Routes>
      <Route path='/register' element={<AuthRegister />} />
      <Route path='/' element={<Main />}>
        <Route index element={<MainPage />} />
        <Route path='/catalog/:id' element={<Catalog />} />
        <Route path='/favorites' element={<Favorites />} />
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