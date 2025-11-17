import React, { use } from 'react'
import { useStoreContext } from '../../contextApi/ContextApi'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '../TextField';
import { RxCross1, RxCross2 } from 'react-icons/rx';
import Tooltip from '@mui/material/Tooltip';





export const CreateNewShorten = ({ setOpen, refetch}) => {

    const { token } = useStoreContext(); // getting token from global state using custom context api hook to make authenticated api requests
    const [loading, setLoading] = useState(false);// this state will keep track of loading whether the form is being submitted or not when submitted then loading will be true

    const  {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            originalUrl: "",
        },
        mode: "onTouched",
    });

    const createShortUrlHandler = async (data) => { 

        
    };Duplicata_image001-225082615053044004 (3045155) (3045156)

    return (
        <div className=' flex justify-center items-center bg-white rounded-md '>

            <form 
                onSubmit={handleSubmit(createShortUrlHandler)}
                className='sm:w-[450px] w-[360px] relative shadow-custom pt-8 pb-5 sm:px-8 px-4 rounded-lg'>
                <h1 className='font-montserrat sm:mt-0 mt-3 text-center font-bold sm:text-2xl text-[22px] text-slate-800'>
                    Create New Short URL
                </h1>

                <hr className='mt-2 sm:mb-5 mb-3 text-slate-950' />

                <div>
                    <TextField
                        label="Original URL"
                        id="originalUrl"
                        type="url"
                        placeholder="https://example.com"
                        register={register}
                        errors={errors}
                        required={true}
                        message="Original URL is required"
                    />
                </div>

                <button
                    className='bg-customRed font-semibold text-white w-32 bg-custom-gradient py-2 transition-colors rounded-md my-3'
                    type="text"
                >
                    {loading ? "Creating..." : "Create"}
                </button>

                {!loading && (
                    <Tooltip title="Close">
                        <button
                            disabled = {loading}
                            onClick={() => setOpen(false)}
                            className=" absolute right-2 top-2 ">
                            <RxCross2 className='text-slate-800 text-3xl' />
                        </button>
                    </Tooltip>
                )}
            </form> 
        </div>
    )
}

export default CreateNewShorten