import React, {Component, state, book, single, logout, post, getStars} from 'react'
import axios from 'axios'
import {TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab'
import Carousel from 'react-bootstrap/Carousel'
import {Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer} from
        "mdbreact";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faStar, faTrash} from "@fortawesome/free-solid-svg-icons";

import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'

class Home extends Component {


    state = {
        item: [],
        config: {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        },
        search: ''


    }
    logout = () => {

        window.location.href = '/login'

    }

    getStars = (num) => {
        const stars = [];
        for (let i = 0; i < num; i++) {
            stars.push(<FontAwesomeIcon icon={faStar} color="red"/>);
        }
        return stars;
    };

    componentDidMount() {
        axios.get("http://localhost:3000/getHotel")
            .then((response) => {
                console.log(response)
                this.setState({
                    item: response.data.data

                })

            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    single = (e) => {

        window.location.href = '/singleProduct/' + e
    }

    book = (pid) => {

        toast(<div style={{margin: "20px;"}}>
            <p className="text-center"><i className="fa fa-shopping-cart"/> Are You Sure to Book?</p>

            <button className="btn btn-dark" onClick={this.post.bind(this, pid)}>Yes</button>
            <button className="btn btn-danger">No</button>
        </div>, {position: "top-center"})


    }
    post = (pid) => {
        console.log("Hotel ID ------------", pid)
        const token = localStorage.getItem("token")
        if (token) {
            axios.post("http://localhost:3000/bookingHotel/" + pid, this.state, this.state.config).then((response) => {

                if (response.success === true) {

                    // toast(<Link to='/cart'>Added to Cart</Link>)
                    alert("Added to Bookings")

                }

            })
            // window.location.reload(false)
            console.log(pid)
        } else {
            toast.warning(<Link to='/login'><i className="fa fa-user"/>Please Login To Shop</Link>)

        }


    }


    render() {
        // const data = this.state.item

        return (

            <div className="container-full">
                <ToastContainer autoClose={5000}/>

                <div className="wrapper">

                    <div className="container">

                        <div id="fda_app" className="row">


                            <section id="fda_header_bar" className="col-12">
                                <div className="row">
                                    <div className="col-12">
                                        <h1 style={{
                                            "color": "black",
                                            "fontFamily": "Brush Script MT"
                                        }}>Order&nbsp;Quality
                                            Product</h1>
                                    </div>
                                </div>
                                <div className="row fda_search_row">
                                    <div className="col-12">


                                        <Autocomplete
                                            freeSolo
                                            id="free-solo-2-demo"
                                            disableClearable
                                            options={this.state.item}
                                            getOptionLabel={(option) => option.name}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Search input"
                                                    margin="normal"
                                                    variant="outlined"

                                                    width="100px"
                                                    InputProps={{...params.InputProps, type: 'search'}}
                                                />
                                            )}

                                            renderOption={(option) => {

                                                return (

                                                    <>

                                                        <div class="container">
                                                            <div className="row">
                                                                <div class="card-horizontal">
                                                                    <div class="img-square-wrapper">
                                                                        <img class=""
                                                                             src={"http://localhost:3000/images/" + option.images}
                                                                             width="150" height="150"
                                                                             alt="Card image cap"/>
                                                                    </div>
                                                                    <div class="card-body">
                                                                        <h4 class="card-title">{option.name}</h4>

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
                                        this.state.item.map((data, i) => {

                                            return (

                                                <div className="col-md-4 mb-3">
                                                    <div className="card h-100">
                                                        <div
                                                            className="d-flex justify-content-between position-absolute w-100">
                                                            <div className="label-new">
                                                                <span
                                                                    className="text-white bg-success small d-flex align-items-center px-2 py-1">
                                                                  <i className="fa fa-star" aria-hidden="true"/>
                                                                  <span className="ml-1"/>
                                                                </span>
                                                            </div>
                                                            <div className="label-sale">
                                                                <span
                                                                    className="text-white bg-primary small d-flex align-items-center px-2 py-1">
                                                                  <i className="fa fa-tag" aria-hidden="true"/>
                                                                  <span className="ml-1">Sale</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <a href="#">
                                                            <img src={"http://localhost:3000/images/" + data.images}
                                                                 onClick={this.single.bind(this, data._id)}
                                                                 className="card-img-top" alt="Product"/>
                                                        </a>
                                                        <div className="card-body px-2 pb-2 pt-1">
                                                            <div className="d-flex justify-content-between">
                                                                <div>
                                                                    <p className="h4 text-primary">${data.name}</p>
                                                                </div>
                                                                <div>
                                                                    <a href="#" className="text-secondary lead"
                                                                       data-toggle="tooltip" data-placement="left"
                                                                       title="Compare">
                                                                        <i className="fa fa-line-chart"
                                                                           aria-hidden="true"/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <p className="text-warning d-flex align-items-center mb-2">
                                                                <a href=''>{this.getStars(data.name)}</a>
                                                            </p>
                                                            <p className="mb-0">
                                                                <strong>
                                                                    <a href="#"
                                                                       className="text-secondary">{data.name}</a>
                                                                </strong>
                                                            </p>
                                                            <p className="mb-1">
                                                                <small>

                                                                </small>
                                                            </p>
                                                            <div className="d-flex mb-3 justify-content-between">
                                                                <div>
                                                                    <p className="mb-0 small"><b>UPC: </b> {2310010 + i}
                                                                    </p>
                                                                    <p className="mb-0 small"><b>PART#: </b> {2121 + i}
                                                                    </p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="mb-0 small"><b>Free Delivery</b></p>

                                                                    <p className="mb-0 small text-primary">
                                                                        {/*<span*/}
                                                                        {/*// className="font-weight-bold">Save</span> ${parseInt(data.Price) / 100 * 12}(12%)*/}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-between">
                                                                <div className="col px-0">
                                                                    <button
                                                                        className="btn btn-outline-primary btn-block"
                                                                        onClick={this.book.bind(this, data._id)}>
                                                                        Add To Cart
                                                                        <i className="fa fa-shopping-basket"
                                                                           aria-hidden="true"/>
                                                                    </button>
                                                                </div>
                                                                <div className="ml-2">
                                                                    <a href="#" className="btn btn-outline-success"
                                                                       data-toggle="tooltip" data-placement="left"
                                                                       title="Add to Wishlist">
                                                                        <i className="fa fa-heart"
                                                                           aria-hidden="true"/>
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
                                <hr/>
                            </div>
                        </div>

                    </div>


                    <div className="container">
                        <div className="row">
                            {

                                this.state.item.slice(0, 4).map((item) => {
                                    return (

                                        <div className="col-md-3 col-sm-6" style={{marginBottom: "50px"}}>
                                            <div className="product-grid" style={{height: "250px"}}>
                                                <div className="product-image" style={{height: "300px"}}>
                                                    <a href="#" className="image">
                                                        <img className="pic-1"
                                                             style={{height: "200px", marginBottom: "100px"}}
                                                             src={"http://localhost:3000/images/" + item.images}/>
                                                    </a>
                                                    <span className="product-sale-label">Sale</span>
                                                    <ul className="product-links">
                                                        <li><a href="#"><i class="fa fa-heart"/></a></li>
                                                        <li><a href="#"><i class="fa fa-shopping-cart"
                                                                           onClick={this.book.bind(this, item._id)}/></a>
                                                        </li>
                                                        <li><a href="#"><i class="fa fa-random"></i></a></li>
                                                        <li><a href="#" onClick={this.single.bind(this, item._id)}><i
                                                            class="fa fa-eye"></i></a></li>
                                                    </ul>
                                                </div>
                                                <div className="product-content">
                                                    <h3 className="title" style={{marginBottom: "100px"}}><a
                                                        href="#">{item.name}</a></h3>

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
