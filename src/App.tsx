import { useState } from "react";

const LoginPage = () => {

  const [rememberMeToggle, setRememberMeToggle] = useState(false)
  const [formType, setFormType] = useState<"login" | "register">("register")

  function changeFormType() {
    setFormType((prev) => prev === "login" ? "register" : "login")
  }

  return (
    <div id="form-container" className="w-full h-screen flex items-center justify-center special-bg">
      <form className='relative  rounded-lg w-[425px] bg-gray text-[#7A839E]'>
        <img src="./layered-waves-haikei.svg" className="absolute w-full object-fill top-5" />
        {/* <div className="absolute w-full aspect-[200/75] object-fill top-5">
          <svg id="visual" viewBox="0 0 200 75" xmlns="http://www.w3.org/2000/svg" className="w-full" version="1.1">
            <path fill="#293858"  d="M0 6L4.8 11C9.7 16 19.3 26 28.8 28.8C38.3 31.7 47.7 27.3 57.2 29.3C66.7 31.3 76.3 39.7 85.8 41.7C95.3 43.7 104.7 39.3 114.2 36C123.7 32.7 133.3 30.3 142.8 25.2C152.3 20 161.7 12 171.2 11.8C180.7 11.7 190.3 19.3 195.2 23.2L200 27L200 76L195.2 76C190.3 76 180.7 76 171.2 76C161.7 76 152.3 76 142.8 76C133.3 76 123.7 76 114.2 76C104.7 76 95.3 76 85.8 76C76.3 76 66.7 76 57.2 76C47.7 76 38.3 76 28.8 76C19.3 76 9.7 76 4.8 76L0 76Z">
            </path>
            <path fill="#354261"  d="M0 32L4.8 35.7C9.7 39.3 19.3 46.7 28.8 48.3C38.3 50 47.7 46 57.2 44.7C66.7 43.3 76.3 44.7 85.8 40.8C95.3 37 104.7 28 114.2 25.8C123.7 23.7 133.3 28.3 142.8 34C152.3 39.7 161.7 46.3 171.2 50.8C180.7 55.3 190.3 57.7 195.2 58.8L200 60L200 76L195.2 76C190.3 76 180.7 76 171.2 76C161.7 76 152.3 76 142.8 76C133.3 76 123.7 76 114.2 76C104.7 76 95.3 76 85.8 76C76.3 76 66.7 76 57.2 76C47.7 76 38.3 76 28.8 76C19.3 76 9.7 76 4.8 76L0 76Z">
            </path>
            <path fill="#414d6b"  d="M0 69L4.8 64.8C9.7 60.7 19.3 52.3 28.8 51C38.3 49.7 47.7 55.3 57.2 56.8C66.7 58.3 76.3 55.7 85.8 56.8C95.3 58 104.7 63 114.2 66C123.7 69 133.3 70 142.8 67.2C152.3 64.3 161.7 57.7 171.2 52.7C180.7 47.7 190.3 44.3 195.2 42.7L200absolute w-[200px] h-[75px] object-fill top-5 41L200 76L195.2 76C190.3 76 180.7 76 171.2 76C161.7 76 152.3 76 142.8 76C133.3 76 123.7 76 114.2 76C104.7 76 95.3 76 85.8 76C76.3 76 66.7 76 57.2 76C47.7 76 38.3 76 28.8 76C19.3 76 9.7 76 4.8 76L0 76Z">
            </path>
          </svg>
        </div> */}

        <div className="flex flex-col items-center mx-auto max-w-[340px] pt-12 pb-7">
          <h5 className="form-logo absolute -top-4 text-center mb-4 bg-[#00F5E1] w-[200px] left-[112px] text-black text-xl py-3">
            {
              (formType === "login") ? "SIGN IN" : "SIGN UP"
            }
          </h5>
          <div className="user-logo z-10 mt-10 text-[#abb2c9]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-28 aspect-square">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>


          {
            formType === 'register' &&
            <>
              <div className='flex input-container py-3 bg-[#414b61] rounded-lg  mt-4 w-full'>
                <div className="px-2 border-r border-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="outline-none px-3 text-white placeholder:text-gray-300  bg-transparent"
                  placeholder='name'
                  required />
              </div>
              <div className='flex input-container py-3 bg-[#414b61] rounded-lg  mt-4 w-full'>
                <div className="px-2 border-r border-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                  </svg>
                </div>
                <input
                  type="email"
                  className="outline-none px-3 text-white placeholder:text-gray-300  bg-transparent"
                  placeholder='email'
                  required />
              </div>
              <div className="flex input-container py-3 bg-[#414b61] rounded-lg  mt-4 w-full">
                <div className="px-2 border-r border-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="date"
                  className="outline-none px-3 text-white placeholder:text-gray-300  bg-transparent w-full"
                  placeholder="Select date" />
              </div>
            </>
          }
          <div className='flex input-container py-3 bg-[#414b61] rounded-lg  mt-4 w-full'>
            <div className="px-2 border-r border-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="outline-none px-3 text-white placeholder:text-gray-300  bg-transparent"
              placeholder='username'
              required />
          </div>
          <div className='flex input-container py-3 bg-[#414b61] rounded-lg  mt-4 w-full'>
            <div className="px-2 border-r border-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="password"
              className="outline-none px-3 text-white placeholder:text-gray-300  bg-transparent"
              placeholder='password'
              required />
          </div>
          <div className="flex text-[#00F5E1] items-start my-3 w-full text-xs justify-between">
            {/* <div className="flex items-center h-5">
              <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-[#00F5E1] bg-transparent rounded accent-transparent" required />
            </div>
            <label htmlFor="remember" className="ms-2 text-sm font-medium ">Remember me</label> */}
            <div className="flex space-x-2 items-center ">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setRememberMeToggle(prev => !prev)
                }}
                className="w-4 h-4 grid place-content-center flex-nowrap aspect-square border border-[#00f5e1bf]">
                <svg
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
                  className={`w-3 h-3 ${rememberMeToggle ? 'visible' : 'hidden'}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </button>
              <span>Remember me</span>
            </div>
            <button>Forget Password ?</button>
          </div>

          <button type="submit" className="text-xl py-2.5 rounded-md mt-10 bg-[#00F5E1] text-gray-700 w-full">
            {
              formType === "login"
              && <span>Login</span>
            }
            {
              formType === "register"
              && <span>Register</span>
            }
          </button>

          <div className="mt-10 text-[#00F5E1] text-xs">
            {
              formType === "login" &&
              <span>
                Already have an account
                <button onClick={() => { changeFormType() }} className="hover:underline text-cyan-[#00F5E1] mx-2 text-sm">
                  Sign Up
                </button>
              </span>
            }
            {
              formType === "register" &&
              <span>
                Don't have an account
                <button onClick={() => { changeFormType() }} className="hover:underline text-cyan-[#00F5E1] mx-2 text-sm">
                  Sign In
                </button>
              </span>
            }
          </div>

        </div>
      </form>
    </div>
  );
}

export default LoginPage;


/**
 
<Form.Group controlId="formBasicEmail">
            <Form.Label>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </Form.Label>
            <Form.Control type="text" color='white' placeholder="Enter username" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
 */