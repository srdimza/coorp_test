import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function Form() {
const history = useHistory();
const [document_title, setDocTitle] = useState('');
const [fields, addField] = useState([{
    "field_seq": "",
    "is_mandatory": "",
    "field_type": "",
    "field_name": "",
    "select_values":"",
    "render_select": false
}]);

//adding new element to state list without any values and boolean value for its index
const newList = () => {
    let temp = [...fields, {
        "field_seq": "",
        "is_mandatory": "",
        "field_type": "",
        "field_name": "",
        "select_values":"",
        "render_select": false
    }]
    addField(temp);
}
//NOT FINISHED
const handleOptionChange = (e, index1) => {
    //value is created this way : Value_index
    const value_index = e.target.value.split("_");
  //  value_index[0] has value of Value
    if (value_index[0] === 'Select') {
      //  value_index[1] has value of index
      let index = parseInt(value_index[1]);
      let temp = fields;
      temp[index].render_select = true;
      addField(temp);
    }
    //updating state array with value which is selected
    let temp1 = fields;
    temp1[index1].field_type = value_index[0];
    addField(temp1);
  };
//post request to the url if Save is pressed and redirecting to Documents page
  const postDocument = () => {
  ///api/v1/documents/create
  const config = {
    headers:{
      'API-KEY': 'secret-api-key',
      'Content-Type': 'application/json'
    }
  };

  //fetching api
  const document_json = generateDocumentJSON();
  axios.post('http://20.251.116.121:8083/api/v1/documents/create', document_json, config)
      .then(response => console.log(response))
      .catch(error => {
          console.error('There was an error!', error);
      });
      history.push("/");
    }
  const generateDocumentJSON = () =>{

    const document = {
        //getting document name from the input field with className document_title
        "document_name": document_title,
        "form_values": []
    };
    fields.map((item) => (
        document.form_values.push({
            "field_seq": item.field_seq,
            "is_mandatory": item.is_mandatory,
            "field_type": item.field_type,
            "field_name": item.field_name,
            "select_values": item.select_values
        })
        ? document.form_values.field_type == "Input" :  document.field_name=1
        ? document.form_values.field_type == "Select" :  document.field_name=2
        ? document.form_valuesfield_type == "NumberInput" :  document.field_name=3
    ))
console.log(document);
return document;
  }

  //updating state after change in input fields in the correct index
 const  handleTitleChange = (event) => {
     setDocTitle(event.target.value);
  }
const handleNameChange = (e, index ) => {
    let temp = fields;
    temp[index].field_name = e.target.value;
    addField(temp);
}
 const handleSequenceChange = (e, index) => {
    let temp = fields;
    temp[index].field_seq = e.target.value;
    addField(temp);
 }
 const  handleMandatoryChange = (e, index) => {
    let temp = fields;
    temp[index].is_mandatory = e.target.value;
    addField(temp);
 }
 const  handleSelectedValuesChange = (e, index) => {
    let temp = fields;
    temp[index].select_values = e.target.value;
    addField(temp);
 }


  return (
    <div className ='form'>
     <form >
     <label>
            Document title
            <input type="text" onChange={handleTitleChange} defaultValue = {document_title} className="document_title"/>
        </label>
     {fields.map((item, index) => (
        <div key={index}>
        <label>
             Field sequence (weight)
            <input type="text" defaultValue = {item.field_seq}
 onChange= {(e) => handleSequenceChange(e, index)} />
        </label>
        <br></br>
        <label>
            Field type
            <select  onChange = {(e) => handleOptionChange(e, index)} defaultValue={item.field_type}>
            <option value="Input">Input</option>
            <option value={"Select_"+ index}>Select</option>
            <option value="NumberInput">NumberInput</option>
            </select>
        </label>
        {item.render_select ? <label><br/>Input has to be in json format<input type="text" onChange = {(e) => handleSelectedValuesChange(e, index)} defaultValue={item.select_values}/></label>: null}
        <br></br>
        <label>
             Field name
            <input type="text" onChange = {(e) => handleNameChange(e, index)} defaultValue={item.field_name} />
        </label>
        <br></br>
        <label>
            <input type="checkbox" id="mandatory" onChange = {(e) => handleMandatoryChange(e, index)} defaultValue={item.is_mandatory}></input>
            Mandatory
        </label>
        <br></br>
       </div>
     
      ))}
  <br></br>
     </form>
     <button onClick={newList}>Add more</button>
     <button type="submit" onClick={postDocument}>Save</button>
    </div>
  )
}
