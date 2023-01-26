import './App.css';
//import { BrowserRouter as Routes, Route } from "react-router-dom";
import React, {useState, useEffect} from 'react'
//import { useFetcher } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Documents from './Documents/Documents';
import Form from './Form/Form';
function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Documents />
        </Route>
        <Route path="/new-form">
          <Form />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
