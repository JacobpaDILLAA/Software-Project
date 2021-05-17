import React from 'react';
import FindingContentView from './findingContentView';
import Tree from '../eventTree/eventTree'
import GeneralView from '../generalView/generalView'

class FindingMaster extends React.Component {
    constructor() {
        super();
        this.flag = false;
        this.state = {
            data: [],
            id: '', 
            hostName: '',
            ip_port: '',
            description: '',
            longDescription: '',
            findingStatus: '',
            findingType: '',
            findingClassification: '',
            findingSystem: '',
            findingTask: '',
            findingSubtask: '',
            relatedFindings: '',
            findingConfidentiality: '',
            findingIntegrity: '',
            findingAvailability: '',
            findingAnalyst: '',
            findingCollaborators: '',
            findingPosture: '',
            mitigationDesc: '',
            mitigationLongDesc: '',
            threatRelevence: '',
            countermeasure: '',
            impactDesc: '',
            impactLevel: '',
            severityCategoryScore: '',
            vulnerabilityScore: '',
            quantitativeScore: '',
            findingRisk: '',
            findingLikelihood: '',
            findingCFIS: '',
            findingIFIS: '',
            findingAFIS: '',
            impactScore: '',
            activeTasks: '',
            findingFiles:'',
            severityCategoryCode: '',
            systemID: '',
            taskID: '',
            subtaskID: '',
            analyst: '',
        };

        this.updateData = this.updateData.bind(this);

    }
    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    async updateData() {
        await this.sleep(1000);
        // fetch('/analystFindings').then(
        //     response => response.json()).then(data => this.setState({
        //         data: data
        //     })).catch(error => console.error(error));

            fetch('/analystFindings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(localStorage.getItem('analyst')), 
            }).then(response => response.json())
                .then(data => {
                    this.setState({data: data})
                    console.log("Success", data);
                })
                .catch(error => {
                    console.error('Error', error)
                });
    }

    render() {
        return (
            <div>
                <GeneralView />
                <FindingContentView
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

export default FindingMaster