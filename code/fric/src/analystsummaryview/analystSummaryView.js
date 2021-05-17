import * as React from 'react'
import '../assets/css/bootstrap.css'
import SystemContentView from '../systemcontentview/systemContentView'
import GeneralView from '../generalView/generalView'
import TaskContentView from '../taskcontentview/taskContentView'
import SubtaskContentView from '../subtaskContentView/subtaskContentView'
import FindingContentView from '../findingscontentview/findingContentView'
import "react-sweet-progress/lib/style.css";
class analystSummaryView extends React.Component {
    constructor() {
        super();
        this.state = {
            taskdata: [],
            subtaskdata: [],
            findingdata: [],
            systemdata: [],
        };
        this.updateData = this.updateData.bind(this);
    }

    //Fetches information about current task content
    componentDidMount() {
        //Display arc system
        fetch('/getsystem').then(
            response => response.json()).then(systemdata => this.setState({
                systemdata: systemdata
            })).catch(error => console.error(error));

        fetch('/analystFindings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(localStorage.getItem('analyst')),
        }).then(response => response.json())
            .then(findingdata => {
                this.setState({ findingdata: findingdata })
                console.log("Success", findingdata);
            })
            .catch(error => {
                console.error('Error', error)
            });

        fetch('/tasks').then(
            response => response.json()).then(taskdata => this.setState({
                taskdata: taskdata
            })).catch(error => console.error(error));
        fetch('/subtasks').then(
            response => response.json()).then(subtaskdata => this.setState({
                subtaskdata: subtaskdata
            })).catch(error => console.error(error));
    }



    updateData() {
    }

    render() {
        return (
            <div>
                <GeneralView />
                <div className="main">
                    <div id="tableSummary">
                        <h1>Analyst Progress Summary View</h1>
                        <div id="systemTable">
                            <SystemContentView
                                data={this.state.systemdata}
                                updateData={this.updateData} />
                        </div>
                        <div id="taskTable">
                            <TaskContentView
                                data={this.state.taskdata}
                                updateData={this.updateData} />
                        </div>
                        <div id="subtaskTable">
                            <SubtaskContentView
                                data={this.state.subtaskdata}
                                updateData={this.updateData} />
                        </div>

                        <div id="findingTable">
                            <FindingContentView
                                data={this.state.findingdata}
                                updateData={this.updateData} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default analystSummaryView;