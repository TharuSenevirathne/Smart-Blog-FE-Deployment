import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login , getMyDetails} from '../services/auth';
import { useAuth } from '../context/authContext';

export default function Login() {

  const navigate = useNavigate();

  const {setUser} = useAuth();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  async function handleSignin(e: React.FormEvent){
    e.preventDefault();

    if(!email || !password){
      alert('All Fields Required!');
      return;
    }

    try{
      const data: any = await login(email, password);

      if(data?.data?.accessToken){
        // access token
        await localStorage.setItem('accessToken',data.data.accessToken);
        // refresh token
        await localStorage.setItem('refreshToken',data.data.refreshToken);
        setUser(data.data.user);

        const details = await getMyDetails();
        await localStorage.setItem('userDetails',JSON.stringify(details));
        navigate('/home');
      }else{
        alert("Login failed! , plz check your credentials");
      }
      
    }
    catch(e){
      console.error("Login error: ",e);
      alert("Login failed! , plz check your credentials");
    }

  }

  return (
    <form>
        <h1>Login</h1>
        <label>Email : 
        <input type='email' placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
        </label>
        <br></br>
        <br></br>

        <label >Password : 
        <input type='password' placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </label>
        <br></br>
        <br></br>
        <button onClick={handleSignin} type='submit'>Login</button>
    </form>
  )
}