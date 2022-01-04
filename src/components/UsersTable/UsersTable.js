import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import ShowUsersTable from '../ShowUsersTable/ShowUsersTable';
import './Style.css';
const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [order, setOrder] = useState("ASC");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");


    const sorting = (col) => {
        if (order === "ASC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setUsers(sorted);
            setOrder("DSC")
        }
        if (order === "DSC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setUsers(sorted);
            setOrder("ASC")
        }
    }
    useEffect(() => {
        fetch('https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json')
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
    }, [])


    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currenPosts = users.slice(indexOfFirst, indexOfLast);


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    const totalPosts = users.length;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const [pageNumberLimit] = useState(5);
    const [maxPageNumber, setMaxPageNumber] = useState(5);
    const [minPageNumber, setMinPageNumber] = useState(0);

    const handleNextbtn = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumber) {
            setMaxPageNumber(maxPageNumber + pageNumberLimit);
            setMinPageNumber(minPageNumber + pageNumberLimit);
        }
    }
    const handlePrevbtn = () => {
        setCurrentPage(currentPage - 1);
        if ((currentPage - 1 > maxPageNumber) % pageNumberLimit === 0) {
            setMaxPageNumber(maxPageNumber - pageNumberLimit);
            setMinPageNumber(minPageNumber - pageNumberLimit);
        }
    }

    return (
        <div className='container'>
            <div style={{ width: '40%' }} className='mb-4'>
                <Form.Control type="text" placeholder='Search...'
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                    }}
                />
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th onClick={() => sorting("first_name")}>First Name</th>
                        <th onClick={() => sorting("last_name")}>Last Name</th>
                        <th onClick={() => sorting("age")}>Age</th>
                        <th onClick={() => sorting("email")}>Email</th>
                        <th onClick={() => sorting("web")}>Website</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currenPosts.filter((users) => {
                            if (searchTerm === "") {
                                return users;
                            }
                            else if (users.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || users.last_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return users;
                            }

                        }).map(user => <ShowUsersTable key={user.id} user={user} ></ShowUsersTable>)
                    }


                </tbody>

            </Table>
            {/* <Pagination postsPerPage={postsPerPage} totalPosts={users.length} paginate={paginate} /> */}

            <nav style={{ float: 'right' }}>
                <ul className='pagination'>
                    <li>
                        <Button onClick={handlePrevbtn}
                            disabled={currentPage === pageNumbers[0] ? true : false}
                        >prev</Button>
                    </li>
                    {
                        pageNumbers.map(number => {
                            if (number < maxPageNumber + 1 && number > minPageNumber) {
                                return (
                                    <li key={number} className='page-item active'>
                                        <Button onClick={() => paginate(number)} className='page-link'>{number}</Button>
                                    </li>
                                )
                            }
                        })
                    }
                    <li>
                        <Button onClick={handleNextbtn}
                            disabled={currentPage === pageNumbers[pageNumbers.length - 1] ? true : false}
                        >next</Button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default UsersTable;