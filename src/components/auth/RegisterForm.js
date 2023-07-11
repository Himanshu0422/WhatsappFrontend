import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../../utils/validation';
import AuthInput from './AuthInput';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners/'
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/userSlice';

function RegisterForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.user);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema),
    });
    const onSubmit = async (data) => {
        const res = await dispatch(registerUser({ ...data, picture: ""}));
        if(res?.payload?.user){
            navigate("/");
        }
    };
    // console.log("values", watch());
    // console.log("errors", errors);

    return (
        <div className="h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
                <div className="text-center dark:text-dark_text_1">
                    <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
                    <p className="mt-2 text-sm">Sign up</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 sapce-y-6">
                    {/* <input {...register("name")} /> */}
                    <AuthInput 
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        register={register}
                        error={errors?.name?.message}
                    />
                    <AuthInput 
                        name="email"
                        type="email"
                        placeholder="Email address"
                        register={register}
                        error={errors?.email?.message}
                    />
                    <AuthInput 
                        name="status"
                        type="text"
                        placeholder="Status"
                        register={register}
                        error={errors?.status?.message}
                    />
                    <AuthInput 
                        name="password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        error={errors?.password?.message}
                    />
                    {error ? (
                        <div>
                            <p className='text-red-400'>{error}</p>
                        </div>
                        ): null
                    }
                    <button className="w-full flex justify-center bg-green_1 text-gray-100 p-4 
                                rounded-full tracking-wide font-semibold focus:outline-none
                                hover:bg-green_2 shadow-1g cursor-pointer transition ease-in
                                duration-300 signup-button" type='submit'>
                            {status === 'loading' ? <PulseLoader color="#fff" size={16}/> : "Sign Up"}
                    </button>
                </form>
                <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
                    <span>have an account ?</span>
                    <Link href="/login" className="dark:text-dark_hover_1 hover: underline cursor-pointer transition ease-in duration-300">
                        Sign in
                    </Link> 
                </p>
            </div>
        </div>
    )
}

export default RegisterForm;