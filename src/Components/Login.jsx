import React from "react";
import { useState, useRef } from "react";
import Header from "./Header";
import { validate } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSignInform = () => {
    setIsSignInForm(!isSignInForm);
  };


  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const navigate = useNavigate();
  const dispatch= useDispatch();

  const handleLogin = () => {
    console.log(email.current.value, password.current.value);
    const message = validate(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;
    console.log(
      email.current.value,
      password.current.value + "after validation"
    );

    if (isSignInForm) {
      // Sign up Logic Here
      console.log(email.current.value, password.current.value);
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/90449806?v=4",
          })
            .then(() => {
              // Profile updated!
              const {uid,email,displayName,photoURL} = auth.currentUser;
              dispatch(addUser({
                uid:uid,email:email,displayName:displayName,photoURL:photoURL
              }))
              navigate("/browse");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode + "-" + errorMessage);
            });

          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic Here
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a92a67ee-cd07-46a8-8354-c431a96a97b0/web/IN-en-20251103-TRIFECTA-perspective_8a65e995-9926-414c-83c5-f7cc9af10871_small.jpg"
          alt="banner"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute rounded-sm bg-gray-950/75 w-3/12 p-12 mx-auto my-36 right-0 left-0 "
      >
        <h1 className="text-[#fef9fd] font-bold text-3xl my-5 ">
          {isSignInForm ? "Sign Up" : "Sign In"}
        </h1>
        {isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 my-4 w-full text-[#fef9fd] bg-[#1c1313] rounded-sm"
          />
        )}
        <input
          type="text"
          placeholder="Email address"
          ref={email}
          className="p-3 my-4 w-full text-[#fef9fd] bg-[#1c1313] rounded-sm"
        />
        <input
          type="password"
          placeholder="password"
          ref={password}
          className="p-3 my-4 w-full text-[#fef9fd] bg-[#1c1313] rounded-sm"
        />
        <p className="text-red-600 text-bold">{errorMessage}</p>
        <button
          className="bg-[#e50914] text-[#fef9fd] p-3  my-5 w-full rounded-sm cursor-pointer hover:bg-red-700"
          onClick={handleLogin}
        >
          {isSignInForm ? "Sign Up" : "Sign In"}
        </button>
        <p
          className="text-white py-4 cursor-pointer"
          onClick={handleSignInform}
        >
          {isSignInForm
            ? "Already an User ? Sign In here"
            : "New on Netflix ? Sign Up here"}
        </p>
      </form>
    </div>
  );
};

export default Login;
