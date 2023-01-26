import { BrowserRouter as Router, Route } from "react-router-dom";
import React, {useState, useEffect} from 'react'
import DocTable from "./DocTable";
import axios from 'axios';
import { useHistory } from "react-router-dom";
function Documents() {
  //adding header information
    const config = {
      headers:{
        'API-KEY': 'secret-api-key',
        'Content-Type': 'application/json'
      }
    };
    const [documents, setDocuments] = useState([])
    //fetching api
    useEffect(()=>{
        axios.get('http://20.251.116.121:8083/api/v1/documents',config)
        .then(res => {
            setDocuments(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    })
    //for navigation to dynamic form generation
    const history = useHistory();

    function navigateToDynamicFormPage() {
      history.push("/new-form");
    }
  return (
    <div className="documents">
      <button onClick={navigateToDynamicFormPage}>New document form</button>
      <DocTable documents = {documents}/>
    </div>
  );
}

export default Documents
