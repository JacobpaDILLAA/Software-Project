import * as React from 'react';
import HelpImage from '../assets/help.png';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Button from 'react-bootstrap/Button';
import { useEffect, useState} from "react";
function getCurrentDate(separator = '') {
    let newDate = new Date()
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let time = newDate.toTimeString()
    return `${month < 10 ? `0${month}` : `${month}`}${separator}${day}${separator}${year} - ${time}`
}

function SubtaskDetailedView(props){
    const [tasks, setTasks] = useState([{ taskTitle: '', taskDescription: '', system: '', taskPriority: '' }]);
    useEffect(() => {
        fetch('/tasks').then(
            response => response.json()).then(data => setTasks(data)) // Get info for Event Overview Table // 
    }, []);
    const [selected_task, selectTask] = useState();

    const [id, setID] = useState(props.subtask.id);
    const [subtaskTitle, setSubtaskTitle] = useState(props.subtask.subtaskTitle);
    const [subtaskDescription, setSubtaskDescription] = useState(props.subtask.subtaskDescription);
    const [subtaskProgress, setSubtaskProgress ] = useState(props.subtask.subtaskProgress);
    const [subtaskDueDate, setSubtaskDueDate ] = useState(props.subtask.subtaskDueDate);
    const [analysts, setAnalysts ] = useState(props.subtask.analysts);
    const [collaborators, setCollaborators ] = useState(props.subtask.collaborators);
    const [relatedTask, setRelatedTask ] = useState(props.subtask.relatedTask);
    const [subtasks, setSubtasks ] = useState(props.subtask.subtasks);
    const [attachments, setAttachments ] = useState(props.subtask.attachments);
    const [numFindings, setNumFindings ] = useState(props.subtask.numFindings);
    const [analyst,setAnalyst ] = useState(props.subtask.analyst);
    const [taskID, setTaskID] = useState(props.subtask.taskID);
    const [task, setTask ] = useState(props.subtask.task);



    let state = {
        id: id ? id : '',
        subtaskTitle: subtaskTitle ? subtaskTitle : '',
        subtaskDescription: subtaskDescription ? subtaskDescription : '',
        subtaskProgress: subtaskProgress ? subtaskProgress : '',
        subtaskDueDate: subtaskDueDate ? subtaskDueDate: '',
        analysts: analysts ? analysts : '',
        collaborators: collaborators ? collaborators : '',
        relatedTask: relatedTask ? relatedTask: '',
        subtasks: subtasks ? subtasks: '',
        attachments: attachments ? attachments: '',
        taskID: taskID ? taskID : '',
        numFindings: "",
        analyst: analyst ? analyst : '',
        task: ""
    };

    function SendData(e) {
        e.preventDefault();
        setID(props.subtask.id);
        console.log(props.subtask.id);
        if (props.subtask.id === undefined) {
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
        }else {
            //Re-send the information to the selected system.
            console.log("Subtask: Edit");
            fetch('/editsubtask', {
                method: 'PUT',     //NEW CHANGED post to put
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
            SendLog("Editing Subtask: " + props.subtask.id);
        }
        props.closeDetailAction();   
    }
    
    function closeOnCancel() {
        props.closeDetailAction()
    }
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

    // function SendLog(e) {
    //     e.preventDefault();
    //     var action = {
    //         date: "",
    //         action: "",
    //         analyst: ""
    //     }
    //     action.action = "submit subtask";
    //     action.date = getCurrentDate("/");
    //     action.analyst = "";
    //     fetch('/addlog', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(action),
    //     }).then(response => response.json())
    //         .then(data => {
    //             console.log("Success", data);
    //         })
    //         .catch(error => {
    //             console.error('Error', error)
    //         });
    // }

        const analystsList = [
        { label: 'Collaborator 1', value: 1 },
        { label: 'Collaborator 2', value: 2 },
        { label: 'Collaborator 3', value: 3 },
        { label: 'Collaborator 4', value: 4 },
        { label: 'Collaborator 5', value: 5 },];
        const collaboratorsList = [
            { label: 'Collaborator 1', value: 1 },
            { label: 'Collaborator 2', value: 2 },
            { label: 'Collaborator 3', value: 3 },
            { label: 'Collaborator 4', value: 4 },
            { label: 'Collaborator 5', value: 5 },
        ];
        const tasksList = [
            { label: 'Task 1', value: 1 },
            { label: 'Task 2', value: 2 },
            { label: 'Task 3', value: 3 },
            { label: 'Task 4', value: 4 },
            { label: 'Task 5', value: 5 },
        ];
        const subtasksList =Array.from( tasks.map((task) => (
            {label:task.taskTitle , value: task.id}
        )));
        

        const attachmentsList = [
            { label: 'Attachment 1', value: 1 },
            { label: 'Attachment 2', value: 2 },
            { label: 'Attachment 3', value: 3 },
            { label: 'Attachment 4', value: 4 },
            { label: 'Attachment 5', value: 5 },
        ];

        return (
            <div>
                <div>
                <input type="image" src={HelpImage} alt="Help button" />
                    <form onSubmit={SendData} >
                        <div className="subtask-form">
                            <div className="left">
                                <label htmlFor="subtaskTitle">
                                    Title:<br />
                                    <input type="text" onChange={e => setSubtaskTitle(e.target.value)} defaultValue={props.subtask.subtaskTitle} name="subtaskTitle" id="subtask-title" className="subtask-data" />
                                </label><br />
                                <label htmlFor="subtaskDescription">
                                    Description:<br />
                                    <input type="text" onChange={e => setSubtaskDescription(e.target.value)} defaultValue={props.subtask.subtaskDescription} name="subtaskDescription" id="description" className="subtask-data" />
                                </label><br />
                                <label htmlFor="subtaskProgress">
                                    Progress:<br />
                                    <select onChange={e => setSubtaskProgress(e.target.value)} defaultValue={props.subtask.subtaskProgress} name="subtaskProgress" id="progress-dropdown" className="subtask-data">
                                        <option value="default" selected="selected"></option>
                                        <option value="notStarted">Not started</option>
                                        <option value="assigned">Assigned</option>
                                        <option value="transfered">Transfered</option>
                                        <option value="inProgress">In progress</option>
                                        <option value="complete">Complete</option>
                                        <option value="notApplicable">Not applicable</option>
                                    </select>
                                </label><br />
                                <label htmlFor="subtaskDuedate">
                                    Due Date:<br />
                                    <input type="date" id="due-date" onChange={e => setSubtaskDueDate(e.target.value)} defaultValue={props.subtask.subtaskDueDate} name="subtaskDueDate" className="subtask-data" />
                                </label><br />
                            </div>
                            <div className="right">
                                <label htmlFor="subtaskAnalysts">
                                    Analyst(s):<br />
                                    <select  name="analyst" onChange={e => setAnalyst(e.target.value)} defaultValue={props.subtask.analyst} className="subtask-data" >
                                        <option value="default" selected="selected"></option>
                                        <option value="Alex Vasquez">Alex Vasquez</option>
                                        <option value="Jacob Padilla">Jacob Padilla</option>
                                        <option value="Luis Soto">Luis Soto</option>
                                    </select>
                                    {/* <ReactMultiSelectCheckboxes onChange={e => setAnalysts(e.target.value)} defaultValue={props.subtask.analysts} options={analystsList} width="100%"  name="analysts" /> */}
                                </label>
                                <label htmlFor="subtaskCollaborators">
                                    Collaborator(s):<br />
                                    <select  name="collaborators" onChange={e => setCollaborators(e.target.value)} defaultValue={props.subtask.collaborators} className="subtask-data">
                                        <option value="default" selected="selected"></option>
                                        <option value="Alex Vasquez">Alex Vasquez</option>
                                        <option value="Jacob Padilla">Jacob Padilla</option>
                                        <option value="Luis Soto">Luis Soto</option>
                                    </select>

                                    {/* <ReactMultiSelectCheckboxes onChange={e => setCollaborators(e.target.value)} defaultValue={props.subtask.collaborators} options={collaboratorsList} width="100%"  name="collaborators" /> */}
                                </label><br />
                                <label htmlFor="tasks">
                                    Related task:<br />
                                    <select  name="taskID" onChange={e => setTaskID(e.target.value)} className="subtask-data">
                                        <option defaultValue> Select...</option>
                                            {tasks.map((task) => (
                                                <option value={task.id}>{task.taskTitle}</option>
                                            ))}
                                    </select>
                                    {/* <ReactMultiSelectCheckboxes onChange={e => setRelatedTask(e.target.value)} defaultValue={props.subtask.relatedTask} options={tasksList} width="100%"  name="relatedTask" /> */}
                                </label><br />
                                <label htmlFor="subtasks">
                                    Subtask(s):<br />
                                    <select  name="subtasks" onChange={e => setSubtasks(e.target.value)} defaultValue={props.subtask.subtasks} className="subtask-data">
                                        <option value="default" selected="selected"></option>
                                        <option value="Subtask 1">Subtask 1</option>
                                        <option value="Subtask 2">Subtask 2</option>
                                        <option value="Subtask 3">Subtask 3</option>
                                    </select>
                                    {/* <ReactMultiSelectCheckboxes  onSubmit={e => setSubtasks(e.target.value)} defaultValue={props.subtask.subtasks} options={subtasksList} width="100%"  name="subtasks" searchable={false} /> */}
                                </label><br />

                            </div>
                        </div>
                        
                        <Button variant="outline-dark" onClick={closeOnCancel} class="btn cancel">Cancel </Button>
                        <Button variant="outline-dark" type="submit" class="btn">Submit </Button>
                        
                    </form>

                </div>
            </div>
        );
    
}


export default SubtaskDetailedView;

    


    // handleEventType(e) {
    //     console.log(e.target.value);
    // }

    // handleEventClass(e) {
    //     console.log(e.target.value);
    // }

    // onChange = (e) => {
    //     this.setState({ [e.target.name]: e.target.value });
    // }