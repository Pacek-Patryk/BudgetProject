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
} from 'mdb-react-ui-kit'

class accountCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      basicActive: 'Main',
      isHovered: true,
      checked: true,
      amountChange: '0',
      transactions: [],
    }
  }

  handleBasicClick = (event) => {
    if (event === this.state.basicActive) {
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
  }

  handleTransactionPost = (event) => {
    const data = { amount: this.state.amountChange, minus: this.state.checked }
    const _id = this.props.key
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
                <MDBCardText>Amount: {this.props.account.amount}</MDBCardText>
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
              <MDBTabsPane
                show={this.state.basicActive === 'History'}
              ></MDBTabsPane>
            </MDBTabsContent>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    )
  }
}

export default accountCard
