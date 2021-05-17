import * as React from 'react'
import 'react-bootstrap'
import DatePicker from "react-datepicker";   // Need to udate npm install: npm install react-datepicker --save
import "react-datepicker/dist/react-datepicker.css"; // For calendar function
import GeneralView from '../generalView/generalView';
import { useState} from "react";//For calendar use
//import GeneralView from '../generalView/generalView';
//import '../assets/css/bootstrap.css'
//import React from 'react';
//import './styles.css';

//class notification extends React.Component {
    // // render() {
        
    //     return (
    //         <div>
    //             {/*<GeneralView /> <br/><br/><br/>*/}
    //             {/* <div style={{textAlign:"center"}}className="Notify">
                    

    //                 <label for="taskTitle">
    //                     Task Title:<br/>
    //                     <input type="text" name="taskT" id="tTitle" className="T-title" placeholder="Task1" />
    //                 </label><br />

    //                 <label for="taskDueDate">
    //                     Task Due Date:<br/>
    //                     <input type="text" name="task-Due-Date" id="tDueDate" className="T-dueDate" placeholder="11/11/2020" />
    //                 </label><br/>

    //                 <label for="subtaskTitle">
    //                     SubTask Title:<br/>
    //                     <input type="text" name="subtaskT" id="sTitle" className="S-title" placeholder="Subtask3"/>
    //                 </label><br />

    //                 <label for="subtaskDueDate">
    //                     SubTask Due Date:<br/>
    //                     <input type="text" name="subtask-Due-Date" id="sDueDate" className="S-dueDate" placeholder="11/10/2020"/>
    //                 </label><br/>

                    

    //             </div>     */}

    //         </div>
    //     );
    // }
//}

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <table>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('name')}
              className={getClassNamesFor('name')}
            >
              Name
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Picker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
  );
};

export default function notification() {

  
  return (
    <div className="App">
      <GeneralView />
      <ProductTable
        products={[
          { id: 1, name: 'Luis'},
          { id: 2, name: 'Iaias'},
          { id: 3, name: 'Andrew'},
          { id: 4, name: 'Jacob'},
        ]}
      />

        <div>
          <h4> Example for the calendar </h4>
        <Picker/>
        </div>

    </div>
  );
}



//export default notification;