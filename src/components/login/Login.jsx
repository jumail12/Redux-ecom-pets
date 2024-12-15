import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchemaLogin } from "./loginValSchema";
import { loginUser } from "../../sliceLogic/userAuth";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async (values, { resetForm }) => {
    try {
      const res = await dispatch(
        loginUser({
          UserEmail: values.email,
          Password: values.password,
        })
      ).unwrap();

      localStorage.setItem("id", res.id);
      localStorage.setItem("role", res.role);
      localStorage.setItem("token", res.token);
      localStorage.setItem("name", res.userName);
      localStorage.setItem("email", res.userEmail);
      toast.success("User logged in successfully",{
        onClose:()=>{
          resetForm();
          if ((res.role == "Admin")) {
            navigate("/admin", { replace: true });
          }else{
            navigate("/", { replace: true });
          }
        }
      });
     
    
      
    } catch (err) {
      console.log(err);
      toast.warn(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="max-w-4xl w-full flex bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div
          className="hidden md:block md:w-1/2 bg-cover"
          style={{
            backgroundImage: `url('https://cdn.pixabay.com/photo/2024/04/05/20/17/ai-generated-8678181_960_720.jpg')`,
          }}
        ></div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Welcome</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchemaLogin}
            onSubmit={handleLogin}
          >
            <Form className="space-y-4">
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Your Email*"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password*"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Log In
                </button>
              </div>
              <p className="text-sm">
                don't have an account ,
                <Link to={"/register"} className="font-bold">
                  Register
                </Link>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
