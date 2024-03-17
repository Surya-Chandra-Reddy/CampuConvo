import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Regsiter from './pages/Regsiter';
import Home from './pages/Home';
import Start from './components/Start';
import Verify from './pages/Verify'
import EmailVerify from './pages/EmailVerified';

function App() {
  return (
    <div className="bg-[#F8F4EA]">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Regsiter />} />
          <Route exact path="/chats" element={<Home />} />
          <Route exact path="/" element={<Start />} />
          <Route exact path="/verify" element={<Verify/>}/>
          <Route exact path="/auth/verify/:id/:token" element={<EmailVerify/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
