import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import './DepositForm.css';
import { useNavigate } from "react-router-dom";

const DepositForm = ({ customer, updatedBalance }) => {
    const navigate = useNavigate();
    const [deposit, setDeposit] = useState({
        username: customer.username,
        accNumber: customer.accNumber,
        date: "",
        amount: '',
        type: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(deposit);
        try {
            const response = await axios.post("http://localhost:3001/api/deposit", deposit);
            updatedBalance(response.data.availbleBalance);
            swal({
                title: "Deposit Succesful",
                text: `${deposit.amount} deposited to your account`,
                icon: "success"
            })
            navigate('/account-details');
        }
        catch (error) {
            console.error(error);
        }

    }
    const handleClear = () => {
        setDeposit({
            date: "",
            amount: '',
            type: ''
        })
    }
    return (
        <div className='signup-container'>
            <div className="image-container">

            </div>
            <div className="text-container">
                <form onSubmit={handleSubmit}>
                    <h2>DepositForm</h2>
                    <p className="username-para">Username:<span>{customer.username}</span></p>
                    <p className="username-para">Account Number:<span>{customer.accNumber}</span></p>
                    <label>Date</label>
                    <input
                        type="date"
                        value={deposit.date}
                        onChange={(e) => { setDeposit({ ...deposit, date: e.target.value }) }}
                        required
                    />
                    <label>Deposit Amount</label>
                    <input
                        type="number"
                        value={deposit.amount}
                        onChange={(e) => { setDeposit({ ...deposit, amount: e.target.value }) }}
                        required
                    />
                    <div className="select-box">
                    <label>Account Type:</label>
                    <select required
                        value={deposit.type}
                        onChange={(e) => { setDeposit({ ...deposit, type: e.target.value }) }}>
                        <option></option>
                        <option>Current</option>
                        <option>Savings</option>
                    </select>
                    </div>
                    <button type="submit">submit</button>
                    <button type="submit" onClick={handleClear}>clear</button>

                </form>
            </div>
        </div>
    )
}

export default DepositForm;