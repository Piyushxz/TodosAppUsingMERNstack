import axios from "axios";
import { useState } from "react";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userAlreadyFound, setUserAlreadyFound] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        console.log(username, password);
        try {
            const response = await axios.post("http://localhost:3006/signup", { username, password });
            console.log(response);
            if (response.status === 409) {
                console.log("User already found");
                setUserAlreadyFound(true);
            } else {
                setUsername('');
                setPassword('');
                setUserAlreadyFound(false);
            }
        } catch (err) {
            console.error('Error:', err);
            if (err.response && err.response.status === 409) {
                setUserAlreadyFound(true);
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSignIn}>
                <div className="container">
                    <div className="h-container">
                        <h2 className="heading-2">Sign Up</h2>
                    </div>

                    <div className="inp-container">
                        <input 
                            value={username} 
                            onChange={handleUsernameChange}
                            className="inp" 
                            type="text" 
                            placeholder="Username"
                        />
                        <input 
                            value={password}
                            onChange={handlePasswordChange} 
                            className="inp" 
                            type="password" 
                            placeholder="Password"
                        />
                    </div>

                    <div>
                        {userAlreadyFound && <span className="error">User already exists</span>}
                    </div>

                    <button className="btn">Submit</button>
                </div>
            </form>
        </>
    );
};

export default SignUp;
