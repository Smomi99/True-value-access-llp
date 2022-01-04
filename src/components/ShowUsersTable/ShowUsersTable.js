import React from 'react';
import { Link } from 'react-router-dom';

const ShowUsersTable = (props) => {

    const { first_name, last_name, age, email, web, id } = props.user;
    function newDoc() {
        window.open(`${web}`)
    }
    return (
        <tr>
            <td><Link to={`/users/${id}`} className='text-decoration-none text-white'>{first_name}</Link></td>
            <td>{last_name}</td>
            <td>{age}</td>
            <td>{email}</td>
            <td onClick={newDoc}>{web}</td>
        </tr>
    );
};

export default ShowUsersTable;