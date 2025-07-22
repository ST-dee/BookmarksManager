import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Login from './Pages/Login'
import SignUp from './Pages/Signup';
import MyBookmarks from './Pages/MyBookmarks';
import AddBookmark from './Pages/AddBookmark';
import AuthProvider from './components/AuthContext';
import Logout from './components/Logout';
const App = () => {
    return (
        <AuthProvider>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/mybookmarks' element={<MyBookmarks />} />
                    <Route path='/addbookmark' element={<AddBookmark />} />
                    <Route path='/logout' element={<Logout />} />

                </Routes>
            </Layout>
        </AuthProvider>
    );
}

export default App;