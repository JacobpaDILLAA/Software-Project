import * as React from 'react';
import 'react-bootstrap';
import GeneralView from '../generalView/generalView';
import '../assets/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
  function getCurrentDate(separator = '') {
    let newDate = new Date()
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${month < 10 ? `0${month}` : `${month}`}${separator}${day}${separator}${year}`
  }
  
  class setupContentView extends React.Component {
    constructor() {
      super();
      this.state = { name:'', desc: '', type: '', vers:'', assess_date:'', org_name:'',event_class:'',declass_date: '', customer_name:'',analyst:'',created_by:''};
      this.action = { date: "", action: "", analyst: "" };
      
    }
  
    onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit = (e) => {
      console.log("Logging in: ", this.state.analyst)
      this.state.created_by = this.state.analyst;
      localStorage.setItem('analyst',this.state.analyst)
      e.preventDefault();
      this.action.action = "submit event"; //Logging information
      this.action.date = getCurrentDate("/");
      this.action.analyst = "";
      this.props.history.push('/Event'); //Used for submit button, will navigate to page and push to the DB // 
  
      //send logging information to DB
      fetch('/addlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.action),
      }).then(response => response.json())
        .then(data => {
          console.log("Success", data);
        })
        .catch(error => {
          console.error('Error', error)
        });

        // Add a new event // 
        if(this.state[0] == null){ // Check if there are no events
          fetch('/addevent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state), 
            }).then(response => response.json())
            .then(data => {
              console.log("Success", data);
            })
            .catch(error => {
              console.error('Error', error)
            });

        }
    
  
    }
    //Checks for avaiable events in the DB 
    checkEvent () {
      fetch('/eventsOverview').then(
        response => response.json()).then(data => this.setState(data)) 
      if (this.state[0] == null){
        return <div style={{ textAlign: "center" }}><h6>There is no existing event in your system, please create an event. </h6>
        <input type="text" placeholder="e.g. Event 1" name="name" onChange={this.onChange} id="event-title" className="event-data" /></div>
      }
      else{
        return 
      }
      
    }
    // Renders the FRIC setup view 
    render() {
      return (
        <div>
          <GeneralView /><br />
          <h1 style={{ textAlign: "center" }}> Finding and Reporting Information Console (FRIC) </h1> <br />
          <div>
            {this.checkEvent()}
          </div>
          <form style={{ textAlign: "center" }} onSubmit={this.onSubmit} ><br /><br />
            <label>
              <h6>Please enter your intials</h6>
              <input type="text" placeholder="e.g. AC" name="analyst" onChange={this.onChange} id="analyst" className="event-data" />
            </label><br/><br/>
            <Button type="submit" className="btn" variant="outline-dark">Submit</Button> <br/><br/>
          </form>
        </div>
      );
    }
  }
  
  export default setupContentView;
  
  //  Keep for now //

  // import { useState } from "react";

// function getCurrentDate(separator = '') {
//   let newDate = new Date()
//   let day = newDate.getDate();
//   let month = newDate.getMonth() + 1;
//   let year = newDate.getFullYear();
//   return `${month < 10 ? `0${month}` : `${month}`}${separator}${day}${separator}${year}`
// }

// function SetupContentView(props) {

//   const [event, setEvent] = useState([{
//     name: '',
//     customer_name: ''
//   }])

//   let action = { date: "", action: "", analyst: "" };
//   let state = { data: [], name: "", customer_name: "" };
//   function onSubmit(e) {
//     e.preventDefault();
//     action.action = "submit event";//Logging information
//     action.date = getCurrentDate("/");
//     action.analyst = "";
//     props.history.push('/Event');//Used for submit button, will navigate to page and push to the DB

//     fetch('/addlog', {//used to send logging information to DB
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(action),
//     }).then(response => response.json())
//       .then(data => {
//         console.log("Success", data);
//       })
//       .catch(error => {
//         console.error('Error', error)
//       });

//     fetch('/addevent', {//used to send event information to the DB
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(state),
//     }).then(response => response.json())
//       .then(data => {
//         console.log("Success", data);
//       })
//       .catch(error => {
//         console.error('Error', error)
//       });

//   }
//   function onChange (e){
//     setEvent({ [e.target.name]: e.target.value });
//   }


//   function use() {
//     fetch('/eventsOverview').then(
//       response => response.json()).then(data => setEvent({
//         data: data
//       })).catch(error => console.error(error));
//   }

//   function checker() {
//     console.log(event.data)
//     if ((event.data === 0)) {
//       return <h4 style={{ textAlign: 'center' }}>No event</h4>;
//     }
//     else {
//       return <h4 style={{ textAlign: 'center' }}>Event</h4>;
//     }
//   }

//   return (
//     <div>
//       <GeneralView /><br />
//       {/* {use()} */}
//       {/* {checker()} */}
//       <h1 style={{ textAlign: "center" }}> Finding and Reporting Information Console (FRIC) </h1> <br />
//       <div>
//         <h4 style={{ textAlign: "center" }}> Checking...</h4>
//         {checker()}
//       </div>

//       <form style={{ textAlign: "center" }} onSubmit={onSubmit} ><br /><br />
//         <label>
//           <h6>There is no existing event in your system </h6>
//           <input type="text" placeholder="e.g. Event1"  name="name" id="event-title" className="event-data" />
//         </label> <br /><br />
//         <label>
//           <h6>Please enter your intials</h6>
//           <input type="text" placeholder="e.g. AC:"  name="customer_name" id="event-customer-name" className="event-data" />
//         </label><br /><br />

//         <Button type="submit" className="btn" variant="outline-dark" >Submit</Button> <br /><br />
//       </form>
//     </div>
//   );
// }


  // }
