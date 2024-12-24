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
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border-l-4 border-orange-500">
        {loadingProfile ? (
          <p className="text-center text-lg font-semibold text-gray-500">Loading profile...</p>
        ) : email && useid ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile Information</h1>
            <p className="text-lg">
              <strong className="text-gray-700">UserName:</strong> <span className="font-semibold text-orange-600">{useid}</span>
            </p>
            <p className="text-lg">
              <strong className="text-gray-700">Email:</strong> <span className="font-semibold text-orange-600">{email}</span>
            </p>
          </>
        ) : (
          <p className="text-center text-lg text-red-500">Error loading profile data.</p>
        )}
      </div>

      {/* Orders Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h2>
        {orderDetails && orderDetails.length > 0 ? (
          <div className="space-y-6">
            {orderDetails.map((order,index) => (
              <div
                key={order.orderId}
                className="border-t-4 border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">#Order{index+1}:</h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.orderItemId}
                        className="flex items-center bg-white p-4 rounded-md shadow-md hover:bg-gray-100 transition-colors duration-300"
                      >
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-16 h-16 rounded-md mr-4 object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-md text-gray-800">{item.productName}</h4>
                          <p className="text-gray-600">
                            <strong>Quantity:</strong> {item.quantity}
                          </p>
                          <p className="text-gray-600">
                            <strong>Status:</strong>{" "}
                            <span
                              className={`inline-block px-3 py-1 text-white font-semibold rounded-md ${order.orderStatus === "Delivered"
                                ? "bg-green-500"
                                : order.orderStatus === "Pending"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                              }`}
                            >
                              {order.orderStatus}
                            </span>
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
          <p className="text-center text-lg text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
