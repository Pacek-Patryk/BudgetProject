import React, { Component , useEffect} from 'react'
import AccountCard from '../components/accountCard'
import AddAccount from '../components/addAccount'
import { MDBRow, MDBContainer } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'


class Secret extends Component {
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

  componentDidMount() {
    this.getAccounts()
  }

  render() {
    return (
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
    )
  }
}

export default function SecretRouter() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([])
  useEffect(() => {
    const verifyUser = async () => {
      if(!cookies.jwt) {
        navigate("/login")
      } else {
        await fetch('http://localhost:9000/db/checkuser', {
        method: 'post',
        credentials: 'include'
      })
      .then((res) => res.json())
      .then((res) => {
        if(!res.status) {
          removeCookie("jwt")
          this.props.navigate("/login")
        } else {
          navigate("/")
        }
      })
      .catch((err) => err)
      }
    }
    verifyUser();
  }, [cookies, navigate, removeCookie]
  )
  
  return (<Secret />)
}
