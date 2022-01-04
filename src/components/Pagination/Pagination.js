import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumber, setMaxPageNumber] = useState(5);
    const [minPageNumber, setMinPageNumber] = useState(0);

    return (
        <nav>
            <ul className='pagination'>
                <li>
                    <Button>prev</Button>
                </li>
                {
                    pageNumbers.map(number => {
                        if (number < maxPageNumber + 1 && number > minPageNumber) {
                            return (
                                <li key={number} className='page-item'>
                                    <a onClick={() => paginate(number)} href="!#" className='page-link'>{number}</a>
                                </li>
                            )
                        }
                    })
                }
                <li>
                    <Button>next</Button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;