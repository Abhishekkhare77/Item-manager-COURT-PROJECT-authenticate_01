import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import background from "../../images/backgroundImg.jpg"
import label from "../../images/label.png"
import '../../App.css'

const Login = () => {
    const navigateTo = useNavigate();
    const [passShow, setPassShow] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onFormSubmit = async (formData) => {

        const { email, password } = formData;

        const data = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            //whenever we send data to database, we convert it into string first
            body: JSON.stringify({
                email,
                password
            })
        });

        const res = await data.json();

        if (res.status === 201) {

            localStorage.setItem("usersdatatoken", res.result.token);
            navigateTo("/BookList");
            reset();

            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
            })

        }
        else {
            Swal.fire({
                title: 'Login Failed.',
                text: `${"Try Again!"}`,
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#0d6efd',
                cancelButtonColor: '#dc3545',
                confirmButtonText: 'Ok',
                cancelButtonText: 'No ',
            }).then((result) => {
                if (result.isConfirmed) {
                    reset();
                }
            })
        }
    }

    return (
        <>
        <div style={{ position:"fixed",top:"-50%",left:"-50%",width:"200%",height:"200%",zIndex:"-100"}}>
        <img src={background} style={{position:"absolute",top:"0",left:"0",right:"0",bottom:"0",margin:"auto",minWidth:"50%",minHeight:"50%"}}/>
        </div>
        {/* <div className='card-div' style={{ padding: "1em 3em 1em", maxWidth: "500px",height:"500px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <h2 style={{marginTop:"2rem",color:"white",textAlign:"center"}}>Library Management System, District Court Durg</h2>
            <img src={label} style={{height:"90%",width:"90%"}} />
        </div> */}
        {/* <div style={{position:"fixed",top:"0",left:"0",backgroundColor:"white",color:"blue",fontWeight:"bold",padding:"1.1rem",fontSize:"2rem",width:"100%"}}>
            <marquee className="text-primary">Library Management System, District Court Durg</marquee>
        </div> */}
        <div className='homePageDiv' style={{display:"flex",alignItems:"center"}}>

        <div className='card-div m-0 loginArea'  style={{ padding: "6em 6em 1em", maxWidth: "100vw",height:"100vh" ,backgroundColor:"white"}}>
            
            <h1 style={{ textAlign: "center", fontWeight: "600", color: "rgb(6, 0, 97)", lineHeight: "1.5" }}>Log In</h1>
            <p style={{ textAlign: "center", opacity: "0.6", color: "rgb(6, 0, 97)" }}>Welcome to CManager,<br />we are glad that you are back.</p>
            <form className="mt-4" onSubmit={handleSubmit(onFormSubmit)}>
                <div className="row">

                    <div className="mb-3 col-12">
                        <label htmlFor="email" className="form-label" style={{color:"rgb(6, 0, 97)"}}>
                            Email<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            id="email"
                            {...register("email", { pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, required: true })}
                            />
                        {errors.email?.type === "pattern" && (
                            <div className="invalid-feedback">Invalid Email Format</div>
                            )}
                        {errors.email?.type === "required" && (
                            <div className="invalid-feedback">This Field Is Required</div>
                            )}
                    </div>

                    <div className="mb-3 col-12">
                        <label htmlFor="password" className="form-label" style={{color:"rgb(6, 0, 97)"}}>
                            Password<span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="input-group mb-3">
                            <button className="password-btn btn " type="button" id="button-addon2" onClick={() => setPassShow(!passShow)}>
                                {!passShow ? "Show" : "Hide"}</button>
                            <input
                                type={!passShow ? "password" : "text"}
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                id="password"
                                name="password"
                                {...register("password", { maxLength: 15, minLength: 6, required: true })}
                                aria-describedby="button-addon2" />
                            {errors.password?.type === "minLength" && (
                                <div className="invalid-feedback">Password Should Be Of Minimum 6 Letters</div>
                                )}
                            {errors.password?.type === "maxLength" && (
                                <div className="invalid-feedback">Password Cannot Exceed 15 Letters</div>
                                )}
                            {errors.password?.type === "required" && (
                                <div className="invalid-feedback">This Field Is Required</div>
                                )}
                        </div>
                    </div>


                    <button className="btn btn-primary submit-button " type="submit">Login</button>

                    <p style={{ textAlign: "center", opacity: "0.6", color: "rgb(6, 0, 97)", marginTop: "1.3rem" }}>Don't have an Account? <NavLink to="/registerUser">Sign Up</NavLink> </p>
                    <p style={{ textAlign: "center", color: "rgb(6, 0, 97)", fontWeight: "500", marginTop: "-0.5rem" }}>Forgot Password? <NavLink to="/passwordReset">Click Here</NavLink> </p>
                </div>
            </form>
        </div>
        <div className='card-div emblemArea' style={{ marginLeft:"15rem", padding: "1em 3em 1em", maxWidth: "500px",height:"500px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <h2 className='text-primary' style={{marginTop:"2rem",color:"white",textAlign:"center"}}>Library Management System, District Court Durg</h2>
            <img src={label} style={{height:"90%",width:"90%"}} />
        </div>
        </div>
        </>
    )
}

export default Login