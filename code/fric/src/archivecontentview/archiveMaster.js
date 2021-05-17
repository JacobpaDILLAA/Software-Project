import React from 'react';
import Tree from '../eventTree/eventTree'
import GeneralView from '../generalView/generalView'
import ArchiveContentView from './archiveContentView';
class ArchiveMaster extends React.Component {
    constructor(props) {
        super(props);
        //Used to hold information about taskContentVIew
        this.state = {
            taskdata: [],
            subtaskdata: [],
            findingdata: [],
            systemdata: [],
        };
        this.updateData = this.updateData.bind(this);
    }



    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    //Fetches information about current task content
    async updateData() {
        await this.sleep(5000);
        //display arch_task
        await fetch('/arch_task').then(
            response => response.json()).then(taskdata => this.setState({
                taskdata: taskdata
            })).catch(error => console.error(error));


        // display arch_subtask
        // fetch('/arch_subtask').then(
        //     response => response.json()).then(subtaskdata => this.setState({
        //         subtaskdata: subtaskdata
        // })).catch(error => console.error(error));

        //Display arch_finding
        fetch('/arch_finding').then(
            response => response.json()).then(findingdata => this.setState({
                findingdata: findingdata
            })).catch(error => console.error(error));

        //Display arch_system
        await fetch('/arch_system').then(
            response => response.json()).then(systemdata => this.setState({
                systemdata: systemdata
            })).catch(error => console.error(error));
        
    }

    render() {
        return (
            <div>
                <GeneralView />
                <ArchiveContentView
                    taskdata={this.state.taskdata}
                    subtaskdata={this.state.subtaskdata}
                    findingdata={this.state.findingdata}
                    systemdata={this.state.systemdata}
                    updateData={this.updateData}
                />
                <div className="right-tree">
                    <Tree />
                </div>
            </div>
        );
    }
}

export default ArchiveMaster