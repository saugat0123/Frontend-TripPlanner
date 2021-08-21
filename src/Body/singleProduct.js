import {Component,state,book} from 'react'
import axios from 'axios'
import { Redirect } from "react-router";
import {ToastContainer,toast,Zoom,Bounce} from 'react-toastify'
class singleProduct extends Component{

    state ={
        id : this.props.match.params.id,
        name:'',
        rating:'',
        price:'',
        image:'',
        description:'',
		config : {
			headers : {'Authorization': `Bearer ${localStorage.getItem('token')}`}
		  }
    }

	book = ()=>{

		axios.post("http://localhost:3000/booking/"+this.state.id,this.state,this.state.config)
		window.location.reload(false)
		
		
		
		}
    componentDidMount(){

 axios.get('http://localhost:3000/food/show/'+this.state.id).then((response)=>{

this.setState({
    name:response.data.data.Name,
    image:response.data.data.Image,
    rating:response.data.data.Rating,
    price:response.data.data.Price,
    description:response.data.data.Description
})

console.log(response.data)
 })


    }

    render(){
	
        return(
            <div>
      <div className="content-wrapper" style={{"marginLeft": "0px", "minHeight": "400px","marginTop":"50px"}}>
                <div class="user-content-wrapper" style={{'fontFamily': 'Century gothic', 'background': '#fff',  'marginTop': '-35px'}}>
                    <div className="container" >
                        <div className="row">
                            <div className="col-lg-12" style={{'marginTop': '20px'}}>
                                <img src={"http://localhost:3000/images/"+this.state.image} width="100%" height="400px" style={{'objectFit': 'cover'}}/>
                            </div>
                            <div className="col-lg-12" style={{'marginTop': '30px', 'fontWeight': 'Bold'}}>
                                <h1 style={{'display': 'inline'}}>Name: { this.state.name}</h1>
                                <button className={this.state.bookCheck == true ? 'btn btn-primary hide' : 'btn btn-primary'} style={{'float': 'right'}} data-toggle='modal' data-target='#bookModal'>Book Now</button>
                            </div>
                        </div>
                        <div className='row' style={{'marginTop': '30px'}}>
                            <div className="col-lg-8">
                                <h3 style={{'fontWeight': 'Bold', 'color': 'rgb(2, 86, 116)'}}>Description</h3>
                                <p>{this.state.description}</p>
                            </div>
                            
                        </div>
                       
                    </div>
                    <div class="modal fade" id="bookModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLab">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Add To Cart</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            <form onSubmit={this.book.bind(this,this.state._id)}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1" >Qty</label>
                                    <input type="number" name="Qty" class="form-control" id="seats" placeholder="Quantity"/>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
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
export default singleProduct