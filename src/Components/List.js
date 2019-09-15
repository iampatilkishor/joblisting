import React, { useState, useEffect } from 'react';

import { Table, Pagination } from 'react-bootstrap';

function JobList({ jobs }) {
    const [activePage, setActivePage] = useState(0);

    const updateActiveNumber = (newIndex) => {
        setActivePage(newIndex - 1);
    }

    let items = [];
    for (let number = 1; number <= (jobs.length / 10) + 1; number++) {
        items.push(
            <Pagination.Item key={number} onClick={() => updateActiveNumber(number)} active={number === +activePage + 1}>
                {number}
            </Pagination.Item>,
        );
    }

    const listRows = jobs.slice(activePage * 10, activePage * 10 + 10).map((job, index) =>
        (
            <tr key={job._id}>
                <td>{(activePage * 10) + index}</td>
                <td>{job.title}</td>
                <td>{job.companyname}</td>
                <td><a href={job.applylink}>Apply</a></td>
                <td>{job.location}</td>
                <td>{job.experience} </td>
                <td>{job.skills} </td>
            </tr>
        )
    )

    return (
        <div>
            <Table responsive="lg">
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Company Name</th>
                        <th>Apply Link</th>
                        <th>Location</th>
                        <th>Experience</th>
                        <th>Skills</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listRows
                    }
                </tbody>
            </Table>
            <br />
            <Pagination>
                {items}
            </Pagination>
        </div>
    )
}

export default JobList;