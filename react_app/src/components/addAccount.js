import React from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCol,
  MDBCardHeader,
  MDBInput,
} from 'mdb-react-ui-kit'

class addAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: 'smth' }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  handleAccountPost = (event) => {
    const data = { name: this.state.value }
    fetch('http://localhost:9000/db/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => this.props.handleAccountAdd(res))
      .catch((err) => err)
    event.preventDefault()
  }

  render() {
    return (
      <MDBCol>
        <MDBCard style={{ maxWidth: '40rem' }} className="shadow-2-strong">
          <MDBCardHeader>
            <MDBCardTitle>Add Account</MDBCardTitle>
          </MDBCardHeader>
          <MDBCardBody>
            <form onSubmit={this.handleAccountPost}>
              <MDBInput
                label="Account Name"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <MDBCardText></MDBCardText>
              <MDBBtn type="submit" color="info">
                Submit
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    )
  }
}

export default addAccount
