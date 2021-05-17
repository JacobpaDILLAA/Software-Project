import * as React from 'react'
import '../generalView/style.css'
import 'react-bootstrap'
import '../assets/css/bootstrap.css'
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect, useRef } from "react"
import Button from 'react-bootstrap/Button'

function GeneralView() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Handles modal pop
    function viewNote() {
        handleShow();
    }
    //TImer is currently going every 1 min on refresh : use if the input implementation doesn't work
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //       viewNote();
    //       return () => clearTimeout(timer);
    //     }, (1000 * 60) );
    //   }, []);

    //Timer implementation  to get user input
    // const [delay, setDelay] = useState(1000);

    // useInterval(() => {
    //     // Your custom logic here
    // }, delay);

    // function handleDelayChange(e) {
    //     setDelay(Number(e.target.value));
    // }

    // //Custom hook to set and clear delay
    // function useInterval(callback, delay) {
    //     const savedCallback = useRef();

    //     // Remember the latest function.
    //     useEffect(() => {
    //       savedCallback.current = callback;
    //     }, [callback]);

    //     // Set up the interval.
    //     useEffect(() => {
    //       if (delay !== null) {
    //         let id = setInterval(delay);
    //         return () => clearInterval(id);
    //       }
    //     }, [delay]);
    //   }




    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a className="navbar-brand" href="/Setup">FRIC</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02"
                    aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample02">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link " href="/Event">Event</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/SystemMaster">System</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/FindingMaster">Findings</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/TaskMaster">Task</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="/SubtaskMaster">Subtask</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="/ArchiveMaster">Archive</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Configuration">Configuration</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Setup">Setup</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/AnalystSummary">Summary</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Help">Help</a>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" onClick={viewNote}> Notification </div>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="/Notify"> EX </a>
                        </li> */}
                    </ul>
                </div>
            </nav>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ textAlign: "center" }} className="Notify">

                        <label for="taskTitle">
                            Task Title:<br />
                            <input type="text" name="taskT" value="Task1" />
                        </label><br />

                        <label for="taskDueDate">
                            Task Due Date:<br />
                            <input type="text" name="task-Due-Date" value="11/11/2020" />
                        </label><br />

                        <label for="subtaskTitle">
                            SubTask Title:<br />
                            <input type="text" name="subtaskT" value="Subtask3" />
                        </label><br />

                        <label for="subtaskDueDate">
                            SubTask Due Date:<br />
                            <input type="text" name="subtask-Due-Date" value="11/10/2020" />
                        </label><br />

                        <label htmlFor="frequency">
                            Frequency:<br />
                            {/* <input value={delay} onChange={handleDelayChange} placeholder="frequency in min" /> */}
                        </label><br />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}> Okay! </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}


export default GeneralView;