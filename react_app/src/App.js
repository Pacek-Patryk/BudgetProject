import React, { Component } from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBTabs,
  MDBCardHeader,
  MDBTabsItem,
  MDBTabsLink,
} from 'mdb-react-ui-kit'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { value: 'name', accounts: [] }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    const data = { name: this.state.value }
    this.postAccount(data)
    event.preventDefault()
  }

  deleteAccount(_id) {
    fetch('http://localhost:9000/db/account/' + _id, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          accounts: this.state.accounts.filter((item) => item._id !== res),
        }),
      )
      .then(() => console.log('Account deleted'))
      .catch((err) => err)
  }

  postAccount(data) {
    fetch('http://localhost:9000/db/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => this.setState({ accounts: [...this.state.accounts, res] }))
      .then(() => console.log('Account added'))
      .catch((err) => err)
  }

  getAccounts() {
    fetch('http://localhost:9000/db/accounts')
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          accounts: res,
        }),
      )
      .then(() => console.log('Accounts received'))
      .catch((err) => err)
  }

  callDB() {
    fetch('http://localhost:9000/db')
      .then((res) => res.text())
      .then((res) => console.log(res))
      .catch((err) => err)
  }
  componentDidMount() {
    this.callDB()
    this.getAccounts()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Budget App</header>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <MDBRow className="row-cols-1 row-cols-md-4 g-4">
          {this.state.accounts.map((account) => {
            return (
              <MDBCol key={account._id}>
                <MDBCard
                  style={{ maxWidth: '25rem' }}
                  className="shadow-2-strong"
                >
                  <MDBCardHeader>
                    <MDBCardTitle>{account.name}</MDBCardTitle>
                    <MDBTabs className="card-header-tabs">
                      <MDBTabsItem>
                        <MDBTabsLink active>Info</MDBTabsLink>
                      </MDBTabsItem>
                      <MDBTabsItem>
                        <MDBTabsLink>Transactions</MDBTabsLink>
                      </MDBTabsItem>
                    </MDBTabs>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <MDBCardText>Amount: {account.amount}</MDBCardText>
                    <MDBBtn
                      color="danger"
                      onClick={() => this.deleteAccount(account._id)}
                    >
                      Delete
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            )
          })}
        </MDBRow>
      </div>
    )
  }
}

export default App
