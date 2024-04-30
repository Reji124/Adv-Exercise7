import React from 'react';
import { useRouter } from 'next/router'; 

const Home = () => {
  const router = useRouter(); 

  const handleLogout = () => {
    router.push('/'); 
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: `url("https://images.ctfassets.net/cnu0m8re1exe/6rkPDdVnHFMDz29XtjWXuY/fc31afa24685cb2babdb2a32dc2bfa7d/shutterstock_169805951.jpg")` }}>
      <div className="w-full max-w-md bg-gray-800 dark:bg-gray-900 rounded-lg shadow-lg p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-300 md:text-2xl mb-10">Welcome User!</h1>
        <button onClick={handleLogout} className="w-full bg-blue-600 hover:bg-red-800 focus:outline-none 
         font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white mt-4">
          Logout
        </button>
      </div>
    </section>
  );
};

export default Home;
