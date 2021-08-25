import React, {Component, state, addFood, deleteRest, update, getStars} from "react";
import axios from 'axios'
import {Card, Button} from 'react-bootstrap'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faStar, faTrash} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

export default class viewHotel extends Component {

    state = {
        data: []
    }

    componentDidMount() {

        axios.get('http://localhost:3000/getHotel').then((response) => {

            this.setState({data: response.data.data})
            // console.log("data::::.........", response.data)
        })
    }

    getStars = (num) => {
        const stars = [];
        for (let i = 0; i < num; i++) {
            stars.push(<FontAwesomeIcon icon={faStar} color="red"/>);
        }
        return stars;
    };

    update = (id) => {
        window.location.href = "/updateRes/" + id

    }

    hotelDelete(id) {
        axios.delete('http://localhost:3000/delHotel/' + id).then((response) => {

            alert("Hotel deleted")
            window.location.href = '/viewHotel'
        })
    }

    bookHotel(pid){

        toast(<div style={{margin: "20px;"}}>
            <p className="text-center"><i className="fa fa-shopping-cart"/> Are You Sure to Book?</p>

            <button className="btn btn-dark" onClick={this.post.bind(this, pid)}>Yes</button>
            <button className="btn btn-danger">No</button>
        </div>, {position: "top-center"})
    }

    post(pid) {
        const token = localStorage.getItem("token")
        if (token) {
            axios.post("http://localhost:3000/bookingHotel/" + pid, this.state, this.state.config).then((response) => {

                    // toast(<Link to='/cart'>Added to Cart</Link>)
                    alert("Hotel Booked")

            })
            // window.location.reload(false)
            console.log("product id-----------",pid)
        } else {
            toast.warning(<Link to='/login'><i className="fa fa-user"/>Please Login To Shop</Link>)
        }
    }

    render() {
        const user = localStorage.getItem('user')

        return (
            <div>
                <div>

                    <h1 className="text-center">Our Hotels</h1>
                    {

                        this.state.data.map((data) => {
                            return (
                                <div className="row p-2 bg-white border rounded">
                                    <div className="col-md-3 mt-1"><img
                                        class="img-fluid img-responsive rounded product-image"
                                        src={"http://localhost:3000/images/" + data.images}
                                        style={{height: "250px", width: "350px"}}/></div>
                                    <div className="col-md-6 mt-1">
                                        <h5><strong>{data.name}</strong></h5>
                                        <div className="d-flex flex-row">
                                            <div className="ratings mr-2"><span>Total Rooms</span><br/>
                                                {data.room}</div>
                                        </div>
                                        {/*<div className="mt-1 mb-1 spec-1"><h6>Item Includes</h6><br/>*/}
                                        {/*    <div className="row ">*/}
                                        {/*        {*/}

                                        {/*            data.items.slice(0, 5).map((item) => {*/}
                                        {/*                return (*/}

                                        {/*                    <div className="col-lg-2">*/}
                                        {/*                        <img src={"http://localhost:3000/images/" + item.Image}*/}
                                        {/*                             style={{*/}
                                        {/*                                 height: "80px",*/}
                                        {/*                                 width: "80px",*/}
                                        {/*                                 borderRadius: "20%"*/}
                                        {/*                             }}/>*/}
                                        {/*                    </div>*/}

                                        {/*                )*/}
                                        {/*            })*/}
                                        {/*        }*/}
                                        {/*    </div>*/}


                                        {/*</div>*/}

                                        <p class="text-justify text-truncate para mb-0">{"You can contact us at our number +977" + data.phone + " " + "and"}
                                            <br/> {"Vist us at " + data.address} <br/></p>
                                    </div>
                                    <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                                        <div class="d-flex flex-row align-items-center">
                                            <h4 class="mr-1 text-center" style={{marginLeft: "20px"}}>Starting at
                                                ${13.99}</h4>
                                        </div>
                                        <h6 class="text-success">Free Delivery Inside Valley</h6>
                                        <div class="d-flex flex-column mt-4">

                                            {user === "Customer" ?
                                                (
                                                    <>
                                                        <button class="btn btn-outline-primary btn-sm mt-2"
                                                                onClick={this.bookHotel.bind(this, data._id)}
                                                                type="button">Book Hotel
                                                        </button>
                                                    </>
                                                )
                                                : (<>
                                                    {/*<button class="btn btn-outline-primary btn-sm mt-2"*/}
                                                    {/*        onClick={this.viewRestFood.bind(this, data._id)}*/}
                                                    {/*        type="button">View Foods*/}
                                                    {/*</button>*/}

                                                </>)
                                            }

                                            {user === "Admin" ?
                                                (
                                                    <>
                                                        <button class="btn btn-outline-primary btn-sm mt-2"
                                                                onClick={this.hotelDelete.bind(this, data._id)}
                                                                type="button">Delete Hotel
                                                        </button>
                                                        <button class="btn btn-outline-primary btn-sm mt-2"
                                                                onClick={this.update.bind(this, data._id)}
                                                                type="button">Update
                                                            Hotel
                                                        </button>

                                                        {/*<button class="btn btn-outline-primary btn-sm mt-2"*/}
                                                        {/*        onClick={this.viewRestFood.bind(this, data._id)}*/}
                                                        {/*        type="button">Details*/}
                                                        {/*</button>*/}
                                                    </>
                                                )
                                                : (<>
                                                    {/*<button class="btn btn-outline-primary btn-sm mt-2"*/}
                                                    {/*        onClick={this.viewRestFood.bind(this, data._id)}*/}
                                                    {/*        type="button">View Foods*/}
                                                    {/*</button>*/}

                                                </>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        )
    }


}
