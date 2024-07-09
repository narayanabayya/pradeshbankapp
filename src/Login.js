import { useState } from "react";
import axios from "axios";
import './Login.css';
import { useNavigate } from "react-router-dom";

const Login = ({UpdateCustomer}) => {
    const navigate = useNavigate();
    const [LoginError,setLoginError]=useState();
    const [LoginData, setLoginData] = useState({
        username: "",
        password: ""
    })


    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/api/login", LoginData);
            navigate('/account-details');
            UpdateCustomer(response.data.customer);
            console.log(response.data.customer);
        }
        catch(error) {
            console.error(error);
            setLoginError("Invalid Username or Password");
         }
    }

    const HandleClear = () => {
        setLoginData({
            username: "",
            password: ""
        })
        setLoginError("")
    }

    return (
        <div className="signup-container">
            <div className="image-container">
                
            </div>
            <div className="text-container">
                <form onSubmit={HandleSubmit}>
                    <h2>Login</h2>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={LoginData.username}
                        onChange={(e) => setLoginData({ ...LoginData, username: e.target.value })}
                        required
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        value={LoginData.password}
                        onChange={(e) => setLoginData({ ...LoginData, password: e.target.value })}
                        maxLength={8}
                        required
                    />

                    <button type="submit" >Login</button>
                    <button type="submit" onClick={HandleClear}>Clear</button>
                    <h3 className="err-msg">{LoginError}</h3>
                </form>
            </div>
        </div>
    )
}

export default Login;