import React from 'react';
import { useState, useEffect } from "react";
import SortImage from '../assets/updownarrow.png';
import Table from 'react-bootstrap/Table';
import Tree from '../eventTree/eventTree';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import GeneralView from '../generalView/generalView';
import Modal from 'react-bootstrap/Modal';
import EventDetailedView from './eventDetailedView';


function getCurrentDate(separator = '') {
    let newDate = new Date()
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let time = newDate.toTimeString()
    return `${month < 10 ? `0${month}` : `${month}`}${separator}${day}${separator}${year} - ${time}`
}

function EventContentView() {
    const [events, setEvents] = useState([{ name: '', num_sys: '', num_findings: '', prog: '' }])

    useEffect(() => {
        fetch('/eventsOverview').then(
            response => response.json()).then(data => setEvents(data)) // Get info for Event Overview Table // 
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false); // Close Modal View
    const handleShow = () => setShow(true); // Open Modal View 

    const [selected_event, selectEvent] = useState(); // Set selected event 
    const [analysts,setAnalysts] = useState([]); 
    const [lead_analysts,setLeadAnalysts] = useState([]); 

     function getAnalysts(event_id){    
        // console.log("Fetching analysts for event #", event_id) // Debugging
        fetch('/analystsInEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event_id), //Pass event ID to select event// 
        }).then(response => response.json())
            .then(data => {
                setAnalysts(data)
                // console.log("Success");
            })
            .catch(error => {
                console.error('Error', error)
            });

            //Fetch Lead analysts//
            fetch('/leadAnalystsInEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event_id), //Pass event ID to select event// 
            }).then(response => response.json())
                .then(data => {
                    setLeadAnalysts(data)
                    // console.log("Success");
                })
                .catch(error => {
                    console.error('Error', error)
                });
    }

    // After event is chosen make it the selected event and the show modal // 
    function viewEvent(event) {
        sendLog('View Event');
        getAnalysts(event.id)
        selectEvent(event);
        handleShow();
    }

    // Before showing modal clear event so there is no prepopulated data // 
    function addEvent() {
        sendLog("Add Event")
        selectEvent(0);
        handleShow();
    }

    function sendLog(a) {
        let action = {
            date: getCurrentDate("/"),
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

    return (
        <div>
            <GeneralView /> {/* Tab Bar */}
    {/* <h1>Test{console.log(localStorage.getItem('analyst'))}</h1> HERE IS HOW YOU GET THE "LOGGED IN ANALYSTS*/} 
    
            <div class="main">
                <div class="title-buttons">
                    <h2>Event Overview Table</h2>
                    <ButtonGroup>
                        <Button variant="dark" onClick={addEvent}>Add</Button>
                    </ButtonGroup>
                </div>

                <Table bordered striped hover id="event_table">
                    <thead class="thead-grey">
                        <tr>
                            <th>Select Event</th>
                            <th>Event Name <input type="image" alt="sort button" src={SortImage} className="sort-button" /></th>
                            <th>No. of Systems <input type="image" alt="sort button" src={SortImage} className="sort-button" /></th>
                            <th>No. of Findings <input type="image" alt="sort button" src={SortImage} className="sort-button" /></th>
                            <th>Progress <input type="image" alt="sort button" src={SortImage} className="sort-button" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Populate event table*/}
                        {events.map((event) => (
                            <tr>
                                <td><input type="checkbox" id="cb1" /></td>
                                <td><Button variant="outline-dark" key = {event.id} onClick={() => { viewEvent(event) }}>{event.name}</Button></td>
                                <td>{event.num_sys}</td>
                                <td>{event.num_findings}</td>
                                <td>{event.prog}</td>
                            </tr>
                        ))}

                    </tbody>
                </Table>


                <Modal show={show} onHide={handleClose} dialogClassName="event-modal" size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Event Detailed View {console.log("Leads",lead_analysts)}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EventDetailedView event={selected_event} lead_analysts = {lead_analysts} analysts = {analysts}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={handleClose}>
                            Save
                            </Button>
                        <Button variant="dark" onClick={handleClose}>
                            Delete
                            </Button>
                        <Button variant="dark" onClick={handleClose}>
                            Cancel
                            </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div class="right-tree">
                <Tree />
            </div>
        </div>
    );
}
export default EventContentView;
