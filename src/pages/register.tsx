// import axios from "axios";
import React, { type FormEvent } from "react";
import { register } from "../services/auth";

export default function Register() {

    // state = component state
    // useState is react hook for managing state

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [role, setRole] = React.useState('user');

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault(); //ignore page refresh

        //Validation
        if(!firstName || !lastName || !email || !password || !role || !confirmPassword) {
            alert('Please fill all the fields');
            return;
        }

        if(password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        //API Call
        try {
            const obj = {
                firstName,
                lastName,
                email,
                password,
                role
            }
            const response = await register(obj);
            console.log(response.data);
            console.log(response.message);

            alert("Registerion Successfully!");


            // const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
            //     firstName, //firstName : firstName
            //     lastName,
            //     email,
            //     password,
            //     role
            // }
            
            // ,
            // {
            //     headers: {
            //         'Content-Type': 'application/json',
            //     }
            // }).then(res => {
            //     console.log(res.data);
            // }).catch(err => {
            //     console.log(err);
            // })
        } 
        catch (error:any) {
            console.log("Error registering user :" , error.response.data);
            alert(error.response.data.message);
        }
    }


    return (
        <div>
            <h1>Register as User or Author</h1>
            <label>Last Name :
            <input type="text" placeholder="Enter Your First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
            </label>
            <br></br>
            <br></br>

            <label>Last Name :
            <input type="text" placeholder="Enter Your Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
            </label>
            <br></br>
            <br></br>

            <label>Email :
            <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </label>
            <br></br>
            <br></br>

            <label>Password :
            <input type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </label>
            <br></br>
            <br></br>

            <label>Confirm Password : 
            <input type="password" placeholder="Enter Your Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input></label>
            <br></br>
            <br></br>

            <label>Role :
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="author">Author</option>
            </select>
            </label>
            <br></br>
            <br></br>

            <button type="submit" onClick={handleRegister}>Submit</button>
            
        </div>
    );
}