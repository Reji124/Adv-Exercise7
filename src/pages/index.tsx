import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi'; 
import Link from 'next/link';
import { useRouter } from 'next/router';

type FormData = {
  email: string;
  password: string;
};

const Index = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    router.push('/home');
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url("https://images.ctfassets.net/cnu0m8re1exe/6rkPDdVnHFMDz29XtjWXuY/fc31afa24685cb2babdb2a32dc2bfa7d/shutterstock_169805951.jpg")` }}>
      <div className="w-full max-w-md bg-gray-800 dark:bg-gray-900 rounded-lg shadow-lg p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-300 md:text-2xl mb-10">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-300">Email Address</label>
            <input type="email" id="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              className={`w-full bg-gray-700 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 
              focus:border-primary-600 p-2.5 ${errors.email && 'border-red-500'}`}
              placeholder="name@gmail.com" required />
            {errors.email && <p className="text-sm text-red-500 mt-1">Valid email is required</p>}
          </div>
          <div className="relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password', { required: true, minLength: 8 })}
              placeholder="••••••••"
              className={`bg-gray-700 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 
              focus:border-primary-600 block w-full p-2.5 ${errors.password && 'border-red-500'}`}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <HiEyeOff className="text-gray-400 mt-6" /> : <HiEye className="text-gray-400 mt-6" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500 mt-1">Password must be at least minimum of 8 characters</p>}
          <button type="submit" className="w-full bg-gray-600 hover:bg-gray-700 focus:outline-none 
           font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white dark:bg-primary-600">
            Log In
          </button>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Don't have an account?{' '}
            <Link href="/signup"
              className="font-medium text-gray-300 hover:underline">Signup
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Index;
