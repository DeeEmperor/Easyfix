import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup({formData, handleChange, handleSignup, loading}) {
    const [activeAudience, setActiveAudience] = useState("customer")
   
    return (
       <div className="min-h-screen  flex flex-col items-center bg-black pt-20 justify-center">
                   <div className="flex w-full max-w-md bg-gray-800 rounded-xl overflow-hidden mb-6">
                       <button
                 onClick={() => setActiveAudience("customer")}
                 className={`w-1/2 py-2 font-bold transition-colors  ${
                   activeAudience === "customer" ? "bg-amber-500 text-black" : "bg-gray-700 text-white"
                 }`}
                       >Customer</button>
                       <button
                 onClick={() => setActiveAudience("worker")}
                 className={`w-1/2 py-2 font-bold transition-colors  ${
                   activeAudience === "worker" ? "bg-amber-500 text-black" : "bg-gray-700"
                 }`}
               >Worker</button>
                   </div>
                   <h1 className="text-8xl font-bold text-amber-500 font-Josefin">EazyFix</h1>
                   <p className="text-lg mt-3 text-brown-300 pb-10 pt-1">your surerst plug for workman wey sabi</p>
                   
            <form className="bg-gray-900 shadow-md px-8 pt-8 pb-8 mb-4 w-full max-w-md rounded-2xl shadow-lg min-h-[500px] " onSubmit={handleSignup}>
                 <div className="mb-4">
                           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">First Name</label>
                           <input onChange={handleChange} type="text" name="firstName" id="firstName" placeholder="Enter your first name" className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500" value={formData.firstName} required/>
                </div>
                 <div className="mb-4">
                           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Last Name</label>
                           <input onChange={handleChange} type="text" name="lastName" id="lastName" placeholder="Enter your last name" className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500" value={formData.lastName} required/>
                       </div>
                       <div className="mb-4">
                           <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="email">Email</label>
                           <input onChange={handleChange} type="email" name="email" id="email" placeholder="Enter your email" className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500" value={formData.email} required/>
                       </div>
                       <div className="mb-4">
                           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                           <input onChange={handleChange} type="password" name="password" id="password" placeholder="Enter your password" className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500" value={formData.password} required/>   
                </div>
                 <div className="mb-4">
                           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Confirm Password</label>
                           <input onChange={handleChange} type="password" name="confirmPassword" id="confirmPassword" placeholder="Enter your password again" className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500" value={formData.confirmPassword} required/>
                       </div>
                       <button 
                           type="submit" 
                           className="w-full bg-amber-500 text-white font-semibold py-2 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                           disabled={loading}
                       >
                           {loading ? "Creating Account..." : "Sign Up"}
                       </button>
                       
                       <p className="text-center mt-3 text-brown-300">Or</p>
                       <button className="w-full bg-amber-500 text-white font-semibold py-2 rounded-lg hover:bg-amber-600 transition-colors mb-4 flex items-center justify-center gap-2">
                           <img src="https://www.svgrepo.com/show/355037/google.svg" alt="google logo" className="w-5 h-5 object-contain" />
                           <span>Continue with Google</span>
                       </button>
                       <button className="w-full bg-amber-500 text-white font-semibold py-2 rounded-lg hover:bg-amber-600 transition-colors mb-4">Continue with Phone Number</button>
                       
                       <p className="text-center mt-3 text-brown-300">Already have an account? <Link to="/" className="text-amber-500 font-semibold">Login</Link></p>
                   </form>
               </div>
    )

}

export default Signup;