import { Route, Routes } from 'react-router-dom';
import Main from 'routes/Main/Main';
import './scss/app.scss';
import MainPage from 'routes/MainPage/MainPage';
import { Login, OrderPlacing, SignUp } from 'Components';
import { Catalog, Favorites, Cart } from 'routes';
import SinglePageProduct from 'routes/SinglePageProduct/SinglePageProduct';
import Protected from 'routes/Protected/Protected';

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/' element={<Main />}>
        <Route index element={<MainPage />} />
        <Route path='/catalog/:id' element={<Catalog />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/orderplasing' element={<Protected fallback={<div></div>}><OrderPlacing /></Protected>} />
        <Route path='/product/:id' element={<SinglePageProduct />} />
        <Route path='/cart' element={<Cart />} />
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