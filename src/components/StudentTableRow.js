import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'


export default class StudentTableRow extends Component {

  deleteStudent = () => {
    axios.delete('http://localhost:4200/students/delete-student/' + this.props.obj._id).
      then((res) => {
        console.log('Student successfully deleted');
      }).catch((error) => {
        console.log(error)
      })
      
    // refresh page
    window.location.reload(false)
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.email}</td>
        <td>{this.props.obj.rollno}</td>
        <td className='d-flex justify-content-center gap-1'>
          <Link className="edit-link btn btn-primary" to={"/edit-student/" + this.props.obj._id}>
            Edit
          </Link>
          <Button onClick={ this.deleteStudent } variant="danger">Delete</Button>
        </td>
      </tr>
    )
  }
}
