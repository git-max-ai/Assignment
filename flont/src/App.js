import React from 'react';
import { useState } from 'react';
import './App.css';



const App = () => {
const[values,setValues]=useState({
    name:'',
    photo:'',
    email:'',
    mno:'',
    error:'',
    success:false,
    formData:new FormData()
})

const {name,formData,photo,email,mno,error,success}=values 

const onHandleChange=name=>event=>{
    const value=(name==='photo') ? event.target.files[0] : event.target.value;
    formData.set(name,value);
    console.log(value)
    setValues({...values,[name]:value})
}


    const api=(data)=>{
        return fetch('http://localhost:4000/userdashboard',{
            method:"POST",
            body:data
        }).then(response=>response.json()).catch(err=>console.log(err))
    }

    return (
        <div className="main">
            <h2>USER DASHBOARD</h2>
<div className="container" id="container">
  
  <div className="form-container personal-in-container">
    <form onSubmit={(e)=>e.preventDefault()}>
      <h1>Personal Information</h1>
      
      <input type="text" onChange={onHandleChange('name')} placeholder="Name" />
      <input type="email" onChange={onHandleChange('email')} placeholder="Email" />
      <input type="file" onChange={onHandleChange('photo')} placeholder="Choose profile pic" />
      <input type="number" onChange={onHandleChange('mno')} placeholder="Phone No." />
      
      <button onClick={()=>api(formData).then(response=>{
          if(response.error){
              setValues({...values,sucess:false,error:response.error})
          }
          else{
              setValues({...values,sucess:true,error:''})
          }
      })}>Update</button>
    </form>
  </div>
  <div className="overlay-container">
    <div className="overlay">
      
      <div className="overlay-panel overlay-right">
        <h1>Hello, Friend!</h1>
        <p>Enter your personal details and keep supporting us</p>
        
      </div>
    </div>
  </div>
</div>

{success && (
    <div>
        <h1>Your Data Succesfully saved</h1>
    </div>
)}

{error && (
    <div style={{color:'red'}}>
        <h1>{error}</h1>
    </div>
)}

        </div>
    )
}

export default App
