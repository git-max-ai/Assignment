import React from 'react';
import { useState } from 'react';
import './App.css';
import axios from "axios";


const App = () => {

const[values,setValues]=useState({
    name:'',
    course:'',
    photo:'',
    email:'',
    phone:'',
    roll:'',
    error:'',
    success:false,
    formData:new FormData()
})

const {name,course,formData,photo,email,mno,error,success}=values 

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
            <h2>ASSIGNMENT</h2>
<div className="container" id="container">
  
  <div className="form-container personal-in-container">
    <form onSubmit={(e)=>e.preventDefault()}>
      <input type="text" onChange={onHandleChange('name')} placeholder="Name" />
      <input type="text" onChange={onHandleChange('course')} placeholder="Course" />
      <input type="email" onChange={onHandleChange('email')} placeholder="Email" />
      <input type="number" onChange={onHandleChange('roll')} placeholder="Roll No." />
      <input type="number" onChange={onHandleChange('phone')} placeholder="Phone No." />
      <input type="file" onChange={onHandleChange('photo')} placeholder="Question1" />
      
      <button onClick={()=>api(formData).then(response=>{
          if(response.error){
              setValues({...values,success:false,error:response.error})
          }
          else{
              setValues({...values,success:true,error:''})
          }
      })}>Submit</button>
    </form>
  </div>
  
</div>

{success && (
    <div style={{color:'black'}}>
        <h2>Your  Succesfully saved</h2>
        <h2>Refresh to Submit another Response!</h2>
    </div>
)}

{error && (
    <div style={{color:'black'}}>
        <h2>{error}</h2>
    </div>
)}

        </div>
    )
}

export default App
