import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
const ShowSingleUserDetails = () => {
    const { userId } = useParams();
    const [user, setUser] = useState([]);
    useEffect(() => {
        fetch('https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json')
            .then(res => res.json())
            .then(data => {
                setUser(data[userId - 1])
            })
    }, [user])
    return (
        <div className='container'>
            <div className='d-flex '>
                <h2><Link className='m-2' to="/"><FaArrowLeft /></Link></h2>
                <h2>  Details: {user.first_name} {user.last_name}</h2>
            </div>

            <p>First Name: <strong>{user.first_name}</strong></p>
            <hr />
            <p>Last Name: <strong>{user.last_name}</strong></p>
            <hr />
            <p>Company_name: <strong>{user.company_name}</strong></p>
            <hr />
            <p>City: <strong>{user.city}</strong></p>
            <hr />
            <p>State: <strong>{user.state}</strong></p>
            <hr />
            <p>Zip: <strong>{user.zip}</strong></p>
            <hr />
            <p>Email: <strong>{user.email}</strong></p>
            <hr />
            <p>Web: <strong>{user.web}</strong></p>
            <hr />
            <p>Age: <strong>{user.age}</strong></p>
            <hr />
        </div>
    );
};

export default ShowSingleUserDetails;