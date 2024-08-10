import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import { useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import EmployeeManagementApp from './pages/'; // Assuming you have these imports
import EmployeeDetails from './pages/EmployeeDetails'; // Assuming you have these imports

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuthenticated);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />}>
          <Route path='/profile' element={<Profile setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/employee' element={<EmployeeManagementApp />} />
          <Route path='/employee/:id' element={<EmployeeDetails />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
