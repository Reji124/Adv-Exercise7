import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi'; 
import Link from 'next/link';
import { useRouter } from 'next/router';
import firebase from '../Firebase/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import authentication functions from Firebase

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const auth = getAuth(firebase); // Get the authentication service from Firebase

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const { email, password } = data;
      await createUserWithEmailAndPassword(auth, email, password); // Use createUserWithEmailAndPassword from Firebase auth
      window.alert('Signup successful!');
      router.push('/');
    } catch (error) {
      // Handle errors
      console.error('Error signing up:', error);
    }
  };
  
  return (
    <section className="bg-cover items-center justify-center"
      style={{ backgroundImage: `url("https://images.ctfassets.net/cnu0m8re1exe/6rkPDdVnHFMDz29XtjWXuY/fc31afa24685cb2babdb2a32dc2bfa7d/shutterstock_169805951.jpg")` }}>
      <section className="bg-blue-900 dark:bg-gray-900"></section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-700 md:text-2xl dark:text-blue-300">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-blue-700 dark:text-blue-300">Your email</label>
                <input type="email" id="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} 
                  className={`bg-blue-50 border border-blue-300 text-blue-700 sm:text-sm rounded-lg focus:ring-blue-600 
                  focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-blue-400 
                  dark:text-blue-300 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.email && 'border-red-500'}`} 
                  placeholder="name@gmail.com" required />
                {errors.email && <p className="text-sm text-red-500 mt-1">Valid email is required</p>}
              </div>
              <div className="relative">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-blue-700 dark:text-blue-300">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password', { required: true, minLength: 8 })}
                  placeholder="••••••••"
                  className={`bg-blue-50 border border-blue-300 text-blue-700 sm:text-sm rounded-lg focus:ring-blue-600 
                    focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-blue-400 
                    dark:text-blue-300 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.password && 'border-red-500'}`}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <HiEyeOff className="text-blue-400 mt-6" /> : <HiEye className="text-blue-400 mt-6" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500 mt-1">Password must be at least minimum of 8 characters</p>}
              
              <div className="relative">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-blue-700 dark:text-blue-300">Confirm password</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  {...register('confirmPassword', { required: true, minLength: 8 })}
                  placeholder="••••••••"
                  className={`bg-blue-50 border border-blue-300 text-blue-700 sm:text-sm rounded-lg focus:ring-blue-600 
                    focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-blue-400 
                    dark:text-blue-300 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.confirmPassword && 'border-red-500'}`}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <HiEyeOff className="text-blue-400 mt-6" /> : <HiEye className="text-blue-400 mt-6" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">Confirm Password is required and must be at least 8 characters</p>}
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded 
                    bg-blue-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 
                    dark:ring-offset-gray-800" required />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-blue-500 dark:text-blue-400">I accept the{' '} 
                    <a className="font-medium text-black hover:underline dark:text-black" href="#">Terms and Conditions</a></label>
                </div>
              </div>
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800 
                dark:focus:ring-blue-800">Create an account</button>
              <p className="text-sm font-light text-blue-500 dark:text-blue-400">
                Already have an account?{' '} 
                <Link href="/" className="font-medium text-black hover:underline dark:text-black">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
