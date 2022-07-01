import React from "react";
import ReactDOM from "react-dom";

import { ReactFormBuilder, ElementStore } from "react-form-builder2";
import Modal from "./modal";

import { get, post } from "./requests";

const getUrl = (cid) =>
  `https://safe-springs-35306.herokuapp.com/api/formdata?cid=${cid}`;

// const content = [
//   {
//     id: 'C68B673B-3948-4D62-AF6D-5320CAB4DDB7',
//     element: 'TextInput',
//     text: 'Text Input',
//     required: true,
//     canHaveAnswer: true,
//     field_name: 'text_input_EEA6F5DA-5C2C-43D3-AB62-62385E3925D9',
//     label: '<div>Name</div>\n',
//   },
//   {
//     id: '6DAF1E95-44F6-4E5B-ABDD-D9A6BCA2C08A',
//     element: 'TextInput',
//     text: 'Text Input',
//     required: true,
//     canHaveAnswer: true,
//     field_name: 'text_input_C5305462-9704-4E77-BFAB-A43C14AB2B8E',
//     label: '<div>Email</div>\n',
//   },
// ];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formId: "1", show: false, elementList: [] };
    this.formId = this.state.formId;
    this.handleChange = this.handleChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  formId;

  handleChange(event) {
    this.formId = event.target.value;
    const url = getUrl(this.formId);
    console.log("handleChange", url);
    //ElementStore.dispatch('load', { loadUrl: url });
    //this.setState({ formId: this.formId });
  }

  onLoad = (data) => {
    const url = getUrl(this.formId);
    console.log("onLoadData", data);
    console.log("onLoad", url);
    this.setState({ elementList: [] });
    return get(url);
  };

  onPost = (data) => {
    const saveUrl = getUrl(this.formId);
    //console.log("onPost", data);

    if (this.state.elementList.length === 0) {
      console.log("0");
      this.setState({ elementList: data });
      //this.state.elementList = data;
      console.log("elementList", this.state.elementList);
    }

    if (this.state.elementList.length > 0) {
      console.log(">0");
      let _length_before_modify = this.state.elementList.length;
      this.setState({ elementList: data });
      let _length_after_modify = this.state.elementList.length;
      console.log("before", _length_before_modify);
      console.log("after", _length_after_modify);

      if (_length_before_modify !== _length_after_modify) {
        console.log("Changes");
      }
    }

    //post(saveUrl, data);
    //this.showModal();
  };

  render() {
    return (
      <div className="App">
        {/* <label>
          Select your form:          
        </label>
        <select className="form-control" 
            value={this.state.formId} 
            onChange={this.handleChange} >
          <option value="1">Form 1</option>
          <option value="2">Form 2</option>
        </select>
        <hr></hr> */}
        <ReactFormBuilder
          // data={content}
          onLoad={this.onLoad}
          onPost={this.onPost}
        />
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>Modal</p>
        </Modal>
      </div>
    );
  }
}

export default App;
