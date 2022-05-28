import React, { Component } from 'react'
import { useNavigate } from "react-router-dom"
import { MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
MDBContainer } from 'mdb-react-ui-kit'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { userName: "", password: "" }
  }

  generateError = (error) => console.log(error)

  handleUserNameChange = (event) => {
    this.setState({ userName: event.target.value })
  }
  
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleUserPost = (event) => {
    const data = this.state
    fetch('http://localhost:9000/db/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.errors){
          const {userName,password} = res.errors
          if (userName) this.generateError(userName)
          else if(password) this.generateError(password)
        }
        else {
          this.props.navigate("/")
        }
      })
      .catch((err) => err)
    event.preventDefault()
  }

  render() {
    return (
      <MDBContainer className='d-flex justify-content-center'>
         <form className='w-25 mt-5' onSubmit={this.handleUserPost}>

          <MDBInput className='mb-4' label='Username' type="text" value={this.state.userName}
                onChange={this.handleUserNameChange}
              />
          <MDBInput className='mb-4' label='Password' type="password"value={this.state.password}
                onChange={this.handlePasswordChange}
              />

          <MDBBtn type='submit' className='mb-4' block>
            Log in
          </MDBBtn>

          <div className='text-center'>
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
          </div>
        </form>
      </MDBContainer>
     
    )
  }
}

export default function LoginRouter() {
  const navigate = useNavigate();
  return( <Login navigate={navigate} />);
}
