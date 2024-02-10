import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PreferenceCard from "../../components/PreferenceCard/PreferenceCard";
import { interests, accessibility } from "../../constants/constants";
import "./index.css";

const Login = () => {
  //hardcoded login
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [page, setPage] = useState("login");
  const loginRef = useRef();
  const interestRef = useRef();
  const accessRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(page);
    pageChange();
  }, [page]);

  const handleChange = (e) => {
    console.log(e.target.id);
    if (e.target.id === "user") {
      setUser(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === "123" && password === "123") {
      localStorage.setItem("loggedIn", JSON.stringify(true));
      setPage("interest");
    } else {
      console.log("Invalid credentials");
    }
  };
  const pageChange = () => {
    if (page === "login") {
      loginRef.current.style.display = "flex";
      interestRef.current.style.display = "none";
      accessRef.current.style.display = "none";
    } else if (page === "interest") {
      loginRef.current.style.display = "none";
      interestRef.current.style.display = "flex";
      accessRef.current.style.display = "none";
    } else {
      loginRef.current.style.display = "none";
      interestRef.current.style.display = "none";
      accessRef.current.style.display = "flex";
    }
  };

  const handleInterest = () => {
    setPage("access");
  };

  const handleAccess = () => {
    navigate("/events");
  };

  return (
    <main className="loginContainer">
      <section className="loginSection" ref={loginRef}>
        <form onSubmit={handleLogin}>
          <label htmlFor={"user"}>
            <input
              id="user"
              type="text"
              placeholder="Username"
              value={user}
              onChange={handleChange}
            />
          </label>
          <label htmlFor={"password"}>
            <input
              id="password"
              type="password"
              placeholder="Password"
              style={{ "-webkit-text-security": "square" }}
              value={password}
              onChange={handleChange}
            />
          </label>
          <div>
            <input type="submit" value="Login" />
          </div>
        </form>
      </section>
      <section className="interestSection" ref={interestRef}>
        <div>
          {interests.map((interest, i) => {
            return (
              <PreferenceCard
                key={i}
                name={interest.name}
                icon={interest.icon}
              />
            );
          })}
        </div>
        <button onClick={handleInterest}>Next</button>
      </section>
      <section className="accessSection" ref={accessRef}>
        {accessibility.map((access, i) => {
          return (
            <PreferenceCard key={i} name={access.name} icon={access.icon} />
          );
        })}
        <button onClick={handleAccess}>Next</button>
      </section>
    </main>
  );
};

export default Login;
