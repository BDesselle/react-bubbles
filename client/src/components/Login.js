import React from "react";
import axios from "axios";
import { Container, Header, Button, Form, Grid } from "semantic-ui-react";

const Login = props => {
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
      <Container>
        <Header as="h1" dividing>
          <Header.Content>Welcome to the Color Bubble App!</Header.Content>
        </Header>
        <Grid centered columns={2}>
          <Grid.Column>
            <Form onSubmit={loginHandler}>
              <Form.Field>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </Form.Field>
              <Button compact type="submit">
                Login
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
