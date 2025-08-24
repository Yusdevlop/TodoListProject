import './App.css'
import Router from './config/Router';
import { ToastContainer} from 'react-toastify';


function App() {

  return (
      <div className='app-container'>
        <Router />
        <ToastContainer position='top-right' autoClose={3000} />
      </div>
    
  )
}

export default App
