import { Component ,state,submitUser,changeHandler, inputHandler} from "react";
import axios from 'axios'
import {Link} from 'react-router-dom'
import { ToastContainer,toast } from "react-toastify";
class Registration extends Component{


state={

fname:"",
lname:"",
phone:"",
username:"",
password:"",
profile:null,
type:"Customer"

}


changeHandler = (e) =>{

this.setState({

    [e.target.name] :e.target.value
})

}
inputHandler = (e) =>{

    this.setState({
      profile:e.target.files[0],
      loaded:0
    })
  console.log(e.target.files[0])
  
  
  }
submitUser =(e)=>{
e.preventDefault();


const userData = new FormData()
userData.append( 'fname' ,this.state.fname)
userData.append( 'lname',this.state.lname)         
userData.append('phone',this.state.phone)
userData.append('username',this.state.username)
userData.append('password',this.state.password) 
userData.append('profile',this.state.profile)
userData.append('type',this.state.type)

axios.post("http://localhost:3000/insert",userData).then((response)=>{

 toast.success("Registration Success")
 window.location.href="/login"
    }).catch()
}
    





    render(){
        return(

         <div>
             <ToastContainer/>
             
<div className="container hello" >
    <div className="row py-5 mt-4 align-items-center">

        <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
            <img src="https://www.freepnglogos.com/uploads/food-png/food-grass-fed-beef-foodservice-products-grass-run-farms-4.png" alt="" className="img-fluid mb-3 d-none d-md-block"/>
            <h1>Create an Account</h1>
            <p className="font-italic text-muted mb-0">Create a free account and order food from any where.</p>
            <p className="font-italic text-muted">Mero Food<a href="https://bootstrapious.com" className="text-muted">
                <u>.com</u></a>
            </p>
        </div>


        <div className="col-md-7 col-lg-6 ml-auto">
        <form>
                <div className="row">


                    <div className="input-group col-lg-6 mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-user text-muted"></i>
                            </span>
                        </div>
                        <input id="firstName" type="text" name="fname" value={this.state.fname} placeholder="First Name" onChange ={this.changeHandler} className="form-control bg-white border-left-0 border-md"/>
                    </div>


                    <div className="input-group col-lg-6 mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-user text-muted"></i>
                            </span>
                        </div>
                        <input id="lastName" type="text" name="lname"  value={this.state.lname} placeholder="Last Name" onChange ={this.changeHandler} className="form-control bg-white border-left-0 border-md"/>
                    </div>


                    <div className="input-group col-lg-12 mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-envelope text-muted"></i>
                            </span>
                        </div>
                        <input id="email" type="email" name="username"  value={this.state.username} placeholder="Username"onChange ={this.changeHandler} className="form-control bg-white border-left-0 border-md"/>
                    </div>


                    <div className="input-group col-lg-12 mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-phone-square text-muted"></i>
                            </span>
                        </div>
                        <select id="countryCode" name="countryCode" width= "80" className="custom-select form-control bg-white border-left-0 border-md h-100 font-weight-bold text-muted">
                            <option value="">+977</option>
                            <option value="">+10</option>
                            <option value="">+15</option>
                            <option value="">+18</option>
                        </select>
                        <input id="phoneNumber" type="tel" name="phone"  value={this.state.phone} onChange ={this.changeHandler} placeholder="Phone Number" className="form-control bg-white border-md border-left-0 pl-3"/>
                    </div>





                    <div className="input-group col-lg-6 mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-lock text-muted"></i>
                            </span>
                        </div>
                        <input id="password" type="password"  value={this.state.password} onChange ={this.changeHandler} name="password" placeholder="Password" className="form-control bg-white border-left-0 border-md"/>
                    </div>


                    <div className="input-group col-lg-6 mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-lock text-muted"></i>
                            </span>
                        </div>
                        <input id="passwordConfirmation" onChange ={this.changeHandler} type="text" name="passwordConfirmation" placeholder="Confirm Password" className="form-control bg-white border-left-0 border-md"/>
                    </div>
                    <div className="form-group col-lg-12 mx-auto mb-0">
                       
                            <input type="file" name ="profile" onChange ={this.inputHandler}  className="font-weight-bold"  />
                       
                    </div>


                    <div className="form-group col-lg-12 mx-auto mb-0">
                        <a href="#" className="btn btn-primary btn-block py-2">
                            <button className="btn btn-primary" onClick={this.submitUser} >Create your account</button>
                        </a>
                    </div>
                 


                    <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                        <div className="border-bottom w-100 ml-5"></div>
                        <span className="px-2 small text-muted font-weight-bold text-muted">OR</span>
                        <div className="border-bottom w-100 mr-5"></div>
                    </div>


                    <div className="form-group col-lg-12 mx-auto">
                        <a href="#" className="btn btn-primary btn-block py-2 btn-facebook">
                            <i className="fa fa-facebook-f mr-2"></i>
                            <span className="font-weight-bold">Continue with Facebook</span>
                        </a>
                        <a href="#" className="btn btn-primary btn-block py-2 btn-twitter">
                            <i className="fa fa-twitter mr-2"></i>
                            <button className="font-weight-bold">Continue with Twitter</button>
                        </a>
                    </div>


                    <div className="text-center w-100">
                        <p className="text-muted font-weight-bold">Already Registered? <a href="#" className="text-primary ml-2"><Link to='/login'>Login</Link></a></p>
                    </div>

                </div>
                </form>
                </div>
           

        </div>
    </div>
</div>
        
        )
    }
}
export default Registration