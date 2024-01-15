import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Main from 'routes/Main/Main';
import './scss/app.scss';
import MainPage from 'routes/MainPage/MainPage';
// import { getCookie } from 'helpers/cookies';



function App() {
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2ODE4NDA3LCJpYXQiOjE3MDQyMjY0MDcsImp0aSI6IjQ2MDdhNWIzNGYyMjRkY2FiMTM2NjFhZmVmODQzMTkzIiwidXNlcl9pZCI6M30.WxtH_MO1Pa1LplwBM5wb8JTYv06Svw90GIMM9_cy01Q';
  // document.cookie = `kc-access=${token}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;
  return (
    <Routes>
    
      <Route path='/' element={<Protected><Main /></Protected>}>
        <Route index element={<Protected> <MainPage /></Protected>} />

      </Route>

      <Route path='*' element={<main className={'errorPage'}><p>Неверный адрес</p></main>} />

    </Routes>
  );
}

const Protected = ({ children }: any) => {
  // let location = useLocation();
  // const accessToken = getCookie('access_token');

  // if (!accessToken) {
  //   return <Navigate to='/login' state={{ from: location }} />
  // }

  return children;
}

// const Authorization = ({ children }: any) => {
//   if (getCookie('access_token')) {


//     return <Navigate to='/' />
//   }

//   return children;
// }

export default App;