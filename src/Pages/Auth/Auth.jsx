import React, { useContext, useState } from "react";
import classes from "./Auth.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../Utility/fireBase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ClipLoader from "react-spinners/ClipLoader";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const [{ user }, dispatch] = useContext(DataContext);
  // console.log(email,  password);
  console.log(user);
  const navStateData = useLocation()
  console.log(navStateData);
  const handleClick = (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    if (e.target.name === "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: "SET_USER",
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });

          navigate( navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          // console.log(err.message);
          setLoading({ ...loading, signIn: false });

          setError(err.message);
        });
    } else {
      setLoading({ ...loading, signUp: true });

      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: "SET_USER",
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });

          navigate("/", { replace: true });
        })
        .catch((err) => {
          // console.log(err);
          setLoading({ ...loading, signUp: false });

          setError(err.message);
        });
    }
  };
  return (
    <section className={classes.auth_container}>
      <Link to={"/"}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8eSb4lGANjKmXnj-qOz6dX-tvglN7u-0STA&s"
          alt="Amazon-logo"
        />
      </Link>
      <div>
        <p> Sign-in</p>
        {navStateData?.state?.msg && <small style={{padding:'5px 15px',textAlign:'center',color:'red',fontWeight:'bold'}} >{navStateData?.state?.msg}</small>}
        <form>
          <label htmlFor="email">E-mail</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className={` ${error ? classes.error_border : ""}`}
            type="email"
            id="email"
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className={`${error ? classes.error_border : ""}`}
            type="password"
            id="password"
          />
          <button type="button" name="signin" onClick={handleClick}>
            {loading.signIn ? <ClipLoader size={25} /> : "Sign In"}
          </button>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
            aspernatur dignissimos veniam velit deleniti eum non, aut, ullam
            totam, maiores consequatur. Earum fugiat atque natus nihil{" "}
          </p>
          <button type="button" onClick={handleClick} name="signup">
            {loading.signUp ? (
              <ClipLoader size={25} />
            ) : (
              "Create your Amazon Account"
            )}
          </button>
          {error && (
            <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
          )}
        </form>
      </div>
    </section>
  );
};

export default Auth;
