import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import EmployeeManagementApp from './pages/EmployeeList/EmployeeManagementApp';
import EmployeeDetails from './pages/EmployeeList/EmployeeDetails';

import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuthenticated);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
       
       
        <Route path="/employee" element={<EmployeeManagementApp />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />

        <Route path='/sign-in' element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />}>
          <Route path='/profile' element={<Profile setIsAuthenticated={setIsAuthenticated} />} />
          {/* <Route path="/employee" element={<EmployeeManagementApp  />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
