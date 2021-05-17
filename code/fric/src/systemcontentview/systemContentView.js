import * as React from 'react'
import Table from 'react-bootstrap/Table'
import './systemView.css'
import Button from 'react-bootstrap/Button'
import SystemDetailedView from './systemDetailedView'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
function getCurrentDate(separator = '') {
  let newDate = new Date()
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let time = newDate.toTimeString()
  return `${month < 10 ? `0${month}` : `${month}`}${separator}${day}${separator}${year} - ${time}`
}

export default function SystemContentView(props) {

  //Used to save the selected system and pass it to the detailed view.
  const [selected_system, selectedSystem] = useState();

  //Used to close or open the modal dialog.
  const [dialogOpen, handleDialog] = React.useState(false)

  //Action to be done when opening the dialog. Giving a parameter allows view/editing the system.
  function handleDialogOpen(state) {
    handleDialog(true)//Open the modal
    selectedSystem(state)//Remeber the system that you selected to view.
    SendLog("Add System")
  }

  //Action to be done when closing the dialog.
  function handleDialogClose() {
    handleDialog(false)//Close the modal
  }

  function handleArch(state) {
    selectedSystem(state)
    console.log("Archived System");
    console.log(state)
    fetch("/add_archive_system", {
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
    SendLog("Archiving System");

    // Deleting Current System
    fetch("/delete_system", {
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
    SendLog("Removing System");
  }

  //Function to send a log given the parameter (action).
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

  //Update the information inside the state.
  useEffect(() => {
    props.updateData();
  });

  return (
    <div >

      <div className="main">
        <div className="SystemContentView">
          <div id="systemTable">
            <div className="title-buttons">
              <h2>System Overview Table</h2>


              <ButtonGroup dialogclassname="title-system-buttons">
                <Button variant="dark" onClick={handleDialogOpen}>Add</Button>
              </ButtonGroup>
              <Modal dialogClassName="event-modal" show={dialogOpen} onHide={handleDialogClose} >
                <Modal.Header>
                  <Modal.Title>
                    System Detailed View
                                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/**Call the detailed view.
                   * Send the selected system (to edit or view the system).
                   * Send the function that will close the modal.
                   */}
                  <SystemDetailedView system={selected_system} closeDetailAction={handleDialogClose} />
                </Modal.Body>
              </Modal>

            </div>
            <Table bordered hover striped>
              <thead className="thead-grey">
                <tr>
                  <th>System</th>
                  <th>No. of Task</th>
                  <th>No. Findings</th>
                  <th>Progress</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {props.data.map((state) => (
                  //Map the given information of data.
                  <tr key={state.id}>
                    <td><Button onClick={() => handleDialogOpen(state)} variant="outline-dark">{state.sysInfo}</Button></td>
                    <td>{state.num_task}</td>
                    <td>{state.num_findings}</td>
                    <td>{state.prog}</td>
                    <td><Button variant="dark" onClick={() => handleArch(state)} > Archive </Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}