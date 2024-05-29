import "../../App.css";
import Footer from "../Footer";
import Header from "../Header";
import Landing from "../Landing";
import Home from "../Home";
import Login from "../Login";
import SignUp from "../SignUp";
import ErrorPage from "../ErrorPage";
import ForgetPassword from "../ForgetPassword";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
