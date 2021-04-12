import * as React from 'react';
import '../Style/Setup.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button'

class Setup extends React.Component{
    render(){
        return(
            <div className="main">
                <h1> Find and Reporting Information Console (FRIC) </h1><br/>
                <div className="Information-box">
                    <form>
                        <label>
                            <h6>Please enter intials</h6>
                            <input type="text" placeholder="e.g. AC " name="analyst" id="analyst"/> <br/>
                        </label> <br/>
                        <Button type="submit" variant="primary"> Submit </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Setup;