import './AccountDetails.css'
const AccountDetails = ({ customer, newBalance }) => {
    console.log(customer)
    console.log(newBalance)

    return (
        <div className='signup-container'>
            <div className="image-container">

            </div>
            <div className="text-container">

                <table >
                    <caption>Account Details</caption>

                    <tr>
                        <th> Username:</th><td><b> <span>{customer.username}</span></b></td>
                    </tr>
                    <tr>
                        <th>Account Number:</th><td><b> <span>{customer.accNumber} </span></b></td>
                    </tr>
                    <tr>
                        <th>Branch:</th><td><b> <span>{customer.branch}</span></b></td>
                    </tr>
                    <tr>
                        <th>Phone Number:</th><td><b> <span>{customer.mobileNumber}</span></b></td>
                    </tr>
                    <tr>
                        <th> Available Balance:</th>
                        <td><b><span style={{ color: "green", fontSize: "24px" }}>
                            {/* {newBalance === 0 ? customer.availableBalance : newBalance} */}
                            {newBalance===0 ? customer.availbleBalance : newBalance}
                        </span>
                            <span>Balance</span></b></td>
                    </tr >
                </table >
            </div>
        </div >
    )
}

export default AccountDetails;