import './App.css';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/navbar/nav';
import Home from './components/home/home';
import Signup from './components/SignUp/signup';
import EditPost from './components/blogs/editBlog/editblog';
import CreatePost from './components/blogs/createBlog/createBlog';
import Login from './components/login/login';
import ProtectedRoute from './components/protectedRouter/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Login />} />

        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/createblog' element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path='/update-blog/:blogId' element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
