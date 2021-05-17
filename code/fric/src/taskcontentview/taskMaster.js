import React from 'react';
import TaskContentView from './taskContentView';
import Tree from '../eventTree/eventTree'
import GeneralView from '../generalView/generalView'
class TaskMaster extends React.Component {
    constructor(props) {
        super(props);
        //Used to hold information about taskContentVIew
        this.state = {
            data3: [],
            id: "",
            taskTitle: "", 
            taskDescription: "", 
            system: "", 
            taskPriority: "", 
            taskProgress: "", 
            taskDueDate: "", 
            taskAnalysts: "", 
            taskCollaborators: "", 
            relatedTasks: "", 
            attachments: "",
            subtaskID:"",
            systemID: '',
        };
        this.updateData = this.updateData.bind(this);
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
    
    //Fetches information about current task content
    async updateData() {
        await this.sleep(1000);
        fetch('/tasks').then(
            response => response.json()).then(data => this.setState({
                data3: data
            })).catch(error => console.error(error));
    }

    render() {
        return (
            <div>
                <GeneralView/>
                <TaskContentView
                    data={this.state.data3}
                    updateData={this.updateData}
                />
                <div className="right-tree">
                    <Tree />
                </div>
            </div>
        );
    }
}

export default TaskMaster