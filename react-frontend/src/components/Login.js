import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // is isAuthenticated ? redirect to home page : login
    if (isAuthenticated) {
      window.location = "/";
    }
    const response = await fetch("http://localhost:3000/api/v2/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const content = await response.json();
    if (content.error) {
      setError(content.error);
      toast.error(error);
    } else {
      // console.log(content);
      toast.success("Login Successful");
      localStorage.setItem("token", content.token);
      setIsAuthenticated(true);
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "90vh" }}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Header>
            {" "}
            <h4>Login</h4>{" "}
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  aria-required={true}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  aria-required={true}
                />
              </Form.Group>
            </Form>

            <Button
              className={"w-100"}
              variant="info"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">
            Don't Have an Account?{" "}
            <a href={"/signup"} style={{ textDecoration: "none" }}>
              Click Here to Signup
            </a>{" "}
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
}

export default Login;