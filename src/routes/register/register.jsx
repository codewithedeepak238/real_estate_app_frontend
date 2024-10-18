import { useState } from "react";
import "./register.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [newerr, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");

    try{
      setError("");
      const data = await fetch("http://localhost:8000/auth/signup", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName:fullName,
          email:email,
          password:password
        })
      });
      const res = await data.json();
      console.log(res);
      
      if(res.status===201){
        navigate("/login");
      }else{
        throw new Error("Failed to create a user!")
      }
    }catch(err){
      setError(err.message);
      console.log(err.message)
    }

  }
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="fullName" type="text" placeholder="Username" required/>
          <input name="email" type="text" placeholder="Email" required/>
          <input name="password" type="password" placeholder="Password" required/>
          {
            newerr && <span>{newerr}</span>
          }
          <button >Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
