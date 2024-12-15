import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUsers } from "../../sliceLogic/userAuth";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerVal } from "./registerValSchema";

const Register = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const initialV = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleLnav = () => {
    nav("/login");
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(
        addUsers({
          UserName: values.userName,
          UserEmail: values.email,
          Password: values.password,
        })
      ).unwrap();

      toast.success("User registered successfully!", {
        onClose: () => {
          nav("/login");
          resetForm();
        },
      });
    } catch (err) {
      toast.warn(err.message || "This email id is already taken.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      {/* Container */}
      <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col md:flex-row items-center">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2 p-4">
          <img
            src="https://cdn.pixabay.com/photo/2022/10/28/11/14/leaves-7552915_1280.png"
            alt="Decorative"
            className="w-full rounded-md"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

          <Formik
            initialValues={initialV}
            validationSchema={registerVal}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4 max-w-md mx-auto p-4 border rounded">
                {/* Username Field */}
                <div>
                  <label
                    htmlFor="userName"
                    className="block text-sm font-medium mb-1"
                  >
                    Username
                  </label>
                  <Field
                    name="userName"
                    type="text"
                    className={`w-full border px-2 py-1 rounded-md ${
                      errors.userName && touched.userName ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="userName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className={`w-full border px-2 py-1 rounded-md ${
                      errors.email && touched.email ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-1"
                  >
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className={`w-full border px-2 py-1 rounded-md ${
                      errors.password && touched.password ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium mb-1"
                  >
                    Confirm Password
                  </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className={`w-full border px-2 py-1 rounded-md ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-3">
            <h4 className="text-sm">
              Already have an account?{" "}
              <span
                className="text-blue-600 font-bold cursor-pointer"
                onClick={handleLnav}
              >
                Log in
              </span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
