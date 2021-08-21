
import {Component,state,book,single,logout,post,getStars} from 'react'
import axios from 'axios'
import {TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab'
import Carousel from 'react-bootstrap/Carousel'
import {Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";

import {ToastContainer,toast,Zoom,Bounce} from 'react-toastify'
class Home extends Component{


  state={
item:[],
config : {
  headers : {'Authorization': `Bearer ${localStorage.getItem('token')}`}
},
search:''


  }
  logout = ()=> {

    window.location.href ='/login'

    }

    getStars = (num) => {
      const stars = [];
      for (let i = 0; i < num; i++) {
        stars.push(<FontAwesomeIcon icon={faStar} color="red" />);
      }
      return stars;
    };

  componentDidMount(){
    axios.get("http://localhost:3000/food/show")
    .then((response)=>{
        console.log(response)
        this.setState({
            item : response.data.data

        })

    })
    .catch((err)=>{
        console.log(err.response)
    })
}

single=(e)=>{

  window.location.href='/singleProduct/'+e
}

book = (pid)=>{

  toast(<div style={{margin:"20px;"}} >
    <p className="text-center"><i className="fa fa-shopping-cart"></i> Are You Suer to Book?</p>

    <button className="btn btn-dark" onClick={this.post.bind(this,pid)}>Yes</button>
    <button className="btn btn-danger">No</button>
    </div>,{position:"top-center"})



}
post=(pid)=>{

  const token = localStorage.getItem("token")
  if(token){
  axios.post("http://localhost:3000/booking/"+pid,this.state,this.state.config).then((response)=>{

if(response.success===true){

toast(<Link to='/cart'>Added to Cart</Link>)

}

  })
window.location.reload(false)
console.log(pid)
}
else{
toast.warning(<Link to='/login'><i className="fa fa-user"></i>Please Login To Shop</Link>)

}



}


render(){
  const data = this.state.item

    return(

      <div className="container-full" >
 <ToastContainer  autoClose={5000}/>
 <div className ="row-full">
 <MDBContainer>
      <MDBCarousel
      activeItem={1}
      length={3}
      showControls={true}
      showIndicators={true}
      className="z-depth-1"
      width="100%"
    >
      <MDBCarouselInner>
        <MDBCarouselItem itemId="1">
          <MDBView>
            <img
              className="d-block w-100"
              src="https://images.pexels.com/photos/954677/pexels-photo-954677.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="First slide"

            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Best Deals</h3>

          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2">
          <MDBView>
            <img
              className="d-block w-100"
              src="https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Second slide"
            />
          <MDBMask overlay="black-strong" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Top Resturants</h3>

          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="3">
          <MDBView>
            <img
              className="d-block w-100"
              src="https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Third slide"
            />
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Quality Food</h3>

          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>

    </div>
      <div className="wrapper"  >

        <div className="container">

<div id="fda_app" className="row">





  <section id="fda_header_bar" className="col-12">
    <div className="row">
      <div className="col-12">
        <h1 style={{"color":"black","fontFamily":"Brush Script MT"}}>Order&nbsp;Fresh Food</h1>
      </div>
    </div>
    <div className="row fda_search_row">
      <div className="col-12">


        <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={this.state.item}
        getOptionLabel={(option) => option.Name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            margin="normal"
            variant="outlined"

            width="100px"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}

        renderOption={(option) => {

return(

<>

<div class="container">
  <div className="row">
                <div class="card-horizontal">
                    <div class="img-square-wrapper">
                        <img class="" src={"http://localhost:3000/images/"+option.Image} width="150" height="150" alt="Card image cap"/>
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">{option.Name}</h4>

                    </div>
                </div>

                </div>
            </div>
</>



)

        }}

      />



      </div>

    </div>
  </section>


<div className="container">
  <div className="row">


        {
            this.state.item.map((data, i)=>{

               return(

                <div className="col-md-4 mb-3">
      <div className="card h-100">
        <div className="d-flex justify-content-between position-absolute w-100">
          <div className="label-new">
            <span className="text-white bg-success small d-flex align-items-center px-2 py-1">
              <i className="fa fa-star" aria-hidden="true"></i>
              <span className="ml-1"></span>
            </span>
          </div>
          <div className="label-sale">
            <span className="text-white bg-primary small d-flex align-items-center px-2 py-1">
              <i className="fa fa-tag" aria-hidden="true"></i>
              <span className="ml-1">Sale</span>
            </span>
          </div>
        </div>
        <a href="#">
          <img src={"http://localhost:3000/images/"+data.Image} onClick ={this.single.bind(this,data._id)}className="card-img-top" alt="Product"/>
        </a>
        <div className="card-body px-2 pb-2 pt-1">
          <div className="d-flex justify-content-between">
            <div>
              <p className="h4 text-primary">${data.Price}</p>
            </div>
            <div>
              <a href="#" className="text-secondary lead" data-toggle="tooltip" data-placement="left" title="Compare">
                <i className="fa fa-line-chart" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <p className="text-warning d-flex align-items-center mb-2">
            <a href=''>{this.getStars(data.Rating)}</a>
          </p>
          <p className="mb-0">
            <strong>
              <a href="#" className="text-secondary">{data.Name}</a>
            </strong>
          </p>
          <p className="mb-1">
            <small>

            </small>
          </p>
          <div className="d-flex mb-3 justify-content-between">
            <div>
              <p className="mb-0 small"><b>UPC: </b> {2310010+i}</p>
              <p className="mb-0 small"><b>PART#: </b> {2121+i}</p>
            </div>
            <div className="text-right">
              <p className="mb-0 small"><b>Free Delivery</b></p>

              <p className="mb-0 small text-primary">
                <span className="font-weight-bold">Save</span> ${parseInt(data.Price)/100*12}(12%)
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="col px-0">
              <button className="btn btn-outline-primary btn-block" onClick={this.book.bind(this,data._id)}>
                Add To Cart
                <i className="fa fa-shopping-basket" aria-hidden="true"></i>
              </button>
            </div>
            <div className="ml-2">
              <a href="#" className="btn btn-outline-success" data-toggle="tooltip" data-placement="left" title="Add to Wishlist">
                <i className="fa fa-heart" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

               )
            })

        }
          </div>
</div>


<div className="container">
  <hr />
</div>








  <section className="fda_section_product_tile col-12">
    <div className="row fda_title_row">
      <div className="col-12">
        Popular this week
      </div>
    </div>
    <div className="row fda_section_row">
      <div className="section_product_tile row col-10">
        <div className="col-4 justify-content-center align-self-center">
          <img src="https://i.postimg.cc/dLzR8NLL/chenna-poda.png" height="3000" alt=""/>
        </div>
        <div className="col-6 justify-content-center align-self-center section_meta">
          <span className="product_title">Chenna Poda</span>
          <span className="product_rating">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star-half"></i>
                                  <span className="rating_avg">(4.5)</span>
          </span>
          <span className="product_price">
                                  <i className="fa fa-inr"></i> 250.00
                              </span>
        </div>
      </div>
      <div className="section_product_tile row col-10">
        <div className="col-4 justify-content-center align-self-center">
          <img src="https://i.postimg.cc/nsTQw3cK/tomato-rice.png" alt=""/>
        </div>
        <div className="col-6 justify-content-center align-self-center section_meta">
          <span className="product_title">Tomato Rice</span>
          <span className="product_rating">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <span className="rating_avg">(4.0)</span>
          </span>
          <span className="product_price">
                                  <i className="fa fa-inr"></i> 450.00
                              </span>
        </div>
      </div>
      <div className="section_product_tile row col-10">
        <div className="col-4 justify-content-center align-self-center">
          <img src="https://i.postimg.cc/dLzR8NLL/chenna-poda.png" alt=""/>
        </div>
        <div className="col-6 justify-content-center align-self-center section_meta">
          <span className="product_title">Chenna Poda</span>
          <span className="product_rating">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star-half"></i>
                                  <span className="rating_avg">(4.5)</span>
          </span>
          <span className="product_price">
                                  <i className="fa fa-inr"></i> 250.00
                              </span>
        </div>
      </div>
      <div className="section_product_tile row col-10">
        <div className="col-4 justify-content-center align-self-center">
          <img src="https://i.postimg.cc/nsTQw3cK/tomato-rice.png" alt=""/>
        </div>
        <div className="col-6 justify-content-center align-self-center section_meta">
          <span className="product_title">Tomato Rice</span>
          <span className="product_rating">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <span className="rating_avg">(4.0)</span>
          </span>
          <span className="product_price">
                                  <i className="fa fa-inr"></i> 450.00
                              </span>
        </div>
      </div>
      <div className="section_product_tile row col-10">
        <div className="col-4 justify-content-center align-self-center">
          <img src="https://i.postimg.cc/dLzR8NLL/chenna-poda.png" alt=""/>
        </div>
        <div className="col-6 justify-content-center align-self-center section_meta">
          <span className="product_title">Chenna Poda</span>
          <span className="product_rating">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star-half"></i>
                                  <span className="rating_avg">(4.5)</span>
          </span>
          <span className="product_price">
                                  <i className="fa fa-inr"></i> 250.00
                              </span>
        </div>
      </div>
      <div className="section_product_tile row col-10">
        <div className="col-4 justify-content-center align-self-center">
          <img src="https://i.postimg.cc/nsTQw3cK/tomato-rice.png" alt=""/>
        </div>
        <div className="col-6 justify-content-center align-self-center section_meta">
          <span className="product_title">Tomato Rice</span>
          <span className="product_rating">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <span className="rating_avg">(4.0)</span>
          </span>
          <span className="product_price">
                                  <i className="fa fa-inr"></i> 450.00
                              </span>
        </div>
      </div>
    </div>
  </section>

  <section className="fda_section_product_tile col-12">
    <div className="row fda_title_row">
      <div className="col-12">
        New Arrivals
      </div>
    </div>
    <div className="row fda_section_row">
      <div className="section_product_tile row col-10">
        <div className="col-4 justify-content-center align-self-center">
          <img src="https://i.postimg.cc/QVFW0kL5/vada-pav.png" alt=""/>
        </div>
        <div className="col-6 justify-content-center align-self-center section_meta">
          <span className="product_title">Vada Pav</span>
          <span className="product_rating">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <span className="rating_avg">(5.0)</span>
          </span>
          <span className="product_price">
                                  <i className="fa fa-inr"></i> 20.00
                              </span>
        </div>
      </div>
      <div className="section_product_tile row col-10">
        <div className="col-4 justify-content-center align-self-center">
          <img src="https://i.postimg.cc/T55L1GjQ/veg-sandwich.png" alt=""/>
        </div>
        <div className="col-6 justify-content-center align-self-center section_meta">
          <span className="product_title">Veg Sandwich</span>
          <span className="product_rating">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star-half"></i>
                                  <span className="rating_avg">(3.5)</span>
          </span>
          <span className="product_price">
                                  <i className="fa fa-inr"></i> 650
                              </span>
        </div>
      </div>
      <div className="section_product_tile row col-10">
        <div className="col-4 justify-content-center align-self-center">
          <img src="https://i.postimg.cc/QVFW0kL5/vada-pav.png" alt=""/>
        </div>
        <div className="col-6 justify-content-center align-self-center section_meta">
          <span className="product_title">Vada Pav</span>
          <span className="product_rating">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <span className="rating_avg">(5.0)</span>
          </span>
          <span className="product_price">
                                  <i className="fa fa-inr"></i> 20.00
                              </span>
        </div>
      </div>
      <div className="section_product_tile row col-10">
        <div className="col-4 justify-content-center align-self-center">
          <img src="https://i.postimg.cc/T55L1GjQ/veg-sandwich.png" alt=""/>
        </div>
        <div className="col-6 justify-content-center align-self-center section_meta">
          <span className="product_title">Veg Sandwich</span>
          <span className="product_rating">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star-half"></i>
                                  <span className="rating_avg">(3.5)</span>
          </span>
          <span className="product_price">
                                  <i className="fa fa-inr"></i> 650
                              </span>
        </div>
      </div>
      <div className="section_product_tile row col-10">
        <div className="col-4 justify-content-center align-self-center">
          <img src="https://i.postimg.cc/QVFW0kL5/vada-pav.png" alt=""/>
        </div>
        <div className="col-6 justify-content-center align-self-center section_meta">
          <span className="product_title">Vada Pav</span>
          <span className="product_rating">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <span className="rating_avg">(5.0)</span>
          </span>
          <span className="product_price">
                                  <i className="fa fa-inr"></i> 20.00
                              </span>
        </div>
      </div>
      <div className="section_product_tile row col-10">
        <div className="col-4 justify-content-center align-self-center">
          <img src="https://i.postimg.cc/T55L1GjQ/veg-sandwich.png" alt=""/>
        </div>
        <div className="col-6 justify-content-center align-self-center section_meta">
          <span className="product_title">Veg Sandwich</span>
          <span className="product_rating">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star-half"></i>
                                  <span className="rating_avg">(3.5)</span>
          </span>
          <span className="product_price">
                                  <i className="fa fa-inr"></i> 650
                              </span>
        </div>
      </div>
    </div>
  </section>



</div>

</div>


<div className="container">
<div className="row">
{

  this.state.item.slice(0,4).map((food)=>{
    return(

<div className="col-md-3 col-sm-6" style={{marginBottom:"50px"}}>
        <div className="product-grid" style={{height:"250px"}}>
            <div className="product-image"style={{height:"300px"}}>
                <a href="#" className="image">
                    <img className="pic-1" style={{height:"200px",marginBottom:"100px"}} src={"http://localhost:3000/images/"+food.Image}/>
                </a>
                <span className="product-sale-label">Sale</span>
                <ul className="product-links">
                    <li><a href="#"><i class="fa fa-heart"></i></a></li>
                    <li><a href="#"><i class="fa fa-shopping-cart" onClick={this.book.bind(this,food._id)}></i></a></li>
                    <li><a href="#"><i class="fa fa-random"></i></a></li>
                    <li><a href="#" onClick ={this.single.bind(this,food._id)}><i class="fa fa-eye" ></i></a></li>
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


      </div>
      </div>
    )
}

}
export default Home
