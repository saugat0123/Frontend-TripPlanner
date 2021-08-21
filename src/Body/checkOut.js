import React, {Component, state, changeHandler, order} from 'react'
import axios from 'axios'
import Map from './Navigation/Map'

export default class checkOut extends Component {
    state = {

        success: false,
        data: [],
        count: 0,
        Qty: 0,
        total: 0,
        config: {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        },
        lat: localStorage.getItem(`lat${localStorage.getItem('username')}`),
        lng: localStorage.getItem(`lng${localStorage.getItem('username')}`),
        address: localStorage.getItem(`address${localStorage.getItem('username')}`)


    }
    changeHandler = (e) => {

        this.setState({

            [e.target.name]: e.target.value
        })
    }

    order = () => {

        axios.post('http://localhost:3000/order', this.state, this.state.config).then((response) => {

            alert("order placed")
            axios.delete('http://localhost:3000/deleteCart', this.state.config).then(function (response) {
            })
            window.location.href = '/order'


        })

    }


    componentDidMount() {

        axios.get('http://localhost:3000/booking/show', this.state.config).then((response) => {
            if (response.data.data === null) {
                alert('Your Cart is Empty')
                window.location.href = '/'
            } else {
                this.setState({
                    success: response.data.success,
                    user:response.data.UserId,
                    data: response.data.data.ProductId,
                    count: response.data.count,
                    Qty: response.data.data.ProductId.qty,
                    total: response.data.Qty

                })
            }


        })

    }

    render() {

        return (
            <div className="container">
                <div className="py-5 text-left">
                    <h2>Checkout form</h2></div>
                <div className="row" style={{border: "solid 0.5"}}>
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Your cart</span>
                            <span className="badge badge-secondary badge-pill">{this.state.count}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {


                                this.state.data.map((data, i) => {

                                    return (
                                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                                            <img src={"http://localhost:3000/images/" + data.item.Image} alt="..."
                                                 height="50" width="50" className="img-responsive"/>

                                            <div>

                                                <h6 className="my-0">{(i + 1) + " " + data.item.Name}</h6>
                                                <strong className="text-muted">{"Quantity: " + data.qty}</strong>
                                            </div>
                                            <span className="text-muted">${data.item.Price * data.qty}</span>
                                        </li>
                                    )
                                })
                            }


                            <li className="list-group-item d-flex justify-content-between">

                                <span>Total</span>
                                <strong>${this.state.total}</strong>
                            </li>
                        </ul>

                    </div>
                    <div className="col-md-8 order-md-1">

                        <form className="needs-validation" noValidate>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName">First name</label>
                                    <input type="text" className="form-control" id="firstName" placeholder required/>
                                    <div className="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName">Last name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder required/>
                                    <div className="invalid-feedback">
                                        Valid last name is required.
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username">Username</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">@</span>
                                    </div>
                                    <input type="text" className="form-control" id="username" placeholder="Username"
                                           required/>
                                    <div className="invalid-feedback" style={{width: '100%'}}>
                                        Your username is required.
                                    </div>
                                </div>
                            </div>

                            <Map style={{margin: '50px'}}

                                 center={{lat: 27.7052354, lng: 85.3272271}}
                                 height='300px'
                                 zoom={15}/>

                            <hr className="mb-4"/>
                            <h4 className="mb-3">Payment</h4>
                            <div className="d-block my-3">
                                <div className="custom-control custom-radio">
                                    <input id="credit" name="paymentMethod" type="radio"
                                           className="custom-control-input text-left" defaultChecked required/>
                                    <label className="custom-control-label" htmlFor="credit">Credit card</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input id="debit" name="paymentMethod" type="radio"
                                           className="custom-control-input text-left" required/>
                                    <label className="custom-control-label" htmlFor="debit">Debit card</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input id="paypal" name="paymentMethod" type="radio"
                                           className="custom-control-input text-left" required/>
                                    <label className="custom-control-label" htmlFor="paypal">Cash on Delivery</label>
                                </div>
                            </div>


                            <hr className="mb-4"/>
                            <button className="btn btn-primary btn-lg btn-block" type="submit"
                                    onClick={this.order}>Continue to checkout
                            </button>
                        </form>
                    </div>
                </div>

            </div>


        )

    }

}
