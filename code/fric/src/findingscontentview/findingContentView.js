import * as React from 'react'
import Table from 'react-bootstrap/Table'
import './findingView.css'
import Button from 'react-bootstrap/Button'
import FindingDetailedView from './findingDetailedView';
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

export default function FindingContentView(props) {

  const [selected_finding, selectedFinding] = useState();

  const [dialogOpen, handleDialog] = React.useState(false)

  function handleDialogOpen(state) {
    sendLog("finding dialog open");
    handleDialog(true)
    selectedFinding(state)

  }

  function handleDialogClose() {
    sendLog("finding dialog close")
    handleDialog(false)
    props.updateData();
  }
  function sendLog(a) {
    let action = {
      date: getCurrentDate("/"),
      action: a,
      analyst: localStorage.getItem('analyst') ? localStorage.getItem('analyst') : "NA"
    }
    // console.log(action)
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

  function generateFinalReport() {
    fetch('/generatefinalreport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
    })
  }

  function handleArch(state) {
    selectedFinding(state)
    state.analyst = localStorage.getItem('analyst'); 
    console.log(state)
    fetch("/add_archive_finding", { // Need to add to the python here
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
    //SendLog("Archiving Finding");

    // Deleting Current System
    fetch("/delete_finding", {
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
    //SendLog("Removing System");
  }

  function generateRiskMatrix() {
    fetch('/createRiskMatrix', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(3),
    })
  }

  function generateERB() {
    fetch('/generateERB', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(localStorage.getItem('analyst')),
    })
  }

  useEffect(() => {
    props.updateData();
  });

  return (
    <div >

      <div className="main">
        <div className="SystemContentView">
          <div id="systemTable" update={props.updateSystemData}>
            <div className="title-buttons">
              <h2>Findings Overview Table</h2>

              <ButtonGroup dialogclassname="title-system-buttons">
                <Button variant="dark" onClick={handleDialogOpen}>Add</Button>
              </ButtonGroup>
              <Modal show={dialogOpen} onHide={handleDialogClose} size='lg'>
                <Modal.Header>
                  <Modal.Title>
                    Finding Detailed View
                                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <FindingDetailedView finding={selected_finding} closeDetailAction={handleDialogClose} />
                </Modal.Body>
              </Modal>

            </div>
            <Table bordered hover striped>
              <thead className="thead-grey">
                <tr>
                  <th>Select</th>
                  <th>ID</th>
                  <th>Title</th>
                  <th>System</th>
                  <th>Task</th>
                  <th>Subtask</th>
                  <th>Analyst</th>
                  <th>Status</th>
                  <th>Classification</th>
                  <th>Type</th>
                  <th>Risk</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {props.data.map((state) => (
                  <tr>
                    <td><input type="checkbox" /></td>
                    <td>{state.id}</td>
                    <td><Button onClick={() => handleDialogOpen(state)} variant="outline-dark">{state.hostName}</Button></td>
                    <td>{state.systemID}</td>
                    <td>{state.taskID}</td>
                    <td>{state.subtaskID}</td>
                    <td>{localStorage.getItem('analyst')}</td>
                    <td>{state.findingStatus}</td>
                    <td>{state.findingClassification}</td>
                    <td>{state.findingType}</td>
                    <td>{state.findingRisk}</td>
                    <td><Button variant="dark" onClick={() => handleArch(state)} > Archive </Button></td>

                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <ButtonGroup>
            <Button variant="dark" onClick={() => generateERB() }>Generate ERB</Button>
             &nbsp;
            <Button variant="dark" onClick={() => generateRiskMatrix()}>Generate Risk Matrix</Button>
            &nbsp;
            <Button variant="dark" onClick={() => generateFinalReport()}>Generate Final Report</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}