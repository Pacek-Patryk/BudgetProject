import React from 'react'
import {
  MDBBtn,
  MDBTabsPane,
  MDBSwitch,
  MDBInput,
  MDBInputGroup,
  MDBRow,
} from 'mdb-react-ui-kit'

class addTransaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: true,
      amountChange: '',
    }
  }

  handleCheckClick = () => {
    this.setState({ checked: !this.state.checked })
  }

  handleAmountChange = (event) => {
    let value = Math.abs(event.target.value)
    this.setState({ amountChange: value })
  }

  handleTransactionPost = (event) => {
    const data = { amount: this.state.amountChange, minus: this.state.checked }
    const _id = this.props._id
    fetch('http://localhost:9000/db/account/' + _id + '/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        this.props.handleTransactionAdd(res)
        this.setState({ amountChange: '', checked: true })
      })
      .catch((err) => err)
    event.preventDefault()
  }

  render() {
    return (
      <MDBTabsPane show={this.props.basicActive === 'AddNew'}>
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
                  this.state.checked ? { color: 'red' } : { color: 'green' }
                }
                onChange={this.handleAmountChange}
              />
            </MDBInputGroup>
          </MDBRow>
          <MDBBtn
            type="submit"
            block
            onClick={() => this.props.handleBasicClick('Main')}
          >
            Process
          </MDBBtn>
        </form>
      </MDBTabsPane>
    )
  }
}

export default addTransaction
