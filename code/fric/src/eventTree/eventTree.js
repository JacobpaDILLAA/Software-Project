import * as React from 'react'
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { useState } from "react";
import { useEffect } from "react";
function EventTree(){
    const [subtasks, setSubtasks] = useState([{ 
        subtaskTitle: '', 
        task: '', 
        analyst: '', 
        subtaskProgress: '', 
        numFindings: '',
        subtaskDueDate: '' 
    }])
    let treeId = 0;

    useEffect(() => {
        fetch('/subtasks').then(
            response => response.json()).then(data => setSubtasks(data))
    }, []);

    const [tasks, setTasks] = useState([{ 
        taskTitle: '', 
        system: '', 
        taskAnalysts: '',
        taskPriority: '', 
        taskProgress: '', 
        num_subtask: '', 
        num_finding: '', 
        taskDueDate:''}])
    useEffect(() => {
        fetch('/tasks').then(
            response => response.json()).then(data => setTasks(data))
    }, []);
    const [systems, setSystems] = useState([{sysInfo: '', eventID: ''}])
    useEffect(() => {
        fetch('/getsystem').then(
            response => response.json()).then(data => setSystems(data))
    }, []);

    const [findings, setFindings] = useState([{hostName: '', systemID: ''}])
    useEffect(() => {
        fetch('/findings').then(
            response => response.json()).then(data => setFindings(data))
    }, []);


    const [events, setEvents] = useState([{ id: '', name: '', num_sys: '', num_findings: '', prog: '' }])
    
    useEffect(() => {
        fetch('/eventsOverview').then(
            response => response.json()).then(data => setEvents(data)) // Get info for Event Overview Table // 
    }, []);

    return (
        <TreeView>
            {events.map((event) => (
                <TreeItem nodeId={treeId++} label={event.name}>
                {systems.map((system) => (
                    (event.id === system.eventID ? <TreeItem nodeId={treeId++} label={system.sysInfo}> 
                        {findings.map((finding) => (
                            (system.id === finding.systemID ? <TreeItem nodeId={treeId++} label={system.id}></TreeItem> : console.log("Nothing"))
                            ))
                        }  
                    </TreeItem> : console.log("Nothing"))
                    ))
                }  
                </TreeItem>
                ))
            }  
        </TreeView>
    );
}


export default EventTree;