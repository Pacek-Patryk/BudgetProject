import React from 'react'

import { MDBCardText, MDBBtn, MDBTabsPane } from 'mdb-react-ui-kit'

class mainAccountCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovered: true,
    }
  }

  handleAccountDelete(_id) {
    fetch('http://localhost:9000/db/account/' + _id, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => this.props.handleAccountDelete(res))
      .catch((err) => err)
  }

  render() {
    return (
      <MDBTabsPane show={this.props.basicActive === 'Main'}>
        <MDBCardText>Amount: {this.props.accountAmount}</MDBCardText>
        <MDBBtn
          size="lg"
          onClick={() => {
            this.props.handleBasicClick('AddNew')
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
            onClick={() => this.handleAccountDelete(this.props._id)}
          >
            Delete
          </MDBBtn>
        </div>
      </MDBTabsPane>
    )
  }
}

export default mainAccountCard
