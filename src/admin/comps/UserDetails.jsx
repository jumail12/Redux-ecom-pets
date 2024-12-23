import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { blockOrUnblock, getUserById } from "../../sliceLogic/UserSlice";
import { toast } from "react-toastify";
import { OrderByUId, OrderStatusAdmin } from "../../sliceLogic/AdminOrderSlice";

const UserDetails = () => {
  const { uId } = useParams();
  const dispatch = useDispatch();
  const { userI } = useSelector((state) => state.adUser);
  const { ordersById } = useSelector((state) => state.adOrder);

  useEffect(() => {
    if (uId) {
      dispatch(getUserById(uId));
      dispatch(OrderByUId(uId));
    }
  }, [dispatch, uId]);

  console.log(ordersById);
  

  // Handle blocking/unblocking a user
  const handleBlock = (id) => {
    try {
      dispatch(blockOrUnblock(id)).then(() => {
        dispatch(getUserById(id));
        toast.success(`User status updated.`);
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Handle order status button click
  const handleOrderStatusChange = (orderId) => {
    try{
          dispatch(OrderStatusAdmin(orderId))
         .then(()=>{
            dispatch(OrderByUId(uId));
           
         });
    }
    catch(err){
        toast.error(err.message);
    }
   
    // Here you can trigger a dispatch to update the order status or navigate to a detail view.
  };

  if (!userI) {
    return <div className="p-4">Loading user details...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
          <Link to={"/admin/users"} className="text-blue-500 hover:underline">{"< Back to User Panel"}</Link>
      <h1 className="text-3xl font-bold mb-6">User Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <img
          src="https://cdn.pixabay.com/photo/2016/08/20/05/51/avatar-1606939_1280.png"
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 mx-auto"
        />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">{userI.userName}</h2>
          <p className="text-gray-600 mb-4">{userI.userEmail}</p>
          <p
            className={`py-1 cursor-pointer px-3 rounded-full text-white ${
              userI.isBlocked ? "bg-red-500" : "bg-green-500"
            }`}
            onClick={() => handleBlock(userI.id)}
          >
            {userI.isBlocked ? "Blocked" : "Active"}
          </p>
        </div>
      </div>

      {/* Order Details */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        {ordersById && ordersById.length > 0 ? (
          ordersById.map((order,index) => (
            <div
              key={order.orderId}
              className="bg-white p-4 rounded-lg shadow-md mb-4"
            >
              <h3 className="text-lg font-bold text-gray-800">
                Order #{index+1}
              </h3>
              <p className="text-gray-600">
                Date: {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <button
                className={`mt-2 px-4 py-1 rounded ${
                  order.orderStatus === "Delivered"
                    ? "bg-green-500 text-white"
                    : "bg-yellow-500 text-black"
                }`}
                onClick={() => handleOrderStatusChange(order.orderId)}
              >
                {order.orderStatus}
              </button>
              <div className="mt-4">
                <h4 className="font-bold mb-2">Items:</h4>
                {order.items.map((item) => (
                  <div
                    key={item.orderItemId}
                    className="flex items-center mb-2 bg-gray-100 p-3 rounded-md"
                  >
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-16 h-16 mr-4 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-bold text-gray-800">
                        {item.productName}
                      </p>
                      <p className="text-gray-600">
                        Quantity: {item.quantity} | Total Price: $
                        {item.totalPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No orders found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
