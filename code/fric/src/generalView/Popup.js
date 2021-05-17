import React from 'react';
import './style.css';

class Popup extends React.Component {
  render() {
    return (
      <div className='detailedView'>
        <div className='innerDetailedView'>
          <h1>{this.props.text}</h1>

            <div>{this.props.text}</div>



          

        <button onClick={this.props.closePopup}>Save</button>
        <button onClick={this.props.closePopup}>Delete</button>
        <button onClick={this.props.closePopup}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default Popup;