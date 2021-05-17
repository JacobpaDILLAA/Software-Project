import React from 'react';
import SubtaskContentView from './subtaskContentView';
import Tree from '../eventTree/eventTree'
import GeneralView from '../generalView/generalView'
class SubtaskMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            subtaskTitle: "",
            subtaskDescription: "",
            subtaskProgress: "",
            subtaskDueDate: "",
            analysts: "",
            collaborators: "",
            relatedTask: "",
            subtasks: "",
            attachments: "",
            numFindings: "",
            analyst: "",
            task: "",
            taskID: ""
        };
        this.updateData = this.updateData.bind(this);
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    async updateData() { 
        await this.sleep(1000);
        fetch('/subtasks').then(
            response => response.json()).then(data => this.setState({
                data: data
            })).catch(error => console.error(error));
    }

    render() {
        return (
            <div>
                <GeneralView /> 
                <SubtaskContentView
                    data={this.state.data}
                    updateData={this.updateData}
                />
                <div className="right-tree">
                    <Tree />
                </div>
            </div>
        );
    }
}

export default SubtaskMaster