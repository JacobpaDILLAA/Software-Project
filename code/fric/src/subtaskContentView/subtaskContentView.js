import * as React from 'react';
import {useEffect, useState } from "react";
import SortImage from '../assets/updownarrow.png';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import SubtaskDetailedView from './subtaskDetailedView';
import './subtaskView.css';

export default function SubtaskContentView(props) {
    function getCurrentDate(separator = '') {
        let newDate = new Date()
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();  
        let time = newDate.toTimeString()
        return `${month < 10 ? `0${month}` : `${month}`}${separator}${day}${separator}${year} - ${time}`
    }

    const [selected_subtask, selectedSubtask] = useState();
    const [dialogOpen, handleDialog] = React.useState(false)


    function handleDialogOpen(state) {
        SendLog("subtask dialog open");//Log
        handleDialog(true)//Open the modal
        selectedSubtask(state)//Remeber the system that you selected to view.
    }
    
      //Action to be done when closing the dialog.
    function handleDialogClose() {
        SendLog("subtask dialog close")//Log
        handleDialog(false)//Close the modal
    }

    function handleArch(state) {
        selectedSubtask(state)
        console.log("archived subtask");
        console.log(state)
        fetch("/add_archive_subtask", {
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
            SendLog("Archiving Subtask");
    
            // Deleting Current System
            fetch("/delete_subtask", {
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
            SendLog("Removing Subtask");
    }

    
    function handlePromote(state) {
        selectedSubtask(state)
        console.log("Promote subtask");
        console.log(state)
        fetch("/promote_subtask", {
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
            SendLog("Promoting Subtask");
    
            // Deleting Current System
            fetch("/delete_subtask", {
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
            SendLog("Removing Subtask");
    }
    

    function SendLog(a) {
    var action = {//Create the action that you'll send.
        date: getCurrentDate("/"),//get current date.
        action: a,
        analyst: localStorage.getItem('analyst') ? localStorage.getItem('analyst') : "NA"
    }
    fetch('/addlog', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(action),
    }).then(response => response.json())
        .then(data => {
        console.log("Success", data);
        })
        .catch(error => {
        console.error('Error', error)
        });
    }

    useEffect(() => {
        props.updateData();
    });

    return (
        <div>
            <div className="main">
                <div class="title-buttons">
                    <h2>Subtask Overview Table</h2>
                    <ButtonGroup>
                        <Button variant="dark" onClick={handleDialogOpen}>Add</Button>
                    </ButtonGroup>
                </div>
                <Modal show={dialogOpen} onHide={handleDialogClose} dialogClassName="subtask-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Subtask Detailed View 
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SubtaskDetailedView  subtask={selected_subtask} closeDetailAction={handleDialogClose} />
                    </Modal.Body>
                </Modal>
                <Table striped bordered hover>
                    <thead class="thead-grey">
                        <tr>
                            {/* <th><input type="checkbox" id="all-subtasks" name="all-subtasks" value="0"></input></th> */}
                            <th>Title<input type="image" src={SortImage} className="sort-button" alt="Sort button" /></th>
                            <th>Task id<input type="image" src={SortImage} className="sort-button" alt="Sort button" /></th>
                            <th>Analyst<input type="image" src={SortImage} className="sort-button" alt="Sort button" /></th>
                            <th>Progress<input type="image" src={SortImage} className="sort-button" alt="Sort button" /></th>
                            <th>No. of Findings<input type="image" src={SortImage} className="sort-button" alt="Sort button" /></th>
                            <th>Due Date<input type="image" src={SortImage} className="sort-button" alt="Sort button" /></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((state) => (
                            <tr>
                                {/* <td><input type="checkbox" id="cb1" value="subtask" /></td> */}
                                <td><Button variant="outline-dark" onClick={() => handleDialogOpen(state)}>{state.subtaskTitle}</Button></td>
                                <td>{state.taskID}</td>
                                <td>{state.analyst}</td>
                                <td>{state.subtaskProgress}</td>
                                <td>{state.numFindings}</td>
                                <td>{state.subtaskDueDate}</td>
                                <td>
                                    <Button variant="dark" onClick={() => handleArch(state)} > Archive </Button>
                                    <Button variant="dark" onClick={() => handlePromote(state)} > Promote </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>

    );
}


    // const [selected_subtask, selectedSubtask] = useState({        
    //     subtaskTitle: '', 
    //     task: '', 
    //     analyst: '', 
    //     subtaskProgress: '', 
    //     numFindings: '',
    //     subtaskDueDate: '' 
    // });

    // function viewSubtask(subtask) {
    //     sendLog("view subtask");
    //     selectedSubtask(subtask);
    //     handleShow();
    // }


    // function addSubtask() {
    //     sendLog("add subtask");
    //     selectedSubtask(0);
    //     handleShow();
    // }

    // const useSortableData = (items, config = null) => {
    //     const [sortConfig, setSortConfig] = React.useState(config);
    //     const sortedItems = React.useMemo(() => {
    //       let sortableItems = [...items];
    //       if (sortConfig !== null) {
    //         sortableItems.sort((a, b) => {
    //           if (a[sortConfig.key] < b[sortConfig.key]) {
    //             return sortConfig.direction === 'ascending' ? -1 : 1;
    //           }
    //           if (a[sortConfig.key] > b[sortConfig.key]) {
    //             return sortConfig.direction === 'ascending' ? 1 : -1;
    //           }
    //           return 0;
    //         });
    //       }
    //       return sortableItems;
    //     }, [items, sortConfig]);
    //     const requestSort = (key) => {
    //       let direction = 'ascending';
    //       if (
    //         sortConfig &&
    //         sortConfig.key === key &&
    //         sortConfig.direction === 'ascending'
    //       ) {
    //         direction = 'descending';
    //       }
    //       setSortConfig({ key, direction });
    //     };
    //     return { items: sortedItems, requestSort, sortConfig };
    //   };
    //   const ProductTable = (props) => {
    //     const { items, requestSort, sortConfig } = useSortableData(props.products);
    //     const getClassNamesFor = (name) => {
    //       if (!sortConfig) {
    //         return;
    //       }
    //       return sortConfig.key === name ? sortConfig.direction : undefined;
    //     };
    //     return (
    //       <table>
    //         <thead>
    //           <tr>
    //             <th>
    //               <button
    //                 type="button"
    //                 onClick={() => requestSort('subtaskTitle')}
    //                 className={getClassNamesFor('subtaskTitle')}
    //               >
    //                 Name
    //               </button>
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {items.map((item) => (
    //             <tr key={item.id}>
    //               <td>{item.s}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     );
    // };


