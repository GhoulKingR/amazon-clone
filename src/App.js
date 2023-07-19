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
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe(
  "pk_test_51MgAdyIX5vypJLVMWEvx6KBVykt0x84Zcnyydsy1EudgwgMvCmwVCsfFZI4W0vNhsJRsN9hneQNzHZunbclNKedf00YsC5OZBz"
);

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
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
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
