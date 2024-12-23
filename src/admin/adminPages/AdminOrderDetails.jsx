import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrders, OrderStatusAdmin } from "../../sliceLogic/AdminOrderSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const AdminOrderDetails = () => {
  const dispatch = useDispatch();
  const { allOrders } = useSelector((state) => state.adOrder);

  useEffect(() => {
    dispatch(GetAllOrders());
  }, [dispatch]);

   // Handle order status button click
    const handleOrderStatusChange = (orderId) => {
      try{
            dispatch(OrderStatusAdmin(orderId))
           .then(()=>{
              dispatch(GetAllOrders());
             
           });
      }
      catch(err){
          toast.error(err.message);
      }
     
      // Here you can trigger a dispatch to update the order status or navigate to a detail view.
    };



  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Link
        to={"/admin"}
        className="text-blue-500 hover:underline mb-6 inline-block"
      >
        {"< Back to Admin Panel"}
      </Link>
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Order Details
      </h2>
      {allOrders && allOrders.length > 0 ? (
        <div className="space-y-6">
          {allOrders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white p-6 shadow-lg rounded-lg space-y-4"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                Order ID: {order.orderId}
              </h3>
              <div className="flex justify-between text-gray-700">
                <div>
                  <p className="font-medium">User:</p>
                  <p>{order.userName}</p>
                </div>
                
              </div>

              <div className="text-gray-700">
                <p className="font-medium">Order Status:</p>
                <button
                  className={`px-4 py-2 rounded-full font-medium text-white focus:outline-none ${
                    order.orderStatus === "Delivered"
                      ? "bg-green-600 hover:bg-green-700"
                      : order.orderStatus === "Pending"
                      ? "bg-yellow-400 hover:bg-yellow-500"
                      : "bg-red-500 hover:bg-red-600"
                  }`}

                  onClick={()=> handleOrderStatusChange(order.orderId)}
                >
                  {order.orderStatus}
                </button>
              </div>

              <div className="text-gray-700">
                <p className="font-medium">Transaction ID:</p>
                <p className="text-gray-600">{order.transactionId}</p>
              </div>

              <div className="text-gray-700">
                <p className="font-medium">Order Date:</p>
                <p>{new Date(order.orderDate).toLocaleString()}</p>
              </div>

              <div className="text-gray-700">
                <p className="font-medium">Order String:</p>
                <p>{order.orderString}</p>
              </div>

              <div className="text-gray-700">
                <p className="font-medium">Delivery Address:</p>
                <p>{order.userAddress}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No orders found.
        </p>
      )}
    </div>
  );
};

export default AdminOrderDetails;
