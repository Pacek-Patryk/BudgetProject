import React from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCol,
  MDBTabs,
  MDBCardHeader,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
  MDBTabsContent,
  MDBSwitch,
  MDBInput,
  MDBInputGroup,
  MDBRow,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
} from 'mdb-react-ui-kit'

class accountCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      basicActive: 'Main',
      isHovered: true,
      checked: true,
      amountChange: '0',
      accountAmount: this.props.account.amount,
      transactions: [],
      showTrash: false,
    }
  }

  handleBasicClick = (value) => {
    if (value === this.state.basicActive) {
      return
    }
    this.setState({ basicActive: value })
  }

  handleCheckClick = () => {
    this.setState({ checked: !this.state.checked })
  }

  handleAmountChange = (event) => {
    this.setState({ amountChange: event.target.value })
  }

  handleTransactionAdd = (event) => {
    this.setState({ transactions: [...this.state.transactions, event] })
    let change
    if (event.minus) change = this.state.accountAmount - event.amount
    else change = this.state.accountAmount + event.amount
    this.setState({ accountAmount: change })
  }

  handleTransactionPost = (event) => {
    const data = { amount: this.state.amountChange, minus: this.state.checked }
    const _id = this.props.account._id
    this.postTransaction(data, _id)
    event.preventDefault()
  }

  postTransaction(data, _id) {
    fetch('http://localhost:9000/db/account/' + _id + '/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => this.handleTransactionAdd(res))
      .then(() => console.log('Transaction added'))
      .catch((err) => err)
  }

  deleteAccount(_id) {
    fetch('http://localhost:9000/db/account/' + _id, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => this.props.handleAccountDelete(res))
      .then(() => console.log('Account deleted'))
      .catch((err) => err)
  }

  getTransactions(_id) {
    fetch('http://localhost:9000/db/account/' + _id + '/transactions')
      .then((res) => res.json())
      .then((res) =>
        this.setState({ transactions: [...this.state.transactions, ...res] }),
      )
      .then(() => console.log('Transactions received'))
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
              <MDBTabsPane show={this.state.basicActive === 'Main'}>
                <MDBCardText>Amount: {this.state.accountAmount}</MDBCardText>
                <MDBBtn
                  size="lg"
                  onClick={() => {
                    this.handleBasicClick('AddNew')
                  }}
                >
                  New
                </MDBBtn>
                <div className="d-flex justify-content-end">
                  <MDBBtn
                    size="sm"
                    color="danger"
                    onMouseEnter={() => this.setState({ isHovered: false })}
                    onMouseLeave={() => this.setState({ isHovered: true })}
                    outline={this.state.isHovered}
                    onClick={() => this.deleteAccount(this.props.account._id)}
                  >
                    Delete
                  </MDBBtn>
                </div>
              </MDBTabsPane>
              <MDBTabsPane show={this.state.basicActive === 'AddNew'}>
                <form onSubmit={this.handleTransactionPost}>
                  <MDBRow className="ms-2">
                    <MDBSwitch
                      checked={this.state.checked}
                      label="Spent"
                      onChange={this.handleCheckClick}
                    />
                  </MDBRow>
                  <MDBRow className="my-2">
                    <MDBInputGroup
                      textBefore={this.state.checked ? '–' : '+'}
                      className="mb-3 mt-2"
                    >
                      <MDBInput
                        label="Amount"
                        type="number"
                        value={this.state.amountChange}
                        labelStyle={
                          this.state.checked
                            ? { color: 'red' }
                            : { color: 'green' }
                        }
                        onChange={this.handleAmountChange}
                      />
                    </MDBInputGroup>
                  </MDBRow>

                  <MDBBtn type="submit" block>
                    Process
                  </MDBBtn>
                </form>
              </MDBTabsPane>
              <MDBTabsPane show={this.state.basicActive === 'History'}>
                <MDBListGroup
                  flush
                  style={{ minWidth: '22rem' }}
                  className="text-center"
                >
                  <MDBListGroupItem>
                    <MDBRow className="text-black-50">
                      <MDBCol size="1"></MDBCol>
                      <MDBCol size="4">Amount</MDBCol>
                      <MDBCol size="6">Date</MDBCol>
                    </MDBRow>
                  </MDBListGroupItem>
                  {this.state.transactions.map((transaction) => {
                    return (
                      <MDBListGroupItem key={transaction._id}>
                        <MDBRow
                          onMouseEnter={(e) => {
                            this.setState({ showTrash: true })
                          }}
                          onMouseLeave={(e) => {
                            this.setState({ showTrash: false })
                          }}
                        >
                          <MDBCol
                            size="1"
                            className={
                              transaction.minus ? 'text-danger' : 'text-success'
                            }
                          >
                            {transaction.minus ? '–' : '+'}
                          </MDBCol>
                          <MDBCol size="4">{transaction.amount}</MDBCol>
                          <MDBCol size="6">{transaction.date}</MDBCol>
                          <MDBCol size="1">
                            <MDBIcon
                              className={this.state.showTrash ? '' : 'd-none'}
                              far
                              icon="trash-alt"
                              size="sm"
                            />
                          </MDBCol>
                        </MDBRow>
                      </MDBListGroupItem>
                    )
                  })}
                </MDBListGroup>
              </MDBTabsPane>
            </MDBTabsContent>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    )
  }
}

export default accountCard
