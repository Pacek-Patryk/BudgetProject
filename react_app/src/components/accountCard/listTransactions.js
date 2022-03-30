import React from 'react'

import {
  MDBCol,
  MDBTabsPane,
  MDBRow,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
} from 'mdb-react-ui-kit'

class listTransactions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showTrash: false,
    }
  }

  handleTransactionDelete(_id) {
    const data = { _id: _id }
    fetch(
      'http://localhost:9000/db/account/' + this.props._id + '/transaction',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
      .then((res) => res.json())
      .then((res) => this.props.handleTransactionDelete(res))
      .catch((err) => err)
  }

  render() {
    return (
      <MDBTabsPane show={this.props.basicActive === 'History'}>
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
          {this.props.transactions.map((transaction) => {
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
                      onClick={() =>
                        this.handleTransactionDelete(transaction._id)
                      }
                    />
                  </MDBCol>
                </MDBRow>
              </MDBListGroupItem>
            )
          })}
        </MDBListGroup>
      </MDBTabsPane>
    )
  }
}

export default listTransactions
