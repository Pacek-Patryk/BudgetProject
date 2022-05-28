import React from 'react'
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBIcon, 
  MDBContainer,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBCollapse
} from 'mdb-react-ui-kit'
import { useNavigate, useLocation } from 'react-router-dom'


class header extends React.Component {

  constructor(props) {
    super(props)
    this.state = { main: this.props.main }
  }

  render() {
    if(this.state.main){
      return (
      <MDBNavbar expand='lg' light bgColor='white' sticky>
        <MDBContainer fluid>
            <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'><MDBIcon far icon="moon" /></MDBNavbarLink>
              </MDBNavbarItem>
              </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
      )
    }
    return (
      <MDBNavbar expand='lg' light bgColor='white' sticky>
        <MDBContainer fluid>
            <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'><MDBIcon far icon="moon" /></MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem >
                <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link'>
                  <MDBIcon far icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownLink>Settings</MDBDropdownLink>
                  </MDBDropdownItem>                  
                  <MDBDropdownItem>
                    <MDBDropdownLink>Log Out</MDBDropdownLink>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    )
  }
}

export default header
