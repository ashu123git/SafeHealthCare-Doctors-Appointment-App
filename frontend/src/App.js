import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./screens/Homepage";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
// Whatever state we will create in redux, we will have to use it in App.js with the help of useSelector hook
import { useSelector } from "react-redux";
import Spinner from "./components/spinner";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
