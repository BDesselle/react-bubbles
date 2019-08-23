import React from "react";
import axios from "axios";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [currentValue, setCurrentValue] = React.useState({
    username: "",
    password: ""
  });

  function loginHandler(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login/", currentValue)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubble");
      })
      .catch(err => console.log(err));
  }

  function handleChange(e) {
    setCurrentValue({ ...currentValue, [e.target.name]: e.target.value });
    console.log(currentValue);
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={loginHandler}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
