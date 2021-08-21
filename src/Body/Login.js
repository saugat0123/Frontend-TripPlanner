import { Component , state, Registration,successToast} from "react";
import axios from 'axios';

import { Redirect } from "react-router";
import {ToastContainer,toast,Zoom,Bounce} from 'react-toastify'

class Login extends Component{
    
  state = {
    us : "",
    pwd : ""
}


Registration=(e)=>{
  

    e.preventDefault();
    const newdata = {
        username: this.state.username,
        password: this.state.password
    }
    console.log(newdata);
    axios.post("http://localhost:3000/login", newdata)
    .then((response)=>{

      if(response.data.success===true){
        
        window.location.reload(false)
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('user',response.data.data.UserType)
        localStorage.setItem('username',response.data.data.Username)

        console.log(localStorage.getItem('user'))
       window.location.href='/'
      }
      else{
        toast.error(<div><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> Invalid Credentials !</div>, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
     




    })
    .catch((err)=>{
      console.log(err)
    })
}
    render(){
        return(
            <div>
              <ToastContainer autoClose={5000} />
            
            <div className="container-fluid">
              
            <div className="row no-gutter">
              <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
              <div className="col-md-8 col-lg-6">
                <div className="login d-flex align-items-center py-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-9 col-lg-8 mx-auto">
                      <h3 className="login-heading mb-4">Welcome To Food Hunter!</h3>
                        <form>
                          <div className="form-label-group">
                            <input type="email" id="inputEmail" className="form-control" placeholder=" Username" value ={this.state.username}
                onChange={(event)=>{this.setState({username : event.target.value})}} required autofocus/>
                            <label for="inputEmail">Email address</label>
                          </div>
          
                          <div className="form-label-group">
                            <input type="password" id="inputPassword" className="form-control" value ={this.state.password} 
                onChange={(event)=>{this.setState({password : event.target.value})}} placeholder="Password" required/>
                            <label for="inputPassword">Password</label>
                          </div>
          
                          <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                            <label className="custom-control-label" for="customCheck1">Remember password</label>
                          </div>
                          <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" onClick = {this.Registration} type="submit">Sign in</button>
                          <div className="text-center">
                            <a className="small" href="www.fb.com">Forgot password?</a></div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        )
    }
}
export default Login;