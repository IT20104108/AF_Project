import React,{Component} from 'react' ;
import axios from "axios";

export default class Display_studentgroups extends Component{
    constructor(props){
        super(props);
        this.state = {
            studentgroups:[]
        };
    }
    onReadirect(id){
        window.location.href = `/addpanelmember/${id}`
    }
   componentDidMount(){
       this.retrieveStudentGroups();
   }
    retrieveStudentGroups(){
        axios.get("http://localhost:8070/displaystudentgroups").then(res=>{
            if(res.data.success){
                this.setState({
                    studentgroups:res.data.existingStudentgroups
                });
                console.log(this.state.studentgroups)
            }
        })
    }
    render(){
        return(
        <div className='container'>
            <table class="table">
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Student Name</th>
                        <th scope='col'>Group Name</th>
                        <th scope='col'>Panel Member</th>
                        <th scope='col'>Add Panel Member</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.studentgroups.map((studentgroups,index) =>(
                    <tr>
                        <th scope='row'>{index + 1}</th>
                        <td>{studentgroups.studentName}</td>
                        <td>{studentgroups.groupName}</td>
                        <td>{studentgroups.panelMember}</td>
                        <td>
                           <button onClick={()=>this.onReadirect(studentgroups._id)}>
                               edit
                           </button>
                              
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        )}
}