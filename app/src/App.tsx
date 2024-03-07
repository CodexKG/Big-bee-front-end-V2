import { Route, Routes } from 'react-router-dom';
import Main from 'routes/Main/Main';
import './scss/app.scss';
import MainPage from 'routes/MainPage/MainPage';
import { Login, OrderPlacing, SignUp } from 'Components';
import { Favorites, Cart } from 'routes';
// import SinglePageProduct from 'routes/SinglePageProduct/SinglePageProduct';
import Protected from 'routes/Protected/Protected';
import NoLogin from 'routes/Favorites/NoLogin/NoLogin';
import { Suspense, lazy } from 'react';
const Catalog = lazy(() => import('./routes/Catalog/Catalog'));
const SinglePageProduct = lazy(() => import('./routes/SinglePageProduct/SinglePageProduct'));

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/' element={<Main />}>
        <Route index element={<MainPage />} />
        <Route path='/catalog/:id' element={<Suspense fallback={<div>Loading...</div>}>
          <Catalog />
        </Suspense>} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/orderplasing' element={<Protected fallback={<NoLogin></NoLogin>}><OrderPlacing /></Protected>} />
        <Route path='/product/:id' element={<Suspense fallback={<div>Loading...</div>}><SinglePageProduct /></Suspense>} />
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