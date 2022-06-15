import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export default class EditStudent extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      name: '',
      email: '',
      rollno: ''
    }
  }

  componentDidMount(){

    // get new data after refresh render page
    axios.get('http://localhost:4200/students/edit-student' + this.props.match.params.id).
      then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          rollno: res.data.rollno
        })
      })
    .catch ((error) => {
      console.log(error)
    })
  }

  onChangeStudentName = (e) => {
    this.setState({name: e.target.value})
  }

  onChangeStudentEmail = (e) => {
    this.setState({email: e.target.value})
  }

  onChangeStudentRoll = (e) => {
    this.setState({rollno: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault()

    const studentObject = {
      name: this.state.name,
      email: this.state.email,
      rollno: this.state.rollno
    };

    // send data to create-studnet route on backend
    axios.put('http://localhost:4200/students/update-student/' + this.props.match.params.id, studentObject).then((res) => {
      console.log(res.data);
      console.log('Student successfully updated');
    }).catch((error) => {
      console.log(error);
    }) 

    // redirect to student list 
    this.props.history.push('/student-list')

  }

  
  
  render() {

    return (
      <div className="form-wrapper mt-5">
          <h1>Update Student</h1>
          <Form onSubmit={ this.onSubmit}>
            <Form.Group controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName} />
            </Form.Group>

            <Form.Group controlId="Email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail}/>
            </Form.Group>

            <Form.Group controlId="Roll" className="mt-3">
              <Form.Label>Roll No.</Form.Label>
              <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeStudentRoll}/>
            </Form.Group>

            <Button variant="success" size="lg" type="submit" block="block" className="mt-4 w-100">
              Update student
            </Button>  
          </Form>
      </div>

          )
  }
}

