import axios from "axios";
import React, { useCallback, useState } from "react";
import { IUser } from "../App";
import { Spinner } from "react-bootstrap";

const AuthPage = ({ setUser }: {
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}) => {

  const [authLoading, setAuthLoading] = useState<boolean>(false)
  const [rememberMeToggle, setRememberMeToggle] = useState(false)
  const [formType, setFormType] = useState<"login" | "register">("register")
  const [formData, setFormData] = useState<{
    name?: string
    dob?: string
    email: string
    password: string
  }>({
    email: "",
    password: "",
    dob: "",
    name: ""
  })

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {

    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  function changeFormType() {
    setFormType((prev) => prev === "login" ? "register" : "login")
  }
  const handleFormSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAuthLoading(true)
    axios.post(`${import.meta.env.VITE_API_URL}/${formType}`, {
      ...formData,
      dob: (formData.dob && formData.dob.split("-").length === 3) ? getUTCDate(formData.dob) : undefined
    }, { withCredentials: true })
      .then(({ status, data }) => {
        console.log("while authentication", formType, status, data)
        if (data.user) {
          setUser(data.user)
        }
      }).catch((err) => {
        console.error("While authentication", err)
      }).finally(() => {
        setAuthLoading(true)
      })

  }, [formType, formData, setAuthLoading])

  return (
    <div id="form-container" className="container-fluid vh-100 d-flex justify-content-center align-items-center special-bg">
      <form
        onSubmit={handleFormSubmit}
        className='position-relative  rounded-lg bg-gray'>
        <img id="bg-pattern" src="./layered-waves-haikei.svg" className="position-absolute w-100" />
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

        <div id="input-cont" className="d-flex flex-column align-items-center">
          <h5 id="form-signbord" className="-top-4 text-center">
            {
              (formType === "login") ? "SIGN IN" : "SIGN UP"
            }
          </h5>

          <svg id="user-logo" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-28 aspect-square">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>

          {/* Inputs */}
          {
            formType === 'register' &&
            <>
              <div className='input-container'>
                <div className="icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="svg-icon">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChangeInput}
                  className=""
                  placeholder='name'
                  required />
              </div>
              <div className="input-container">
                <div className="icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="svg-icon">
                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  name="dob"
                  onChange={handleChangeInput}
                  type="date"
                  className=""
                  placeholder="Select date" />
              </div>
            </>
          }
          <div className='input-container'>
            <div className="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svg-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
              </svg>
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChangeInput}
              className=""
              placeholder='email'
              required />
          </div>
          <div className='input-container'>
            <div className="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="svg-icon">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChangeInput}
              className=""
              placeholder='password'
              required />
          </div>

          {/* Footer */}
          <div
            style={{ fontSize: "12px", marginLeft: "12px", marginRight: "12px", marginTop: "7px" }}
            className="d-flex text-cyan w-100 justify-content-between">
            {/* <div className="flex items-center h-5">
              <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-[#00F5E1] bg-transparent rounded accent-transparent" required />
            </div>
            <label htmlFor="remember" className="ms-2 text-sm font-medium ">Remember me</label> */}
            <div className="d-flex  align-items-center ">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setRememberMeToggle(prev => !prev)
                }}
                style={{
                  marginRight: "4px",
                  width: "16px",
                  aspectRatio: 1,
                  flexWrap: "nowrap",
                  borderWidth: "1px",
                  borderColor: "#00f5e1bf",
                  display: "grid",
                  placeContent: "center",
                  backgroundColor: "transparent"

                }}
                className="text-cyan outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
                  style={{
                    width: "12px",
                    height: "12px",
                    visibility: rememberMeToggle ? 'visible' : 'hidden'
                  }} >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </button>
              <span>Remember me</span>
            </div>
            <button className="transparent border-free text-cyan">Forget Password ?</button>
          </div>
          <button
            type="submit"
            style={{
              fontSize: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
              borderRadius: "6px",
              marginTop: "40px",
              backgroundColor: "#00F5E1",
            }}
            className="d-flex justify-content-center  w-100">
            {
              !authLoading && formType === "login"
              && <span>Login</span>
            }
            {
              !authLoading && formType === "register"
              && <span>Register</span>
            }
            {
              authLoading &&
              <Spinner animation="border" variant="secondary" />
            }
          </button>

          <div
            style={{
              fontSize: "12px",
              borderRadius: "6px",
              marginTop: "40px",
            }}
            className="text-cyan">
            {
              formType === "login" &&
              <span>
                Already have an account
                <button onClick={() => { changeFormType() }} className="underline-hover text-cyan border-free">
                  Sign Up
                </button>
              </span>
            }
            {
              formType === "register" &&
              <span>
                Don't have an account
                <button onClick={() => { changeFormType() }} className="underline-hover text-cyan border-free">
                  Sign In
                </button>
              </span>
            }

          </div>

        </div>
      </form >
    </div >
  );
}

export default AuthPage;

function getUTCDate(dateString: string) {
  const d = new Date(dateString)
  return d.getTime()
}
/**
 
<Form.Group controlId="formBasicEmail">
            <Form.Label>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svg-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </Form.Label>
            <Form.Control type="text" color='white' placeholder="Enter username" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svg-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
 */