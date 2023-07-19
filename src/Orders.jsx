import React, { useEffect, useState } from "react";
import "./Orders.css";
import { db } from "./firebaseConfig";
import { collection, doc, onSnapshot } from "@firebase/firestore";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (user) {
      const users = collection(db, "users");
      const userId = doc(users, user?.uid);
      const orders = collection(userId, "orders");
      onSnapshot(orders, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your orders</h1>

      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
