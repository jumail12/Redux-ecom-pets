import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addNewAddress, fetchAddress } from "../../sliceLogic/AddressSlice";


const NewAddress = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const initialValues = {
    customerName: "",
    streetName: "",
    city: "",
    homeAddress: "",
    customerPhone: "",
    postalCode: "",
  };

  const validationSchema = Yup.object({
    customerName: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Customer name is required"),
    streetName: Yup.string().required("Street name is required"),
    city: Yup.string().required("City is required"),
    homeAddress: Yup.string().required("Home address is required"),
    customerPhone: Yup.string()
      .matches(/^\d{10}$/, "Phone must be a 10-digit number")
      .required("Phone number is required"),
    postalCode: Yup.string()
      .matches(/^\d{6}$/, "Postal Code must be a 6-digit number")
      .required("Postal code is required"),
  });

  const handleSubmit = async(values,{ resetForm }) => {
    console.log(values);
    
   try{
  await  dispatch(addNewAddress({
        customerName:values.customerName,
        streetName:values.streetName,
        city:values.city,
        homeAddress:values.homeAddress,
        customerPhone : values.customerPhone,
        postalCode: values.postalCode
    }))
    .then(()=>{
        
        dispatch(fetchAddress());
         toast.success("address added successfully!");
        navigate("/manageadd");
        resetForm();
    })
   }
   catch (err){
toast.warn(err.message)
   }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Address</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="customerName"
                  className="block text-gray-700 font-medium"
                >
                  Customer Name
                </label>
                <Field
                  name="customerName"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="customerName"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="streetName"
                  className="block text-gray-700 font-medium"
                >
                  Street Name
                </label>
                <Field
                  name="streetName"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="streetName"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="city" className="block text-gray-700 font-medium">
                  City
                </label>
                <Field
                  name="city"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="homeAddress"
                  className="block text-gray-700 font-medium"
                >
                  Home Address
                </label>
                <Field
                  name="homeAddress"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="homeAddress"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="customerPhone"
                  className="block text-gray-700 font-medium"
                >
                  Phone Number
                </label>
                <Field
                  name="customerPhone"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="customerPhone"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="postalCode"
                  className="block text-gray-700 font-medium"
                >
                  Postal Code
                </label>
                <Field
                  name="postalCode"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="postalCode"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow hover:bg-indigo-700 transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding Address..." : "Add Address"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewAddress;
