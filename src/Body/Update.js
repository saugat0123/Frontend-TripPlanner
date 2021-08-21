
import {Component , state, changedHandler} from 'react'
import {Row ,Col, Container} from 'react-bootstrap'

import { Redirect } from "react-router";
import {ToastContainer,toast,Zoom,Bounce} from 'react-toastify'
class Update extends Component{
    constructor(){

    }

state={
id:this.props.match.params.id,
    Name:""
}


changedHandler = (e)=>{
this.setState({
[e.target.name]:e.target.value


})

}

render(){

    return(


        <Container>
            <Row>
                
               
            <Col>
            
            </Col>
            <Col>{
                        this.state.food.map((product)=>{
                            return (<div>
                                <p>Id :
                                {
                                product.Name 
                                }
                                </p>
                                <img src={"http://localhost:3000/images/"+product.Image} onChange={this.changedHandler.bind(this)} alt ="data"/>
                            <button  onClick ={this.deleteProduct.bind(this,product._id)} > Delete</button>
                                 </div>
                                ) 
                        })
                    }
                    </Col>
             
                
            </Row>
            <Row>
                
            </Row>
        </Container>

    )
}



}
export default Update