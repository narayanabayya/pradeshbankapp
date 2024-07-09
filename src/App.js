import { Route,  Routes, Link,useNavigate } from 'react-router-dom';

import './App.css';
import Registration from './Registration';
import Home from './Home';
import Login from './Login'
import AccountDetails from './AccountDetails';
import { useState } from 'react';
import DepositForm from './DepositForm';
import WithDraw from './withdraw';


function App() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState();
  const [newBalance , setNewBalance]= useState(0);

  const updatedBalance =(balance)=>{
    setNewBalance(balance)
  }
  console.log("new balance is:",newBalance);

  const UpdateCustomer = (userData) => {
    setCustomer(userData);
    console.log(userData)
  }

  const handleLogOut=()=>{
    navigate('/Login')
    setCustomer(null)
  }

  return (
      <div className="App">
        <ul className="nav-list">
          <li>
            <Link className="nav-link" to='/'>Home</Link>
          </li>
          {!customer ?
            (<><li>
              <Link className="nav-link" to='/Registration'>Registration</Link>
            </li>
              <li>
                <Link className="nav-link" to='/Login'>Login</Link>
              </li>
            </>) :
            (<>
              <li>
                <Link className="nav-link" to='/account-details'>AccountDetails</Link>
              </li>
              <li><Link className="nav-link" to='/depositform'>Deposit</Link></li>
              <li><Link className="nav-link" to='/withdraw'>Withdraw</Link></li>
              <li><button className='login' onClick={handleLogOut}>Logout</button></li>
            </>)
          }
        </ul>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/login' element={<Login UpdateCustomer={UpdateCustomer} />} />
          <Route path='/account-details' element={<AccountDetails customer={customer} newBalance={newBalance} />} />
          <Route path='/depositform' element={<DepositForm customer={customer} updatedBalance={updatedBalance}/>} />
          <Route path='/withdraw' element={<WithDraw customer={customer} updatedBalance={updatedBalance} />} />

        </Routes>
      </div>
    
  );
}

export default App;
