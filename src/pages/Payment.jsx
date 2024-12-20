import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAddress } from "../sliceLogic/AddressSlice";

const Payment = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cartItems.cart);
  const { address } = useSelector((state) => state.address);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { apid } = useParams();
  const dispatch = useDispatch();

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




  const handleProceedToCheckout = () => {
    if (!selectedAddress) {
      navigate("/addAddress");
    } else {
      console.log("Proceeding to checkout with:", cart, selectedAddress);
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
              ₹
              {cart.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Delivery Charges</span>
            <span className="text-green-600">FREE</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-base font-bold text-gray-900">
            <span>Total Amount</span>
            <span>
              ₹
              {cart.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
            </span>
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
