import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import eventContentView from './eventcontentview/eventContentView';
import eventDetailedView from './eventcontentview/eventDetailedView';
import analystSummaryView from './analystsummaryview/analystSummaryView';


import systemContentView from './systemcontentview/systemContentView';
import systemDetailedView from './systemcontentview/systemDetailedView';
import systemMaster from './systemcontentview/systemMaster';


import findingContentView from './findingscontentview/findingContentView';
import findingDetailedView from './findingscontentview/findingDetailedView';
import findingMaster from './findingscontentview/findingMaster';


import subtaskContentView from './subtaskContentView/subtaskContentView';
import subtaskDetailedView from './subtaskContentView/subtaskDetailedView.js'
import subtaskMaster from './subtaskContentView/subtaskMaster';


import archiveContentView from './archivecontentview/archiveContentView';
import archiveMaster from './archivecontentview/archiveMaster';

import configurationContentView from './configurationContentView/configurationContentView';

import taskContentView from './taskcontentview/taskContentView.js';
import taskDetailedView from './taskcontentview/taskDetailedView.js'
import taskMaster from './taskcontentview/taskMaster'

import setupContentView from './setupContentView/setupContentView.js';
import helpView from './helpView/helpView.js';
import eventTree from './eventTree/eventTree';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import notification from './notificationView/notification.js';

ReactDOM.render(
  <Router>
    <Route exact path="/">
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </Route>
    <Route exact path="/Event" component={eventContentView} />
    <Route exact path="/EventDetailed" component={eventDetailedView} />
    <Route exact path="/Task" component={taskContentView} />
    <Route exact path="/TaskDetails" component={taskDetailedView} />
    <Route exact path="/TaskMaster" component={taskMaster} />

    <Route exact path="/AnalystSummary" component={analystSummaryView} />

    <Route exact path="/SystemContent" component={systemContentView} />
    <Route exact path="/SystemDetailed" component={systemDetailedView} />
    <Route exact path="/SystemMaster" component={systemMaster} />

    <Route exact path="/FindingContent" component={findingContentView} />
    <Route exact path="/FindingDetailed" component={findingDetailedView} />
    <Route exact path="/FindingMaster" component={findingMaster} />

    <Route exact path="/Subtask" component={subtaskContentView} />
    <Route exact path="/SubtaskDetails" component={subtaskDetailedView} />
    <Route exact path="/SubtaskMaster" component={subtaskMaster} />

    <Route exact path="/ArchiveMaster" component={archiveMaster} />
    <Route exact path="/Archive" component={archiveContentView} />
    
    <Route exact path="/Configuration" component={configurationContentView} />
    <Route exact path="/Setup" component={setupContentView} />
    <Route exact path="/Help" component={helpView} />
    <Route exact path="/Tree" component={eventTree} />
    <Route exact path="/Notify" component={notification} />

  </Router>,
  document.getElementById('root')

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
