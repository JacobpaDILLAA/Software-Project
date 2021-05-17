import * as React from 'react';
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react';

function getCurrentDate(separator = '') {
    let newDate = new Date()
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let time = newDate.toTimeString()
    return `${month < 10 ? `0${month}` : `${month}`}${separator}${day}${separator}${year} - ${time}`
}

function SystemDetailedView(props) {

    const [events, setEvents] = useState([{ name: '', num_sys: '', num_findings: '', prog: '' }])

    useEffect(() => {
        fetch('/eventsOverview').then(
            response => response.json()).then(data => setEvents(data)) // Get info for Event Overview Table // 
    }, []);

    const [selected_event, selectEvent] = useState(); // Set selected event

    //Used to set the information when the given set---- method is called.
    const [id, setID] = useState(props.system.id);
    const [sysInfo, setName] = useState(props.system.sysInfo);
    const [sysDesc, setDesc] = useState(props.system.sysDesc);
    const [sysLoc, setLocation] = useState(props.system.sysLoc);
    const [sysRouter, setRouter] = useState(props.system.sysRouter);
    const [sysSwitch, setSwitch] = useState(props.system.sysSwitch);
    const [sysRoom, setRoom] = useState(props.system.sysRoom);
    const [sysTestPlan, setTestPlan] = useState(props.system.sysTestPlan);
    const [confidentiality, setConfidentiality] = useState(props.system.Confidentiality);
    const [integrity, setIntegrity] = useState(props.system.Integrity);
    const [availability, setAvailability] = useState(props.system.Availability);
    const [eventID, setEventID] = useState(props.system.eventID);

    //Save all the information into a variable to then send to the system collection.
    let state = {//To prevent lose of data when editing.
        id: id ? id : '',
        sysInfo: sysInfo ? sysInfo : '',
        sysDesc: sysDesc ? sysDesc : '',
        sysLoc: sysLoc ? sysLoc : '',
        sysRouter: sysRouter ? sysRouter : '',
        sysSwitch: sysSwitch ? sysSwitch : '',
        sysRoom: sysRoom ? sysRoom : '',
        sysTestPlan: sysTestPlan ? sysTestPlan : '',
        Confidentiality: confidentiality,
        Integrity: integrity,
        Availability: availability,
        eventID: eventID ? eventID : '',
        num_task: '',
        num_findings: '',
        progress: ''
    };


    //Send the selected system obtained from the content view to the system collection.
    function SendData(e) {
        e.preventDefault();
        setID(props.system.id);
        console.log(props.system.id);
        console.log(eventID);
        //Check if there was a already given system to differentiate editing or adding a system.
        if (props.system.id === undefined) {
            console.log("System: Add");
            fetch('/addsystem', {
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
            SendLog("Adding System");
        } else {
            //Re-send the information to the selected system.
            console.log("System: Edit");
            fetch('/editsystem', {
                method: 'PUT',             //NEW CHANGED post to put
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
            SendLog("Editing System: " + props.system.id);
        }
        props.closeDetailAction();

    }

    //Close the modal when called.
    function closeOnCancel() {
        props.closeDetailAction()
    }

    //Logging function that will save the data, analyst, and action done.
    function SendLog(e) {
        var action = {
            date: getCurrentDate("/"),
            action: e,
            analyst: localStorage.getItem('analyst') ? localStorage.getItem('analyst') : "NA" // Get current Analyst
        }
        fetch('/addlog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action),
        }).then(response => response.json());
    }

    return (
        <div>
            <div className="systemDetailedTable" id="systemDetailedTable">
                <div className="title-buttons"></div>
                <h1>Test{console.log(localStorage.getItem('analyst'))}</h1>
                <h3>System Information</h3>
                <div className="input-group">
                    <form className="input-form" onSubmit={SendData} >
                        <input type="text" onChange={e => setName(e.target.value)} name="sysInfo" defaultValue={props.system.sysInfo} className="form-control browser-default mr-3" placeholder="System Information" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
                            &nbsp;
                            <textarea type="text" onChange={e => setDesc(e.target.value)} name="sysDesc" defaultValue={props.system.sysDesc} className="form-control mr-3" placeholder="System Description" aria-label="System Description" aria-describedby="basic-addon2"></textarea>
                            &nbsp;
                            <input type="text" onChange={e => setLocation(e.target.value)} name="sysLoc" defaultValue={props.system.sysLoc} className="form-control mr-3" placeholder="System Location" aria-label="System Location" aria-describedby="basic-addon2"></input>
                            &nbsp;
                            <input type="text" onChange={e => setRouter(e.target.value)} name="sysRouter" defaultValue={props.system.sysRouter} className="form-control mr-3" placeholder="System Router" aria-label="System Router" aria-describedby="basic-addon2"></input>
                            &nbsp;
                            <input type="text" onChange={e => setSwitch(e.target.value)} name="sysSwitch" defaultValue={props.system.sysSwitch} className="form-control mr-3" placeholder="System Switch" aria-label="System Switch" aria-describedby="basic-addon2"></input>
                            &nbsp;
                            <input type="text" onChange={e => setRoom(e.target.value)} name="sysRoom" defaultValue={props.system.sysRoom} className="form-control mr-3" placeholder="System Room" aria-label="System Room" aria-describedby="basic-addon2"></input>
                            &nbsp;
                            <input type="text" onChange={e => setTestPlan(e.target.value)} name="sysTestPlan" defaultValue={props.system.sysTestPlan} className="form-control mr-3" placeholder="Test Plan" aria-label="Test Plan" aria-describedby="basic-addon2"></input>
                            &nbsp;
                            <h3>System Categorization</h3>
                        <div className="btn-group">
                            <select className="browser-default custom-select mr-3" defaultValue={props.system.Confidentiality} name="Confidentiality" onChange={e => setConfidentiality(e.target.value)} >
                                <option defaultValue>Confidentiality</option>
                                <option >Low</option>
                                <option >Medium</option>
                                <option >High</option>
                            </select>
                        </div>
                        <div className="btn-group">
                            <select className="browser-default custom-select mr-3" defaultValue={props.system.Integrity} name="Integrity" onChange={e => setIntegrity(e.target.value)}>
                                <option defaultValue>Integrity</option>
                                <option >Low</option>
                                <option >Medium</option>
                                <option >High</option>
                            </select>
                        </div>
                        <div className="btn-group">
                            <select className="browser-default custom-select mr-3" defaultValue={props.system.Availability} name="Availability" onChange={e => setAvailability(e.target.value)} >
                                <option defaultValue>Availability</option>
                                <option >Low</option>
                                <option >Medium</option>
                                <option >High</option>
                            </select>
                        </div>
                        <div className="btn-group">
                            <select className="browser-default custom-select mr-3" name="eventID" onChange={e => setEventID(e.target.value)} >
                                <option defaultValue>Set Events</option>
                                {events.map((event) => (
                                    <option value={event.id}>{event.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="button-input-group">
                            <Button variant="outline-dark" className="btn cancel" onClick={closeOnCancel}>Cancel </Button>
                            <Button variant="outline-dark" type="submit" className="btn">Save </Button>
                        </div>
                    </form>
                </div>

            </div>

        </div>

    );

}

export default SystemDetailedView;