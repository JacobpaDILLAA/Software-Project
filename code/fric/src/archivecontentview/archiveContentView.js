import * as React from 'react'
import GeneralView from '../generalView/generalView'
import 'react-bootstrap'
import SortImage from '../assets/updownarrow.png'
import { Button, Table } from 'react-bootstrap';
import '../assets/css/bootstrap.css'
import { useEffect, useState } from "react";

export default function ArchiveContentView(props) {

    function getCurrentDate(separator = '') {
        let newDate = new Date()
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let time = newDate.toTimeString()
        return `${month < 10 ? `0${month}` : `${month}`}${separator}${day}${separator}${year} - ${time}`
    }

    //Restore task data
    function handle_task_restore(state) {
        console.log(state)
        console.log("restore task");
        fetch("/add_back_to_task", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
        }).then(response => response.json())
            .then(taskdata => {
                console.log("Success", taskdata);
            })
            .catch(error => {
                console.error('Error', error)
            });
        SendLog("Restoring Task");

        //Deleting current archive task state
        fetch("/delete_archive_task", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
        }).then(response => response.json())
            .then(data => {
                console.log("Success", data);
            })
            .catch(error => {
                console.error('Error', error)
            });
        SendLog("Removing Task from Archive");
    }

    //Restore system data
    function handle_system_restore(state) {
        console.log(state)
        console.log("restore task");
        fetch("/add_back_to_system", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
        }).then(response => response.json())
            .then(taskdata => {
                console.log("Success", taskdata);
            })
            .catch(error => {
                console.error('Error', error)
            });
        SendLog("Restoring System");
        //Deleting current archive task state
        fetch("/delete_archive_system", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
        }).then(response => response.json())
            .then(data => {
                console.log("Success", data);
            })
            .catch(error => {
                console.error('Error', error)
            });
        SendLog("Removing System from Archive");

    }

    // Restore Finding Data
    function handle_finding_restore(state) {
        console.log(state)
        console.log("restore finding");
        fetch("/add_back_to_finding", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
        }).then(response => response.json())
            .then(findingdata => {
                console.log("Success", findingdata);
            })
            .catch(error => {
                console.error('Error', error)
            });
        SendLog("Restoring Finding");

        //Deleting current archive Finding state
        fetch("/delete_archive_finding", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
        }).then(response => response.json())
            .then(data => {
                console.log("Success", data);
            })
            .catch(error => {
                console.error('Error', error)
            });
        SendLog("Removing Finding from Archive");

    }

    // Handles logging information
    function SendLog(e) {
        var action = {
            date: getCurrentDate("/"),
            action: e,
            analyst: ""
        }
        action.analyst = "";
        fetch('/addlog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action),
        }).then(response => response.json());
    }

    // updates all tables data
    useEffect(() => {
        props.updateData();
    });

    return (
        <div className="main">
            <h2>Archived Tasks</h2><br />
            <Table striped bordered hover >
                <thead class="thead-grey">
                    <tr>
                        <th>Title<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th>System<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th>Analyst<input type="image" src={SortImage} className="sort-button" alt="sort button" /> </th>
                        <th>Priority<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th>Progress<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th>No. of Subtasks<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th>No. of Findings<input type="image" src={SortImage} className="sort-button" alt="sort button" /> </th>
                        <th>Due Date<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th><Button variant="dark">Restore All Task</Button><br /></th>
                    </tr>
                </thead>
                <tbody>
                    {props.taskdata.map((state) => (
                        <tr key={state.id}>
                            <td> {state.taskTitle}</td>
                            <td>{state.system}</td>
                            <td>{state.taskAnalysts}</td>
                            <td>{state.taskPriority}</td>
                            <td>{state.taskProgress}</td>
                            <td>{state.num_subtask}</td>
                            <td>{state.num_finding}</td>
                            <td>{state.taskDueDate}</td>
                            <td><Button variant="dark" onClick={() => handle_task_restore(state)}> Restore Task </Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <br /><br />
            <h2>Archived SubTasks</h2><br />
            <Table striped bordered hover >
                <thead class="thead-grey">
                    <tr>
                        <th scope="col">Title<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th scope="col">Task<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th scope="col">Analyst<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th scope="col"> Progress<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th scope="col">No. of Findings<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th scope="col">Due Date<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th><Button variant="dark">Restore All SubTask</Button></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </Table>

            <br /><br />

            <h2>Archived System</h2><br />
            <Table striped bordered hover >
                <thead class="thead-grey">
                    <tr>
                        <th scope="col">System<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th scope="col">No. of Tasks<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th scope="col">No. of Findings<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th scope="col">Progress<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th><Button variant="dark">Restore All System</Button></th>
                    </tr>
                </thead>
                <tbody>
                    {props.systemdata.map((state) => (
                        <tr key={state.id}>
                            <td> {state.sysInfo}</td>
                            <td>{state.num_task}</td>
                            <td>{state.num_findings}</td>
                            <td>{state.prog}</td>
                            <td><Button variant="dark" onClick={() => handle_system_restore(state)}> Restore Task </Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <br /><br />

            <h2>Archived Finding</h2><br />
            <Table striped bordered hover >
                <thead class="thead-grey">
                    <tr>
                        <th scope="col">ID<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th scope="col">Title<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th scope="col">System<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th scope="col">Task<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th scope="col">Subtask<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th scope="col">Analyst<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th scope="col">Status<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th scope="col">Classification<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th scope="col">Type<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th scope="col">Risk<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                        <th><Button variant="dark">Restore All Findings</Button> </th>
                    </tr>
                </thead>
                <tbody>
                    {
                    props.findingdata.map((state) => (
                            <tr key={state.id}>
                                <td>{state.id}</td>
                                <td>{state.hostName}</td>
                                <td>{state.systemID}</td>
                                <td>{state.taskID}</td>
                                <td>{state.subtaskID}</td>
                                <td>{state.analyst}</td>
                                <td>{state.findingStatus}</td>
                                <td>{state.findingClassification}</td>
                                <td>{state.findingType}</td>
                                <td>{state.findingRisk}</td>
                                <td><Button variant="dark" onClick={() => handle_finding_restore(state)}> Restore Finding</Button></td>
                                
                            </tr>
                        ))
                        }
                </tbody>
            </Table>

        </div>
    );

}