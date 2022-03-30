import React from 'react'
import AddTransaction from './accountCard/addTransaction'
import ListTransactions from './accountCard/listTransactions'
import MainAccountCard from './accountCard/mainAccountCard'

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBTabs,
  MDBCardHeader,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
} from 'mdb-react-ui-kit'

class accountCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      basicActive: 'Main',
      accountAmount: this.props.account.amount,
      transactions: [],
    }
  }

  handleBasicClick = (value) => {
    if (value === this.state.basicActive) {
      return
    }
    this.setState({ basicActive: value })
  }

  handleTransactionAdd = (event) => {
    this.setState({
      transactions: [
        ...this.state.transactions,
        event.transaction[event.transaction.length - 1],
      ],
    })
    this.setState({ accountAmount: event.amount })
    console.log('Transaction added')
  }

  getTransactions(_id) {
    fetch('http://localhost:9000/db/account/' + _id + '/transactions')
      .then((res) => res.json())
      .then((res) => {
        this.setState({ transactions: [...this.state.transactions, ...res] })
        console.log('Transactions received')
      })
      .catch((err) => err)
  }

  componentDidMount() {
    this.getTransactions(this.props.account._id)
  }

  render() {
    return (
      <MDBCol>
        <MDBCard style={{ maxWidth: '40rem' }} className="shadow-2-strong">
          <MDBCardHeader>
            <MDBCardTitle>{this.props.account.name}</MDBCardTitle>
            <MDBTabs className="card-header-tabs">
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => this.handleBasicClick('Main')}
                  active={this.state.basicActive === 'Main'}
                >
                  Main
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => this.handleBasicClick('History')}
                  active={this.state.basicActive === 'History'}
                >
                  History
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>
          </MDBCardHeader>
          <MDBCardBody>
            <MDBTabsContent>
              <MainAccountCard
                handleBasicClick={this.handleBasicClick}
                handleAccountDelete={this.props.handleAccountDelete}
                accountAmount={this.state.accountAmount}
                _id={this.props.account._id}
                basicActive={this.state.basicActive}
              />
              <ListTransactions
                transactions={this.state.transactions}
                _id={this.props.account._id}
                basicActive={this.state.basicActive}
              />
              <AddTransaction
                handleTransactionAdd={this.handleTransactionAdd}
                handleBasicClick={this.handleBasicClick}
                _id={this.props.account._id}
                basicActive={this.state.basicActive}
              />
            </MDBTabsContent>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    )
  }
}

export default accountCard
