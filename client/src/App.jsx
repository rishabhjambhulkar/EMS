import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

<<<<<<< Updated upstream
export default function App() {
=======
import { useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuthenticated);
>>>>>>> Stashed changes
  return (
    <BrowserRouter>
      {/* header */}
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
<<<<<<< Updated upstream
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
=======
       
       
        {/* <Route path="/employee" element={<EmployeeManagementApp />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}

        <Route path='/sign-in' element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />}>
          <Route path='/profile' element={<Profile setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/employee" element={<EmployeeManagementApp />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
>>>>>>> Stashed changes
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
