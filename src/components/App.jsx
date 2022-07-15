import { GlobalStyle } from '../style/GlobalStyle';
import { lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppBar } from './AppBar/AppBar';
import Layout from './Layout/Layout';
import { Loader } from '../components/Loader/Loader';
import { fetchCurrentUser } from 'redux/auth/auth-options';
import { getCurrentRefresh } from 'redux/auth/auth-selectors';

const MainPage = lazy(() =>
  import('pages/MainPage' /* webpackChunkName: "main-page" */)
);
const LoginPage = lazy(() =>
  import('pages/LoginPage' /* webpackChunkName: "login-page" */)
);
const RegistrationPage = lazy(() =>
  import('pages/RegistrationPage' /* webpackChunkName: "regisrtation-page" */)
);
const DiaryPage = lazy(() =>
  import('pages/DiaryPage' /* webpackChunkName: "diary-page" */)
);
const CalculatorPage = lazy(() =>
  import('pages/CalculatorPage' /* webpackChunkName: "calculator-page" */)
);

export const App = () => {
  const isCurrentRefresh = useSelector(getCurrentRefresh);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    !isCurrentRefresh && (
      <>
        <GlobalStyle />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<AppBar />}>
              <Route index element={<MainPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="registration" element={<RegistrationPage />} />
              <Route path="diary" element={<DiaryPage />} />
              <Route path="calculator" element={<CalculatorPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </Suspense>
        <Layout />
      </>
    )
  );
};