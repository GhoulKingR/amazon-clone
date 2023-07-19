import "./App.css";
import Checkout from "./Checkout";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebaseConfig";

function App() {
  const [_, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      console.log("The user is >>>> ", authUser);
      if (authUser) {
        // The user just or is logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // The user isn't logged in
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
