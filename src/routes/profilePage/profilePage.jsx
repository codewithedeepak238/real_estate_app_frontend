import { useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import nouser from "../../../public/nouser.png"

function ProfilePage() {
  const navigate = useNavigate();

  const {currentUser, updateUser} = useContext(AuthContext);
  
  async function logOut() {
    try{
      const data = await fetch("http://localhost:8000/auth/logout", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const res = await data.json();
      if(res.status === 200){
        updateUser(null);
        navigate("/login");
      }else{
        throw new Error("Logout unsuccessfull")
      }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || nouser}
                alt="User Image"
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={logOut}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
