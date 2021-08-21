import React, { Component,changeHandler,fileHandler,goUpdate,deleteFood,single,book,state,addResturant } from 'react';
import axios from 'axios'
export default class updateResturant extends Component {

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
        componentDidMount(){

            axios.get('http://localhost:3000/getRest/'+this.state.id).then((response)=>{
        console.log(response)
            this.setState({name:response.data.data.name,
                 address:response.data.data.address,
                 phone:response.data.data.phone,
                 rating:response.data.rating,
                 images:response.data.data.images,
                 data:response.data.data.items})
            })
        }

changeHandler =(e)=>{

    this.setState({
      [e.target.name]:e.target.value
    })
  }

  fileHandler = (e) =>{

    this.setState({
      images:e.target.files[0],
      loaded:0
    })
  console.log(e.target.files[0])


  }
  addResturant =(e)=>{
  e.preventDefault();
  const data = new FormData()
  data.append('name',this.state.name)
  data.append('address',this.state.address)
  data.append('phone',this.state.phone)
  data.append('rating,',this.state.rating)
  data.append('images',this.state.images)

  axios.put("http://localhost:3000/upResturant/"+this.state.id,data,this.state.config).then((response)=>{
  console.log(response)
  window.location.reload()

  })


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


          render() {

            const user = localStorage.getItem('user')
            return (
                <div>
                <div className="container-fluid bg-light" style={{border:"solid 0.5px",marginTop:"100px"}}>
                    <div className="row">
                        <div className="col-md-5">
                           <img src={"http://localhost:3000/images/"+this.state.images} style={{padding:"20px"}} width="100%" height="100%"/>
                        </div>
                        <div className="col-md-7">



                        <form class="contact-form row">
      <div class="form-field col-lg-6">
         <input id="text" name="name" className="input-text js-input" value={this.state.name} onChange ={this.changeHandler} type="text" />
         <label className="label" >Resturant Name</label>
      </div>
      <div class="form-field col-lg-6 ">
         <input id="text" name ="address" className="input-text js-input" value={this.state.address} onChange ={this.changeHandler} type="text" required/>
         <label className="label">Address</label>
      </div>
      <div class="form-field col-lg-6 ">
         <input id="company" className="input-text js-input" name="phone" value={this.state.phone} onChange ={this.changeHandler} type="text" required/>
         <label className="label" >Phone</label>
      </div>
       <div class="form-field col-lg-6 ">
         <input id="phone" className="input-text js-input" name ="rating"value={this.state.rating} onChange ={this.changeHandler} type="number" required/>
         <label className="label" for="phone">Rating</label>
      </div>
      <div class="form-field col-lg-12">
         <input id="message" className="input-file js-input" name="images"value={this.state.image} onChange ={this.fileHandler} type="file" required/>
         <label className="label" for="message">Image</label>
      </div>
      <div class="form-field col-lg-12">
         <input className="submit-btn" type="submit" onClick={this.addResturant} value="Submit"/>
      </div>
   </form>
                              </div>
                    </div>
                </div>

        <h1 className="text-center">Our Foods</h1>
        <div className="row">
        {

          this.state.data.map((food)=>{
            return(

        <div className="col-md-3 col-sm-6" style={{marginBottom:"50px"}}>
                <div className="product-grid" style={{height:"250px"}}>
                    <div className="product-image"style={{height:"300px"}}>
                        <a href="#" className="image">
                            <img className="pic-1" style={{height:"200px",marginBottom:"100px"}} src={"http://localhost:3000/images/"+food.Image}/>
                        </a>
                        <span className="product-sale-label">Sale</span>
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
                        <h3 className="title" style={{marginBottom:"100px"}}><a href="#">{food.Name}</a></h3>

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
