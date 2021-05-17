import React from 'react';
import SystemContentView from './systemContentView';
import Tree from '../eventTree/eventTree'
import GeneralView from '../generalView/generalView'
class SystemMaster extends React.Component {
    constructor(props) {
        super(props);
        //This will be used to hold the information that will later be updated in content view.
        this.state = {
            data: [],
        };

        this.updateData = this.updateData.bind(this);
    }

    //Sleep function to slow down updateData
    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    //Fetch data from the System Collection
    async updateData() {
        await this.sleep(1000);
        fetch('/getsystem').then(
            response => response.json()).then(data => this.setState({
                data: data
            })).catch(error => console.error(error));
    }

    render() {
        return (
            <div>
                <GeneralView />
                <SystemContentView
                    //Send data to update it in content view and update data method to call it to re-send information
                    data={this.state.data}
                    updateData={this.updateData}
                />
                <div className="right-tree">
                    {/**
                     * Tree view of all events,systems, tasks, and findings
                     */}
                    <Tree />
                </div>
            </div>
        );
    }
}

export default SystemMaster