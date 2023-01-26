import React, {useState, useEffect} from 'react'
//import { useFetcher } from 'react-router-dom';

function DocTable({documents}) {

  return ( 
  <div>
    <table>
    <tbody>
    <tr className='table_header'>
    <th>ID</th>
    <th>DOCUMENT TITLE</th>
    <th>CREATED DATE</th>
    <th>DOCUMENT SIZE</th>
  </tr>
     {documents.map((item, index) => (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.document_name}</td>
          <td>{item.created_at}</td>
          <td>{item.field_count}</td>
          <td><a href='#'>Document preview</a></td>
        </tr>
      ))}
      </tbody>
    </table>
  </div>); }

  
export default DocTable;