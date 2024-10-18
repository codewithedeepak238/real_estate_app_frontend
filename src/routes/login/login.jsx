import "./login.scss";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

function Login() {
  const [newerr, setError] = useState("");
  const navigate = useNavigate();

  const {updateUser} = useContext(AuthContext);

  async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try{
      const data = await fetch("http://localhost:8000/auth/signin", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:email,
          password:password
        })
      });
      const res = await data.json();
      console.log(res.data);
      
      if(res.status===201){
        updateUser(res.data);
        navigate("/");
      }else{
        throw new Error("Invalid user credentials!");
      }
    }catch(err){
      setError(err.message);
      console.log(err.message)
    }
  }
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="email" type="text" placeholder="email" />
          <input name="password" type="password" placeholder="Password" />
          {
            newerr && <span>{newerr}</span>
          }
          <button>Login</button>
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
