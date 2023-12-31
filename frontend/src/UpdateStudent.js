import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';


function UpdateStudent() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();
    // const apiUrl = process.env.CRUD_APP_BASE_URL;

    function handleSumbit(event){
        event.preventDefault();
        axios.put("https://fscrud-app.onrender.com/update/"+id, {name, email})
        .then(res=>{
            console.log(res.data);
            navigate('/');
        }).catch(err=>console.log(err));
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className="w-50 bg-white rounded p-3">
            <form onSubmit={handleSumbit}>
                <h2>Update Student</h2>
                <div className="mb-2">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='Enter Name' className='form-control' 
                    onChange={e=> setName(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Enter Email' className='form-control' 
                    onChange={e=> setEmail(e.target.value)} />
                </div>
                <button className='btn btn-success'>UPDATE</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateStudent
