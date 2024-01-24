import { Route, Routes } from 'react-router-dom';
import Main from 'routes/Main/Main';
import './scss/app.scss';
import MainPage from 'routes/MainPage/MainPage';
<<<<<<< HEAD
import { Login, SignUp } from 'Components';
// import { getCookie } from 'helpers/cookies';


=======
import { AuthRegister } from 'Components';
import { Catalog } from 'routes';
>>>>>>> 63253e84c736aa1506876e05840563efadab3251

function App() {

  return (
    <Routes>
<<<<<<< HEAD
    
      <Route path='/' element={<Protected><Main /></Protected>}>
        <Route index element={<Protected> <MainPage /></Protected>} />

      </Route>
      <Route path='/login' element={<Login />} />

      <Route path='/signUp' element={<SignUp />} />

=======
      <Route path='/register' element={<AuthRegister />} />
      <Route path='/' element={<Main />}>
        <Route index element={<MainPage />} />
        <Route path='/catalog/:id' element={<Catalog />} />
      </Route>
>>>>>>> 63253e84c736aa1506876e05840563efadab3251
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