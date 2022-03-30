import React, { Component } from 'react'
import AccountCard from './components/accountCard'
import AddAccount from './components/addAccount'
import { MDBRow, MDBContainer } from 'mdb-react-ui-kit'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { accounts: [] }
  }

  handleAccountDelete = (event) => {
    this.setState({
      accounts: this.state.accounts.filter((item) => item._id !== event),
    })
    console.log('Account deleted')
  }

  handleAccountAdd = (event) => {
    this.setState({ accounts: [...this.state.accounts, event] })
    console.log('Account added')
  }

  getAccounts() {
    fetch('http://localhost:9000/db/accounts')
      .then((res) => res.json())
      .then((res) =>
        this.setState({ accounts: [...this.state.accounts, ...res] }),
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
      <div className="App mt-4">
        <MDBContainer>
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            <AddAccount handleAccountAdd={this.handleAccountAdd} />
            {this.state.accounts.map((account) => {
              return (
                <AccountCard
                  account={account}
                  handleAccountDelete={this.handleAccountDelete}
                  key={account._id}
                />
              )
            })}
          </MDBRow>
        </MDBContainer>
      </div>
    )
  }
}

export default App
