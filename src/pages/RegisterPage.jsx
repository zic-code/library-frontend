import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { Form, Button, Container, Card } from "react-bootstrap";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const { login, token } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token, navigate]);

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(data => ({ ...data, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log("BASE_URL= ",BASE_URL )
    try {
      const res = await axios.post(`${ BASE_URL }/auth/register`, formData)
      login(res.data.token)
      alert("registered successfully 🎉")


    } catch (err) {
      console.error(err)
      alert(" Fail to Register: " + (err.response?.data?.error?.message || "Unknown error"))
    }

  }

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: "22rem" }} className="p-4 shadow">
        <h3 className="text-center mb-3">Sign up.</h3>
        <Form onSubmit={handleSubmit}>
          
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>          

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
}


export default RegisterPage