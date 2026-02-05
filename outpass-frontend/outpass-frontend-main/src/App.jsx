
import Register from './components/Register'

import Login from './components/Login'

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';


import Homepage from './pages/HomePage';

import StudentOutpassPage from './pages/StudentOutpassPage';
import Adminpage from './pages/Adminpage';
import AdminLogin from './components/AdminLogin';
import OutpassDetails from './components/OutpassDetail';

import Admindashboard from './components/AdminDashboard';
import StudentPrivateRoute from './StudentPrivateRoute';
import AdminPrivateRoute from './AdminPrivateRoute';
import MessBillPage from './components/MessbillPage';



export default function App() {

  return (

<BrowserRouter>
<div className="bg-gray-900 min-h-screen"> {/* Change color here */}
<Routes>
  <Route path="/" element={
    <StudentPrivateRoute>
<Homepage />
    </StudentPrivateRoute>
    
    } /> {/**  student homepage */}
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/outpass" element={
          <StudentPrivateRoute>
            <StudentOutpassPage />
          </StudentPrivateRoute>
        } />
<Route path='/admin' element={
  <AdminPrivateRoute>

<Adminpage/>
  </AdminPrivateRoute>
  
}/>
<Route path="/admin/outpass/:rollNumber" element={
  
  <AdminPrivateRoute>
  <OutpassDetails/>
    
  </AdminPrivateRoute>
} />

<Route path="/admin/messbill" element={
  <AdminPrivateRoute>
    <MessBillPage />
  </AdminPrivateRoute>
} />
<Route path='/admin/login' element={<AdminLogin/>}/>

<Route path='/admin/dashboard' element={
  
    <AdminPrivateRoute>
<Admindashboard/>
    
  </AdminPrivateRoute>
  
}/>



</Routes>

  
</div>

</BrowserRouter>

  )
}
