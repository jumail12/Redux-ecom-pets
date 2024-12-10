import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrder } from "../sliceLogic/Payment";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true); 

  const userId = localStorage.getItem("id");
  const dispatch = useDispatch();

  const userOrders = useSelector((state) => state.ord.order);
  
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    if (userId) fetchUserProfile();
  }, [userId]);

  // Fetch orders
  useEffect(() => {
    const fetchUserOrders = async () => {
      setLoadingOrders(true);
      await dispatch(fetchOrder());
      setLoadingOrders(false);
    };

    fetchUserOrders();
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Profile Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        {loadingProfile ? (
          <p>Loading profile...</p>
        ) : userData ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Profile Information</h1>
            <p>
              <strong>Name:</strong> {userData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Phone:</strong> {userData.mob}
            </p>
          </>
        ) : (
          <p>Error loading profile data.</p>
        )}
      </div>

      {/* Orders Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
  <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
  {loadingOrders ? (
    <p>Loading orders...</p>
  ) : userOrders.length > 0 ? (
    <ul className="space-y-4">
      {userOrders.map((order, index) => (
        <li key={index} className="border p-4 rounded">
          <h3 className="font-bold mb-2">Order #{index + 1}</h3>
          <p>
            <strong>Address:</strong> {order.address}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>
          <p>
            <strong className="font-bold">Total Price:</strong> ${order.totalPrice}
          </p>
          <h4 className="mt-2 font-bold ">Items:</h4>
          <ul className="space-y-2">
            {order.cart.map((item) => (
              <li key={item.id} className="flex items-center space-x-4">
                <img
                  src={item.url}
                  alt={item.heading}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h5 className="font-semibold">{item.heading}</h5>
                  <p>
                    <strong>Price:</strong> ${item.price}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.qty}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  ) : (
    <p>No orders found.</p>
  )}
</div>

    </div>
  );
};

export default Profile;
