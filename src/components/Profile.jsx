import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { UserOrders } from "../sliceLogic/CheckoutSlice";

const Profile = () => {
  const [loadingProfile, setLoadingProfile] = useState(true); 
  const dispatch = useDispatch();
  const { orderDetails } = useSelector((state) => state.checkout);


  const email = Cookies.get("email");
  const useid = Cookies.get("name");

  useEffect(() => {
    if (email && useid) setLoadingProfile(false);
  }, [email, useid]);

  // Fetch orders
  useEffect(() => {
    dispatch(UserOrders());
  }, [dispatch]);



  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Profile Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        {loadingProfile ? (
          <p>Loading profile...</p>
        ) : email && useid ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Profile Information</h1>
            <p>
              <strong>UserName:</strong> <span className="font-semibold text-orange-600">{useid}</span>
            </p>
            <p>
              <strong>Email:</strong> <span className="font-semibold text-orange-600">{email}  </span>
            </p>
          </>
        ) : (
          <p>Error loading profile data.</p>
        )}
      </div>

      {/* Orders Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
        {orderDetails && orderDetails.length > 0 ? (
          <div className="space-y-6">
            {orderDetails.map((order) => (
              <div
                key={order.orderId}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                {/* <div className="mb-4">
                  <p>
                    <strong>Order ID:</strong>  <span className=" font-semibold text-sm">{order.orderString}</span>
                  </p>
                  <p>
                    <strong>Order Date:</strong>{" "}
                   <span className=" font-semibold text-sm">  {new Date(order.orderDate).toLocaleString()}</span>
                  </p>
                  <p>
                    <strong>Status:</strong> <span className="font-bold text-sky-500">{order.orderStatus}</span> 
                  </p>
                  <p>
                    <strong>Transaction ID:</strong> <span className=" font-semibold text-sm">{order.transactionId}</span>
                  </p>
                </div> */}
                <div>
                  <h3 className="text-xl font-bold mb-2">Items:</h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.orderItemId}
                        className="flex items-center bg-white p-4 rounded-md shadow-sm"
                      >
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-16 h-16 rounded-md mr-4 object-cover"
                        />
                        <div>
                          <h4 className="font-medium">{item.productName}</h4>
                          <p>
                            <strong>Quantity:</strong> {item.quantity}
                          </p>
                          <p>
                    <strong>Status:</strong> <span className="font-bold text-sky-500">{order.orderStatus}</span>
                  </p>
                        
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
