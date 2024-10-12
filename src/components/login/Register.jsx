
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { fetchUsers,addUsers } from '../../sliceLogic/userAuth';
import { useDispatch, useSelector } from 'react-redux';


const Register = () => {

    const nav=useNavigate();
    const data=useSelector((state)=>state.userRed.users)
    const dispatch=useDispatch();

    // fetch
    useEffect(()=>{
        dispatch(fetchUsers())
    },[]);

  const intialV={
    firstName:"",
    lastName:"",
    email:"",
    mob:"",
    password:"",
    confirmPassword:"",
    radio:false
  }

  const [Fvalues,setFvalues]=useState(intialV);
  const [error,setError]=useState({});
 

    const Validate= (fv)=>{
        let tempError={};
    
        if(!fv.firstName){
          tempError.firstName="First name is required..!"
        }
    
        if(!fv.lastName){
          tempError.lastName="Last name is required..!"
        }
    
        //email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!fv.email){
          tempError.email = "Email is required.";
        }else if(!emailRegex.test(fv.email)){
          tempError.email="Invalid email format..!";
        }
    
        if (!fv.mob) {
          tempError.mob = "Mobile number is required.";
        } else if (fv.mob.length !== 10) {
          tempError.mob = "Mobile number should be 10 digits.";
        }
    
        if (!fv.password) {
          tempError.password = "Password is required.";
        } else if (fv.password.length < 6) {
          tempError.password = "Password should be at least 6 characters long.";
        }
    
      if(!fv.confirmPassword){
        tempError.confirmPassword="Confirm your password..!";
      }  else if(!(fv.password===fv.confirmPassword)){
        tempError.confirmPassword = "Passwords do not match.";
      }
    
      setError(tempError);
      return Object.keys(tempError).length===0;
      }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFvalues({ ...Fvalues, [name]: value });
      };
    
      const handleLnav=()=>{
        nav("/login")
      }

    //   submit

      // form submission
  const handleSubmit= async(e)=>{

    e.preventDefault();

    if(Validate(Fvalues)){
      try{
        const userEmail=data.find((user)=>user.email===Fvalues.email)
       if(userEmail){
        toast.warn("Email is alredy taken...!")
       }
       else{
        await dispatch(addUsers({
            firstName:Fvalues.firstName,
            lastName:Fvalues.lastName,
            email:Fvalues.email,
            mob:Fvalues.mob,
            password:Fvalues.password,
            cart:[],
            order:[]
        }));
        nav("/login")
       }
    }

      catch{
        console.error('There was an error with the registration:', error);
      }}
  }


    
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
    {/* Form Container */}
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Split into two columns */}
        <div className="flex space-x-4">
          {/* Left column */}
          <div className="w-1/2 space-y-4">
            <div>
              <input
                type="text"
                placeholder="First name*"
                required
                value={Fvalues.firstName}
                name="firstName"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error.firstName && <p className="text-red-500 text-sm mt-1">{error.firstName}</p>}
            </div>

            <div>
              <input
                type="number"
                placeholder="Mobile number*"
                required
                value={Fvalues.mob}
                name="mob"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error.mob && <p className="text-red-500 text-sm mt-1">{error.mob}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Choose a password*"
                required
                value={Fvalues.password}
                name="password"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
            </div>
          </div>

          {/* Right column */}
          <div className="w-1/2 space-y-4">
            <div>
              <input
                type="text"
                placeholder="Last name*"
                required
                value={Fvalues.lastName}
                name="lastName"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error.lastName && <p className="text-red-500 text-sm mt-1">{error.lastName}</p>}
            </div>

            <div>
              <input
                type="email"
                placeholder="Your email*"
                required
                value={Fvalues.email}
                name="email"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm a password*"
                required
                value={Fvalues.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error.confirmPassword && <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>}
            </div>
          </div>
        </div>

        {/* Terms and conditions */}
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            required
            className="form-radio"
            onChange={handleChange}
            name="radio"
            onClick={() => {
              if (Fvalues.radio === false) {
                Fvalues.radio = true;
              }
            }}
          />
          <label className="text-sm">Terms and conditions..!</label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Account
        </button>
      </form>

      <div className="mt-3">
        <h4 className="text-sm">
          Already have an account?{' '}
          <span className="text-blue-600 font-bold cursor-pointer" onClick={handleLnav}>
            Log in
          </span>
        </h4>
      </div>
    </div>
  </div>
  )
}

export default Register