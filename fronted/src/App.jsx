import './App.css'
import Navbar from './components/Navbar';
import { BrowserRouter } from "react-router-dom";
import AppRoute from './AppRoute';
import { AuthProvider } from './AuthContext';

function App() {
  

  return (
    < BrowserRouter>
      <AuthProvider>
      <Navbar />
      <AppRoute />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
