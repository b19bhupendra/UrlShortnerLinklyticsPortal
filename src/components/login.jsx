import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField.jsx'
import { Link } from 'react-router-dom'   // <-- add this import
import { useNavigate  } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import api from '../api/api.js'
import { useStoreContext } from '../contextApi/ContextApi.jsx'  

export const LoginPage = () => {

    const navigate = useNavigate(); // <-- add this line to use the navigate function
    const [loader, setLoader] = React.useState(false); // useState hook to manage loading state during form submission
    const { setToken } = useStoreContext(); 

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ // useForm hook from react hook form to manage form state and validation
        defaultValues: {
            username: '',
            password: '',
        },
        mode: 'onTouched' // validation mode set to 'onTouched' to trigger validation when the input is touched
    });
    const loginHandler = async (data) => {

        setLoader(true); // set loading state to true when form submission starts
        try{
            const { data: response } = await api.post(
                "/api/auth/public/login", 
                data
            );
            console.log("Login Response: ", response);
            setToken(response.token);
            //Store the token in the local storage after successful login
            localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));

            toast.success("Login Successful!"); // show success toast message
            reset(); // reset the form fields after successful submission
            navigate("/"); // navigate to login page after successful registration
        }catch(error){
            console.log("Login Error: ", error);
            toast.error("Login Failed! Please try again."); // show error toast message
        }finally{
            setLoader(false); // ensure loading state is set to false after form submission
        }


    };
  return (
    <div
        className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
        <form onSubmit={handleSubmit(loginHandler)}
            className = "sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md">
            <h1 className='text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl'>
                Login Here
            </h1>
            <hr className='mt-2 mb-5 text-black'/>

            <div className='flex flex-col gap-3'>
                <TextField 
                    label="Username"
                    required
                    id="username"
                    type="text"
                    message= "*Username is required"
                    placeholder="Enter your username" 
                    register={register}
                    errors={errors}  
                />
            </div>

            <div className='flex flex-col gap-3'>
                <TextField 
                    label="Password"
                    required
                    id="password"
                    type="text"
                    message= "*Password is required"
                    placeholder="Enter your password" 
                    register={register}
                    min={6}
                    errors={errors}  
                />
            </div>
            <button
                disabled={loader} // loader is a boolean value stores whether the form is in loading state or not
                type='submit'
                className='bg-customRed font-semibold text-white  bg-custom-gradient w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3'>
                {loader ? "Loading...": "Login"}
            </button>

            
            <p className='text-center text-sm text-slate-700 mt-6'>
                Don't have an account?
                <Link
                className="font-semibold underline hover:text-black"
                to="/register">
                    <span className='text-btnColor'> SignUp</span>
                </Link>
            </p>
        </form>
    </div>
  )
}

export default LoginPage;