import { useState } from 'react';
import axios from 'axios';
import './Registration.css'; 
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate();
    const [userExist, setUserExist] = useState();
    const [signUpData, setSignUpData] = useState({
        username: "",
        password: "",
        accNumber: "",
        branch: "",
        mobileNumber: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSignUpData({
            username: "",
            password: "",
            accNumber: "",
            branch: "",
            mobileNumber: ""
        })
        try {
            await axios.post("http://localhost:3001/api/signUp", signUpData);
            console.log("Signup successful")
            navigate("/Login");
        }
        catch (error) {
            console.error("Failed", error);
            setUserExist("User Already Exist")
        }
    }

    const handleClear = () => {
        setSignUpData({
            username: "",
            password: "",
            accNumber: "",
            branch: "",
            mobileNumber: ""
        })
        setUserExist("")
    }
    return (
        <div className='signup-container'>
            <div className='image-container'></div>
            <div className='text-container'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h2>Registration</h2>
                        <label>Username:</label>
                        <input
                            type='text'
                            value={signUpData.username}
                            onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                            required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type='password'
                            value={signUpData.password}
                            onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                            maxLength={8}
                            required
                        />
                    </div>
                    <div>
                        <label>Account Number</label>
                        <input
                            type='number'
                            value={signUpData.accNumber}
                            onChange={(e) => {
                                if (e.target.value.length <= 14) {
                                    setSignUpData({ ...signUpData, accNumber: e.target.value })
                                }
                            }
                            }
                            required
                        />
                    </div>
                    <div>
                        <label>Branch:</label>
                        <input
                            type='text'
                            value={signUpData.branch}
                            onChange={(e) => setSignUpData({ ...signUpData, branch: e.target.value })}
                            required />
                    </div>
                    <div>
                        <label>Registered Phone Number</label>
                        <input
                            type='number'
                            value={signUpData.mobileNumber}
                            onChange={(e) => {
                                if (e.target.value.length <= 10) {
                                    setSignUpData({ ...signUpData, mobileNumber: e.target.value })
                                }
                            }
                            }
                            required />
                    </div>
                    <div>
                        <button type='submit' >Sign Up</button>
                        <button type='submit' onClick={handleClear} >clear</button>
                        <h3>{userExist}</h3>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration