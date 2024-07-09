import { useState } from "react";
import axios from "axios";
import './DepositForm.css';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";


const WithDraw = ({ customer, updatedBalance }) => {
    const navigate = useNavigate();

    const [updateWithdraw, setupdateWithdraw] = useState({
        username: customer.username,
        accNumber: customer.accNumber,
        WithDrawAmount: "",
        WithDrawType: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(updateWithdraw)
        // console.log(customer)

        try {
            const response = await axios.post("http://localhost:3001/api/withdraw", updateWithdraw);
            updatedBalance(response.data.availbleBalance);
            swal({
                title: "Withdraw Succesful",
                text: `${updateWithdraw.WithDrawAmount} debited from your account`,
                icon: "success"
            })
            navigate('/account-details');


        }
        catch (error) {
            console.error(error);
        }

    }

    const handleClear = () => {
        setupdateWithdraw({
            WithDrawAmount: "",
            WithDrawType: ""
        })
    }

    return (
        <div className='signup-container'>
            <div className="image-container">

            </div>
            <div className="text-container">
                <form onSubmit={handleSubmit}>
                    <h2>Withdraw Form</h2>
                    <p className="username-para">UserName: <span>{customer.username}</span></p>
                    <p className="username-para">AccountDetails:<span>{customer.accNumber}</span></p>
                    <label>Withdraw Amount</label>
                    <input
                        type="text"
                        value={updateWithdraw.WithDrawAmount}
                        onChange={(e) => setupdateWithdraw({ ...updateWithdraw, WithDrawAmount: e.target.value })}
                        required
                    />
                    <div className="select-box">
                    <label>Withdraw Type</label>
                    <select 
                        value={updateWithdraw.WithDrawType}
                        onChange={(e) => setupdateWithdraw({ ...updateWithdraw, WithDrawType: e.target.value })}
                    >
                        <option>Current</option>
                        <option>Savings</option>
                    </select>
                    </div>

                    <button type="submit">Withdraw</button>
                    <button type="submit" onClick={handleClear}>Clear</button>

                </form>
            </div>
        </div>
    )
}

export default WithDraw;