
import axios from 'axios';
import {Component,changeHandler,state,deleteUser} from 'react';
import { Redirect } from "react-router";
import {ToastContainer,toast,Zoom,Bounce} from 'react-toastify'
class viewUser extends Component{

state ={

data:[]



}


componentDidMount(){
axios.get('http://localhost:3000/show').then((response)=>{
this.setState({
    data:response.data.data
})

})

}

deleteUser=(id)=>{

axios.delete('http://localhost:3000/delete/'+id).then((response)=>{


})

}



    changeHandler =(e)=>{
        this.setState({


            [e.target.name]:e.target.value
        })


    }

    render(){

        return(
            <div>
                <div class="container">
    <div class="row">

        {

this.state.data.map((data)=>{
    return(
        <div class="col-md-4" style={{marginTop:20}}>
        <div class="card profile-card-3">
            <div class="background-block">
                <img src="https://images.unsplash.com/photo-1488900128323-21503983a07e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="profile-sample1" class="background"/>
            </div>
            <div class="profile-thumb-block">
                <img src={"http://localhost:3000/images/"+data.Profile}alt="profile-image" class="profile"/>
            </div>
            <div class="card-content">
            <h2>{data.FirstName+" "+data.Lastname}<small>{data.PhoneNumber}</small></h2>
            <div class="icon-block"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"> <i class="fa fa-twitter"></i></a><a href="#"> <i class="fa fa-google-plus"></i></a></div>
            <div class="icon-block"><a href="#"><i class="fa fa-trash" onClick={this.deleteUser.bind(this,data._id)}></i></a></div>
            
            </div>
        </div>
        
    </div>
    
    )
})

        }
    
    </div>
  </div>
            </div>
           
        )
    }



}
export default viewUser