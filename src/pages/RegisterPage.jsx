import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"


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
    try {
      const res = await axios.post("http://localhost:5000/auth/register", formData)
      login(res.data.token)
      alert("registered successfully 🎉")


    } catch (err) {
      console.error(err)
      alert(" Fail to Register: " + (err.response?.data?.error?.message || "Unknown error"))
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <input name="username" type="text" placeholder="username" value={formData.username} onChange={handleChange} />
      <input name="password" type="password" placeholder="password" value={formData.password} onChange={handleChange} />
      <input name="email" placeholder="e-mail" value={formData.email} onChange={handleChange} />
      <button type="submit">Sign up!</button>
    </form>
  )
}


export default RegisterPage