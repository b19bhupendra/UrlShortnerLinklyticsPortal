import React, { use } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField.jsx'
import { Link } from 'react-router-dom'   // <-- add this import
import { useNavigate  } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import api from '../api/api.js'


export const RegisterPage = () => {

    const navigate = useNavigate(); // <-- add this line to use the navigate function
    const [loader, setLoader] = React.useState(false); // useState hook to manage loading state during form submission
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ // useForm hook from react hook form to manage form state and validation
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
        mode: 'onTouched' // validation mode set to 'onTouched' to trigger validation when the input is touched
    });
    const registerHandler = async (data) => {

        setLoader(true); // set loading state to true when form submission starts
        try{
            const { data: response } = await api.post(
                "/api/auth/public/register", 
                data
            );
            reset(); // reset the form fields after successful submission
            navigate("/login"); // navigate to login page after successful registration
            toast.success("Registration Successful! Please Login."); // show success toast message
        }catch(error){
            console.log("Registration Error: ", error);
            toast.error("Registration Failed! Please try again."); // show error toast message
        }finally{
            setLoader(false); // ensure loading state is set to false after form submission
        }


    };
  return (
    <div
        className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
        <form onSubmit={handleSubmit(registerHandler)}
            className = "sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md">
            <h1 className='text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl'>
                Register Page
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
                    label="Email"
                    required
                    id="email"
                    type="text"
                    message= "*Email is required"
                    placeholder="Enter your email" 
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
                {loader ? "Loading...": "Register"}
            </button>

            
            <p className='text-center text-sm text-slate-700 mt-6'>
                Already have an account?
                <Link
                className="font-semibold underline hover:text-black"
                to="/login">
                    <span className='text-btnColor'> Login</span>
                </Link>
            </p>
        </form>
    </div>
  )
}

export default RegisterPage;