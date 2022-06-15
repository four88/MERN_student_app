import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import StudentTableRow from './StudentTableRow'

export default class StudentList extends Component {
  constructor(props){
    super(props);

    this.state = {
      students: [ ]
    }
  }

  //  after page render get the data from backend
  componentDidMount(){
    axios.get('http://localhost:4200/students')
      .then(res => {
        this.setState({
          students: res.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  DataTable = () =>{
    return this.state.students.map((res, i) => {
      return <StudentTableRow obj={res} key={i} />
  })
}


  render() {
    return (
      <div className="table-wrapper mt-5">
        <h1 className='mb-5'>Student list</h1>
        <Table striped bordered hover>
          <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Roll No</th>
                <th>Action</th>
              </ tr>
          </thead>
              <tbody>
                {this.DataTable()}
              </tbody>
        </ Table>
          
      </div>
    )
  }
}
