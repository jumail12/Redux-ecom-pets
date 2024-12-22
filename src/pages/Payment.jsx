import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAddress } from "../sliceLogic/AddressSlice";
import { toast } from "react-toastify";
import {
  CreateOrder,
  RazorOrderCreation,
  RazorPaymentVerify,
} from "../sliceLogic/CheckoutSlice";
import Cookies from "js-cookie";
import { fetchCart } from "../sliceLogic/cartSlice";

//--------------------------------------------------------
//razorpay script

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
//--------------------------------------------------------

const Payment = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cartItems.cart);
  const { address } = useSelector((state) => state.address);

  const { orderId, paymentStatus } = useSelector((state) => state.checkout);
  const [raz, setRaz] = useState(null);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const { apid } = useParams();
  const dispatch = useDispatch();
  const email = Cookies.get("email");
  //--------------------------------------------------------
  useEffect(() => {
    dispatch(fetchAddress());
    
    
  }, [dispatch]);

  useEffect(() => {
    if (address?.length > 0) {
      if (apid) {
        const matchedAddress = address.find(
          (addr) => addr.addressId === Number(apid)
        );
        setSelectedAddress(matchedAddress || address[0]);
      } else {
        setSelectedAddress(address[0]);
      }
    }
  }, [address, apid]);

  // ------------------------------------------------------------------------

  //checkout functions

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );


  //submit checkout
  const handleProceedToCheckout = async () => {
    if (!isRazorpayLoaded) {
      const scriptLoaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      setIsRazorpayLoaded(scriptLoaded);

      if (!scriptLoaded) {
        toast.error("Failed to load payment gateway. Please try again later.");
        return;
      }
    }

    try {
      await dispatch(RazorOrderCreation( Math.trunc(totalPrice)));
      console.log(orderId);

      if (orderId) {
        const razorpayOptions = {
          key: "rzp_test_zTE9yV1gUOntlJ",
          amount: totalPrice,
          currency: "INR",
          name: "Pets-Ecom",
          description: "Order Payment",
          order_id: orderId,
          handler: async function (response) {
            const paymentData = {
              razorpay_payment_id: response.razorpay_payment_id, // Razorpay payment ID
              razorpay_order_id: response.razorpay_order_id, // Razorpay order ID
              razorpay_signature: response.razorpay_signature, // Razorpay signature
            };

            await verifyPayment(paymentData);
          },
          prefill: {
            name: selectedAddress.customerName,
            email: email,
            phone: selectedAddress.customerPhone,
          },
          theme: {
            color: "#000",
          },
        };

        const razorpay = new window.Razorpay(razorpayOptions);
        razorpay.open();
      } else {
        toast.error("Failed to create order. Please try again.");
      }
    } catch (err) {
      // console.log(err.message);
      
      toast.warn(err.message);
    }
  };


  //verify razorpayment
  const verifyPayment = async (data) => {
    try {
      await dispatch(RazorPaymentVerify(data));
      await placeOrder(data);
       
      
    } catch (err) {
      toast.error("Payment verification failed.");
      toast.error(err.message);
    }
  };


  //orderplacing
  const placeOrder = async (paymentData) => {
    try {
      const orderData = {
        AddId: selectedAddress.addressId,
        Total: totalPrice,
        OrderString: orderId,
        TransactionId: paymentData.razorpay_payment_id,
      };
      await dispatch(CreateOrder(orderData)).then(() => {
        toast.success("order placed");
        dispatch(fetchCart());
        navigate("/thankyou");
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {/* Address Display Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Delivery Address
          </h2>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700"
            onClick={() => navigate(`/manageadd/${selectedAddress?.addressId}`)}
          >
            Exchange Address
          </button>
        </div>
        {selectedAddress ? (
          <div className="text-gray-700 text-sm space-y-2">
            <p>
              <strong>Customer:</strong> {selectedAddress.customerName}
            </p>
            <p>
              <strong>Street:</strong> {selectedAddress.streetName}
            </p>
            <p>
              <strong>City:</strong> {selectedAddress.city}
            </p>
            <p>
              <strong>Home Address:</strong> {selectedAddress.homeAddress}
            </p>
            <p>
              <strong>Phone:</strong> {selectedAddress.customerPhone}
            </p>
            <p>
              <strong>Postal Code:</strong> {selectedAddress.postalCode}
            </p>
          </div>
        ) : (
          <p className="text-red-600">
            No address found.{" "}
            <button
              className="text-indigo-600 underline"
              onClick={() => navigate("/newadd")}
            >
              Add your address
            </button>
          </p>
        )}
      </div>

      {/* Cart Items Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
        {cart.length > 0 ? (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={item.productId}
                className="flex items-center space-x-4 border-b pb-4 mb-4"
              >
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {item.productName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">Your cart is empty.</p>
        )}
      </div>

      {/* Cart Summary Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Price Details
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total Items:</span>
            <span>({cart.length})</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Price</span>
            <span>
              ₹
              {cart.reduce(
                (acc, item) => acc + item.orginalPrize * item.quantity,
                0
              )}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Discount</span>
            <span className="text-green-600">
              - ₹
              {cart.reduce(
                (acc, item) =>
                  acc + (item.orginalPrize - item.price) * item.quantity,
                0
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Discount Price</span>
            <span className="font-bold">
              ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Delivery Charges</span>
            <span className="text-green-600">FREE</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-base font-bold text-gray-900">
            <span>Total Amount</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
        <button
          onClick={handleProceedToCheckout}
          className="mt-6 w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 transform transition duration-300 ease-in-out"
        >
          Proceed to Checkout
        </button>
      </div>
    </>
  );
};

export default Payment;
