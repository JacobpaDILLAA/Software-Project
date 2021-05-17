import * as React from 'react';
import TaskDetailedView from './taskDetailedView';
import { useEffect, useState} from "react";
import SortImage from '../assets/updownarrow.png';
import {Modal, ButtonGroup, Button, Table} from 'react-bootstrap';
import './taskView.css';

export default function TaskContentView(props) {
    // Get current information about the date for log purpose
    function getCurrentDate(separator = '') {
        let newDate = new Date()
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let time = newDate.toTimeString()
        return `${month < 10 ? `0${month}` : `${month}`}${separator}${day}${separator}${year} - ${time}`
    }
    //Modal Implementation
    const [selected_task, selectedTask] = useState(); //select a task to send to modal
    const [dialogOpen, handleDialog] = React.useState(false); //control of modal
    
    // Function used to open handle dialog
    function handleDialogOpen(state) {
        handleDialog(true)
        selectedTask(state)
    }

    // Function used to close handle dialog
    function handleDialogClose() {
        handleDialog(false)
    }


    //Function to demote a task
    function handleDemote(state){
        selectedTask(state)
        console.log(state)
        console.log("demote task");
            fetch('/addsubtask', {
                method: 'POST',
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
            SendLog("Adding subtask");

            //Deleting current task state
            // fetch("/delete_task", {
            //     method: 'DELETE',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(state),
            // }).then(response => response.json())
            //     .then(data => {
            //         console.log("Success", data);
            //     })
            //     .catch(error => {
            //         console.error('Error', error)
            //     });
            // SendLog("Removing Task");
    }

    function handleArch(state) {
        selectedTask(state)
        console.log(state)
        console.log("archived task");
            fetch("/add_archive_task", {
                method: 'POST',
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
            SendLog("Adding Task");

            //Deleting current task state
            fetch("/delete_task", {
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
            SendLog("Removing Task");
    }

    // Handles logging information
    function SendLog(e) {
        var action = {
          date: getCurrentDate("/"),
          action: e,
          analyst: localStorage.getItem('analyst') ? localStorage.getItem('analyst') : "NA"
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

    // updates the task data
    useEffect(() => {
        props.updateData();   
    });
    
    //Return displays the task content view 
    return (
        <div>
            <div className="main">
                <div className="title-buttons">                    
                    <h2>Task Overview Table</h2> 
                    <ButtonGroup>
                        {/* <Button variant="dark" onClick={handleArchive}> Archive </Button> */}
                        {/* <Button variant="dark" onClick={handleDemote}> Demote </Button> */}
                        <Button variant="dark" onClick={handleDialogOpen}> Add </Button>
                    </ButtonGroup>
                </div>
                <Modal show={dialogOpen} onHide={handleDialogClose} dialogClassName="task-modal">
                    <Modal.Header>
                        <Modal.Title>
                            Task Detailed View
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TaskDetailedView task={selected_task} closeDetailAction={handleDialogClose} />
                    </Modal.Body>
                </Modal>            
                <Table striped bordered hover >
                    <thead class="thead-grey">
                        <tr>
                            {/* <th><input type="checkbox" id="all-tasks" name="all-tasks" value="0"></input></th> */}
                            <th>Title<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                            <th>System<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                            <th>Analyst<input type="image" src={SortImage} className="sort-button" alt="sort button" /> </th>
                            <th>Priority<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                            <th>Progress<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                            <th>No. of Subtasks<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                            <th>No. of Findings<input type="image" src={SortImage} className="sort-button" alt="sort button" /> </th>
                            <th>Due Date<input type="image" src={SortImage} className="sort-button" alt="sort button" /></th>
                            <th>Archive Action</th>
                            <th>Demote Action</th>
                            {/* <th><Button variant="dark"> Demote All </Button></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((state) => (
                            <tr key={state.id}>
                                <td><Button onClick={() => handleDialogOpen(state)} variant="outline-dark">{state.taskTitle}</Button></td>
                                <td>{state.system}</td>
                                <td>{state.taskAnalysts}</td>
                                <td>{state.taskPriority}</td>
                                <td>{state.taskProgress}</td>
                                <td>{state.num_subtask}</td>
                                <td>{state.num_finding}</td>
                                <td>{state.taskDueDate}</td>
                                <td><Button variant="dark" onClick={() => handleArch(state)} > Archive </Button></td>
                                <td><Button variant="dark" onClick={() => handleDemote(state)}> Demote </Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
