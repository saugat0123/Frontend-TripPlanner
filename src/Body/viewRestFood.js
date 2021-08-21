import React, { Component,state,single,book,goUpdate,deleteFood } from 'react';
import axios from 'axios'
export default class viewRestFood extends Component {

state={


id:this.props.match.params.id,
    name:"",
    address:"",
    phone:"",
    rating:"",
    images:"",
    data:[],
    config : {
      headers : {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    }

}
single=(e)=>{

    window.location.href='/singleProduct/'+e
  }
  
  book = (pid)=>{
  
  axios.post("http://localhost:3000/booking/"+pid,this.state,this.state.config)
  window.location.reload(false)
  console.log(pid)
  
  
  }

goUpdate=(id)=>{

window.location.href='/updateFood/'+id

}



deleteFood=(id)=>{

axios.delete('http://localhost:3000/deleteFood/'+id+"/"+this.state.id).then((response)=>{

alert("success")
})


}

componentDidMount(){

    axios.get('http://localhost:3000/getRest/'+this.state.id).then((response)=>{
console.log(response)
    this.setState({name:response.data.data.name,
         address:response.data.data.address,
         phone:response.data.data.phone,
         rating:response.data.rating,
         image:response.data.data.images,
         data:response.data.data.foods})
    })
}
  render() {

    const user = localStorage.getItem('user')
    return (
        <div>
        <div className="container-fluid bg-light" style={{border:"solid 0.5px",marginTop:"100px"}}>
            <div className="row">
                <div className="col-md-5">
                   <img src={"http://localhost:3000/images/"+this.state.image} style={{padding:"20px"}} width="100%" height="100%"/>
                </div>
                <div className="col-md-7">
                    <h4>{this.state.name}</h4>
                    <div className="price"><span className="mr-2">&nbsp;Our Address: {this.state.address}</span><span className="mr-2 cut"></span><span className="text-success">25% OFF</span></div>
                    <div className="d-flex flex-row">
                        <div className="icons mr-2">
                        <p className="text-warning d-flex align-items-center mb-2">
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </p>
                            </div>
                    </div>
                    <div className="d-flex align-items-center mt-4 offers mb-1"><i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">Bank Offers</span><span className="ml-1">20% On Delivery<br/></span></div>
                    <div className="d-flex align-items-center offers mb-1"><i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">Bank Offers</span><span className="ml-1">Contact:{this.state.phone}<br/></span></div>
                    <div className="d-flex align-items-center offers mb-1"><i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">Bank Offers</span><span className="ml-1">Extra 5% off* with Axis Bank Buzz Credit Card<br/></span></div>
                    <div className="d-flex align-items-center offers"><i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">Bank Offers</span><span className="ml-1">{this.state.description}<br/></span></div>
                    <hr/>
                    <div className="d-flex align-items-center mt-2"> </div>
                    <div></div>
                      </div>
            </div>
        </div>

<h1 className="text-center">Our Foods</h1>
<div className="row">
{

  this.state.data.map((food,i)=>{
    return(

<div className="col-md-3 col-sm-6" style={{marginBottom:"50px"}}>
        <div className="product-grid" style={{height:"250px"}}>
            <div className="product-image"style={{height:"300px"}}>
                <a href="#" className="image">
                    <img className="pic-1" style={{height:"200px",marginBottom:"100px"}} src={"http://localhost:3000/images/"+food.Image}/>
                </a>
                <span className="product-sale-label">{i+1}</span>
                <ul className="product-links">


{
    user==="Admin"?(<>
    <li><a href="#" onClick={this.deleteFood.bind(this,food._id)}><i class="fa fa-trash"></i></a></li>
                  
                    
                  <li><a href="#"><i class="fa fa-random" onClick={this.goUpdate.bind(this,food._id)} ></i></a></li>
             
    </>)
    :(<>
      <li><a href="#"><i class="fa fa-shopping-cart" onClick={this.book.bind(this,food._id)}></i></a></li>
                    <li><a href="#" onClick ={this.single.bind(this,food._id)}><i class="fa fa-eye" ></i></a></li>
    </>)
}

                     </ul>
            </div>
            <div className="product-content">
                
            </div>
        </div>
    </div>

  


    )

  })
}


</div>

        </div>
        
    );
  }
}
