import * as React from 'react'
import Table from 'react-bootstrap/Table'
import GeneralView from '../generalView/generalView';
import 'react-bootstrap'
import '../assets/css/bootstrap.css'
import Tree from '../eventTree/eventTree';
import Button from 'react-bootstrap/Button';
import './configuration.css';

class configurationContentView extends React.Component { 
    render() {
        return (
            <div>
                <GeneralView/>
                <div className="main">
                    <div class="ConfigureView">
                        <h2>Configuration view</h2>
                    </div> <br/>
                    <div>
                        <h3> Finding Information Table </h3>
                        <Table bordered hover striped responsive>
                            <thead class = "thead-grey">
                                <tr>
                                    <th> Name </th>
                                    <th> Finding Type </th>
                                    <th> Changes </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> Finding1 </td>
                                    
                                    <td> 
                                        <div class="btn-group">
                                            <select class="broswer-default custom-select mr-3">

                                                <option> Credentials Complexity </option>
                                                <option> Manufacturer Default Creds </option>
                                                <option> Lack of Authentication </option>
                                                <option> Plain Text Protocols </option>
                                                <option> Plain Text Web Login </option>

                                                <option> Encryption </option>
                                                <option> Authentication Bypass </option>
                                                <option> Port Security </option>
                                                <option> Access Control </option>
                                                <option> Least Privilege </option>
                                                
                                                <option> Privilege Escalation </option>
                                                <option> Missing Patches </option>
                                                <option> Physical Security </option>
                                                <option> Information Disclosure </option>

                                            </select>
                                        </div>
                                    </td>  
                                    <td> <Button type="submit" className="btn" variant="outline-dark" > Submit </Button> </td>     
                                </tr> 
                                
                            </tbody>
                        </Table>
                    </div>

                    <div>
                        <br/><br/>
                        <h3> Posture Table </h3>
                        <Table bordered hover striped >
                            <thead class = "thead-grey">
                                <tr>
                                    <th> Name </th>
                                    <th>Posture type</th>
                                    <th> Changes </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> analyst1 </td>
                                    <td> 
                                        <div class="btn-group">
                                            <select class="broswer-default custom-select mr-3">

                                                <option> Insider </option>
                                                <option> Insider-nearsider </option>
                                                <option> Outsider  </option>
                                                <option> Nearsider </option>
                                                <option> Nearsider-outsider </option>

                                            </select>
                                        </div>
                                    </td>
                                    <td> <Button type="submit" className="btn" variant="outline-dark" > Submit </Button> </td>
                                    
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div>
                        <br/><br/>
                        <h3> Threat Level Table </h3>
                        <Table bordered hover striped >
                            <thead class = "thead-grey">
                                <tr>
                                    <th> Name </th>
                                    <th> Threat Level Type </th>
                                    <th> Changes </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> System "a"</td>
                                    <td> 
                                        <div class="btn-group">
                                            <select class="broswer-default custom-select mr-3">

                                                <option> Confirmed </option>
                                                <option> Expected </option>
                                                <option> Anticipate </option>
                                                <option> Predicted </option>
                                                <option> Possible  </option>

                                            </select>
                                        </div>
                                    </td>
                                    <td> <Button type="submit" className="btn" variant="outline-dark" > Submit </Button> </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div>
                        <br/><br/>
                        <h3> Impact Table </h3>
                        <Table bordered hover striped >
                            <thead class = "thead-grey">
                                <tr>
                                    <th> Name </th>
                                    <th> Impact Type </th>  
                                    <th> Changes </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> System "a" </td>
                                    <td> 
                                        <div class="btn-group">
                                            <select class="broswer-default custom-select mr-3">

                                                <option> Very High () </option>
                                                <option> High () </option>
                                                <option> Moderate () </option>
                                                <option> Low () </option>
                                                <option> Very Low () </option>
                                                <option> Informational </option>

                                            </select>
                                        </div>
                                    </td>
                                    <td> <Button type="submit" className="btn" variant="outline-dark" > Submit </Button> </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div>
                        <br/><br/>
                        <h3> Finding Classification Table </h3>
                        <Table bordered hover striped >
                            <thead class = "thead-grey">
                                <tr>
                                    <th> Name </th>
                                    <th> Classification Type </th>
                                    <th> Changes </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> Finding "a"</td>
                                    <td>
                                        <div class="btn-group">
                                            <select class="broswer-default custom-select mr-3">

                                                <option> Vulnerability </option>
                                                <option> Informational </option>
                
                                            </select>
                                        </div>
                                    </td>
                                    <td> <Button type="submit" className="btn" variant="outline-dark" > Submit </Button> </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div>
                        <br/><br/>
                        <h3> Countermeasure Table </h3>
                        <Table bordered hover striped >
                            <thead class = "thead-grey">
                                <tr>
                                    <th> Name </th>
                                    <th> Countermeasure Type </th>
                                    <th> Changes </th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> System "a"</td>
                                    <td>
                                        <div class="btn-group">
                                            <select class="broswer-default custom-select mr-3">

                                                <option> Very High </option>
                                                <option> High </option>
                                                <option> Moderate </option>
                                                <option> Low </option>
                                                <option> Very Low </option>

                
                                            </select>
                                        </div>
                                    </td>
                                    <td> <Button type="submit" className="btn" variant="outline-dark" > Submit </Button> </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div>
                        <br/><br/>
                        <h3> Event Classification Table </h3>
                        <Table bordered hover striped >
                            <thead class = "thead-grey">
                                <tr>
                                    <th> Name </th>
                                    <th> Event Classification Type </th>
                                    <th> Changes </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> System "a" </td>
                                    <td>
                                        <div class="btn-group">
                                            <select class="broswer-default custom-select mr-3">

                                                <option> Top Secret </option>
                                                <option> Secret </option>
                                                <option> Confidential </option>
                                                <option> Classified </option>
                                                <option> Unclassified </option>

                
                                            </select>
                                        </div>
                                    </td>
                                    <td> <Button type="submit" className="btn" variant="outline-dark" > Submit </Button> </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div>
                        <br/><br/>
                        <h3> Level Table </h3>
                        <Table bordered hover striped >
                            <thead class = "thead-grey">
                                <tr>
                                    <th> Name </th>
                                    <th> Level Type </th>
                                    <th> Changes </th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> System "a"</td>
                                    <td>
                                        <div class="btn-group">
                                            <select class="broswer-default custom-select mr-3">

                                                <option> Confidentiality Finding Impact On System </option>
                                                <option> Integrity Finding Impact On System </option>
                                                <option> Availability Finding Impact On System </option>
                                      
                                            </select>
                                        </div>
                                    </td>
                                    <td> <Button type="submit" className="btn" variant="outline-dark" > Submit </Button> </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div>
                        <br/><br/>
                        <h3> Event Type Table </h3>
                        <Table bordered hover striped >
                            <thead class = "thead-grey">
                                <tr>
                                    <th> Name </th>
                                    <th> Event Type </th>
                                    <th> Changes </th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> Event "a" </td>
                                    <td>
                                        <div class="btn-group">
                                            <select class="broswer-default custom-select mr-3">

                                                <option> Co-operative Vulnerability Penetration Assessment (CVPA) </option>
                                                <option> Co-operative Vulnerability Investigation (CVI) </option>
                                                <option> Verification Of Fixes (VOF) </option>
                                      
                                            </select>
                                        </div>
                                    </td>
                                    <td> <Button type="submit" className="btn" variant="outline-dark" > Submit </Button> </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div>
                        <br/><br/>
                        <h3> Finding Impact Table </h3>
                        <Table bordered hover striped >
                            <thead class = "thead-grey">
                                <tr>
                                    <th> Name </th>
                                    <th> Finding Impact Type </th>
                                    <th> Changes </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>System "a"</td>
                                    <td>
                                        <div class="btn-group">
                                            <select class="broswer-default custom-select mr-3">

                                                <option> Confidentiality </option>
                                                <option> Integrity </option>
                                                <option> Availability </option>
                                      
                                            </select>
                                        </div>
                                    </td>
                                    <td> <Button type="submit" className="btn" variant="outline-dark" > Submit </Button> </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div>
                        <br/><br/>
                        <h3> Severity Category Code Table </h3>
                        <Table bordered hover striped >
                            <thead class = "thead-grey">
                                <tr>
                                    <th> Name </th>
                                    <th> Severity Code Type </th>
                                    <th> Changes </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>System "c"</td>
                                    <td>
                                        <div class="btn-group">
                                            <select class="broswer-default custom-select mr-3">

                                                <option> I </option>
                                                <option> II </option>
                                                <option> III </option>
                                      
                                            </select>
                                        </div>
                                    </td>
                                    <td> <Button type="submit" className="btn" variant="outline-dark" > Submit </Button> </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div>
                        <br/><br/>
                        <h3> Progress Table </h3>
                        <Table bordered hover striped >
                            <thead class = "thead-grey">
                                <tr>
                                    <th> Name </th>
                                    <th> Progress Type </th>
                                    <th> Changes </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> System "f"</td>
                                    <td>
                                        <div class="btn-group">
                                            <select class="broswer-default custom-select mr-3">

                                                <option> Not Started </option>
                                                <option> Assigned </option>
                                                <option> Transferred </option>
                                                <option> In Progress </option>
                                                <option> Complete  </option>
                                                <option> Not Applicable </option>
                                      
                                            </select>
                                        </div>
                                    </td>
                                    <td> <Button type="submit" className="btn" variant="outline-dark" > Submit </Button> </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div>
                        <br/><br/>
                        <h3> Event Rules Table </h3>
                        <Table bordered hover striped >
                            <thead class = "thead-grey">
                                <tr>
                                    <th> Name </th>
                                    <th> Event Rules</th>
                                    <th> Changes </th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> Event "a"</td>
                                    <td>
                                        <div class="ruleInformation">
                                            <form>
                                                <input type="text" id="EventRules" name="rule" placeholder="The rules for event a ..." />
                                            </form>
                                        </div>  
                                    </td>
                                    <td> <Button type="submit" className="btn" variant="outline-dark" > Submit </Button> </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div>
                        <br/><br/>
                        <h3> Report Template Table </h3>
                        <Table bordered hover striped >
                            <thead class = "thead-grey">
                                <tr>
                                    <th> Name </th>
                                    <th> Report Type </th>
                                    <th> Changes </th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> System "a" </td>
                                    <td>
                                        <div class="btn-group">
                                            <select class="broswer-default custom-select mr-3">

                                                <option> Risk Matrix </option>
                                                <option> ERB Report </option>
                                                <option> Final Technical Report </option>
                                             
                                            </select>
                                        </div>
                                    </td>
                                    <td> <Button type="submit" className="btn" variant="outline-dark" > Submit </Button> </td>
                                </tr>
                                
                            </tbody>
                        </Table>
                    </div>

                    <div>
                        <br/><br/>
                        <h3> Notification Table </h3>
                        <Table bordered hover striped >
                            <thead class = "thead-grey">
                                <tr>
                                    <th> Name </th>
                                    <th> Duration </th> 
                                    <th> Frequency </th>
                                    <th> Changes </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> Task2</td>
                                    <td> 1 day </td>
                                    <td> 2 min</td> 
                                    <td> <Button type="submit" className="btn" variant="outline-dark" > Submit </Button> </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>   
                </div>
                <div class="right-tree">
                    <Tree />
                </div>
            </div>
        );
        
    }
}

export default configurationContentView;