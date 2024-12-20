import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteAddress, fetchAddress } from "../../sliceLogic/AddressSlice";
import { toast } from "react-toastify";

const AddressManagement = () => {
  const { addid } = useParams();
  const { address } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  const handleRemoveAdd = async (id) => {
    try {
      await dispatch(deleteAddress(id)).then(() => {
        toast.info("Address removed successfully");
        dispatch(fetchAddress());
      });
    } catch (err) {
      toast.warn(err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Address Management
      </h1>

      {/* Add New Address Button */}
      <button
        className="mb-8 px-5 py-3 text-sm font-medium text-white bg-green-600 rounded-full shadow-md hover:bg-green-700 transition duration-200"
        onClick={() => navigate("/newadd")}
      >
        Add New Address
      </button>

      {address?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {address.map((addr) => (
            <div
              key={addr.addressId}
              className={`p-6 shadow-md rounded-lg border transition duration-200 ${
                addr.addressId === Number(addid)
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 bg-white"
              }`}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {addr.customerName}
              </h2>
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-semibold">Street:</span> {addr.streetName}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-semibold">City:</span> {addr.city}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-semibold">Address:</span> {addr.homeAddress}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-semibold">Phone:</span> {addr.customerPhone}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">Postal Code:</span>{" "}
                {addr.postalCode}
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 transition duration-200"
                  onClick={() => navigate(`/payment/${addr.addressId}`)}
                >
                  Select This Address
                </button>
                <button
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md shadow-md hover:bg-red-700 transition duration-200"
                  onClick={() => handleRemoveAdd(addr.addressId)}
                >
                  Remove This Address
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-800">
          No addresses found.{" "}
          <button
            className="text-indigo-600 underline hover:text-indigo-800"
            onClick={() => navigate("/newadd")}
          >
            Add Address
          </button>
        </p>
      )}
    </div>
  );
};

export default AddressManagement;
