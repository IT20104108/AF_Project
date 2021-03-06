import React, { Component } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export default class CoSupervisorremove extends Component {
    constructor(props){
        super(props);
        this.state = {
            cosupervisorremove:[]
        };
    }  

    //retrive cosupervisor members 
componentDidMount(){
    this.retrievecosupervisorDetails();
} 
retrievecosupervisorDetails(){
    axios.get("http://localhost:8070/usersremove/getcosupervisor").then(res=>{
        if(res.data.status){
            this.setState({
                cosupervisorremove:res.data.cosupervisor
     });
    }
  })
 }

//delete cosupervisor
onDelete = (cosupervisorID) => {


    if (window.confirm('Are you sure you wish to delete this details?')) {
      axios.delete(`http://localhost:8070/usersremove/cosupervisordelete/${cosupervisorID}`).then((res) => {
        toast.warning('Details Deleted Successfully', { position: toast.POSITION.TOP_CENTER });
  
        //alert("Delete Successfully")
        this.retrievecosupervisorDetails();
  
      })
    }
  }

 render() {
    return ( 
                        <div>
                     <br/><br/>
                  <h3 align="center" style={{fontSize:'30px',fontFamily:"Times New Roman"}}>
              <b><u>All Co-Supervisor Details </u></b></h3><br/>
           <div className='container'>  
       <table className = "table table-hover">
          <thead>
             <tr bgcolor="#79BAEC">
                <th scope='col'>No</th>
                   <th scope='col'>Staff Member Name</th>
                       <th scope='col'>Faculty</th>
                         <th scope='col'>Feild</th>
                           <th scope='col'>Staff ID</th>
                         <th scope='col'>Role</th>
                     <th scope='col'>Email</th>
                 </tr>
             </thead>
               <tbody>
                   {this.state.cosupervisorremove.map((cosupervisorremove,index)=>(
                      <tr key={index}>    
                         <th scope='row'>{index + 1}</th>
                            <td>{cosupervisorremove.name}</td>
                               <td>{cosupervisorremove.faculty}</td>
                                 <td>{cosupervisorremove.feild}</td>
                            <td>{cosupervisorremove.staff_id}</td>
                        <td>{cosupervisorremove.role}</td>
                   <td>{cosupervisorremove.email}</td>
                   <td>
                     <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(cosupervisorremove._id)}>
              <i className="far fa-trash-alt"></i>&nbsp;Delete
            </a>   
                     </td>              
                </tr>
                  )
                    )}
                      </tbody>     
                         </table>
                            </div>
                              </div>
    )
  }
}