import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { 
  LoginForm,
  MainView,
} from './components';

function App() {
  return (
    <div className="App">
       <Routes>  
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<MainView />} />
       </Routes>
    </div>
  );
}

export default App;
