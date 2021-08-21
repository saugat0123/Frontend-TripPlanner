import {Component, state, cancel} from "react";
import axios from 'axios'

import {Redirect} from "react-router";
import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'

export default class orderReciept extends Component {


    state = {
        data: []
        ,
        config: {
            headers: {'authorization': `Bearer ${localStorage.getItem("token")}`}
        }


    }

    componentDidMount() {


        axios.get('http://localhost:3000/allOrder', this.state.config).then((response) => {

            this.setState({data: response.data.data})

            console.log('ORDERDATA:::::::',this.state.data)

        })


    }

    cancel = (pid) => {
        axios.delete('http://localhost:3000/cancelOrder/' + this.state.data[this.state.data.length - 1]._id, this.state.config).then((response) => {

            alert("deleted")
            window.location.href = '/'
        })
    }

    render() {

        return (
            <div>

                <div className="container-fluid">
                    <div className="row-fluid">
                        <div className="col-lg-12">
                            <div className="invoice-title">
                                <h2 className="text-center">Invoice</h2>
                            </div>
                        </div>
                        <hr/>
                        {

                            this.state.data.slice(this.state.data.length - 1).map((data) => {

                                return (

                                    <div>


                                        <div className="row">
                                            <div className="col-lg-6 text-left">
                                                <address>
                                                    <strong>Billed To:</strong><br/>
                                                    {`${data.UserId.FirstName} ${data.UserId.Lastname}`}<br/>
                                                    Address: {data.address}
                                                </address>
                                            </div>
                                            <div className="col-lg-6 text-right">
                                                <address>
                                                    <strong>Shipped To:</strong><br/>
                                                    {`${data.UserId.FirstName} ${data.UserId.Lastname}`}<br/>

                                                </address>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 text-left">
                                                <address>
                                                    <strong>Payment Method:</strong><br/>
                                                    {data.paidThrough}
                                                </address>
                                            </div>
                                            <div className="col-lg-6 text-right">
                                                <address>
                                                    <strong>Order Date:</strong><br/>
                                                    {data.orderDate}<br/><br/>
                                                </address>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="panel panel-default">
                                                    <div className="panel-heading">
                                                        <h3 className="panel-title"><strong></strong></h3>
                                                    </div>
                                                    <div className="panel-body">
                                                        <div className="table-responsive">
                                                            <table className="table table-condensed">
                                                                <thead>
                                                                <tr>
                                                                    <td><strong>Item</strong></td>
                                                                    <td className="text-center"><strong>Price</strong>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <strong>Quantity</strong></td>
                                                                    <td className="text-right"><strong>Totals</strong>
                                                                    </td>
                                                                </tr>
                                                                </thead>
                                                                <tbody>


                                                                {

                                                                    data.ProductId.map((item) => {
                                                                        return (

                                                                            <tr>
                                                                                <td>{item.item.Name}</td>
                                                                                <td className="text-center">${item.item.Price}</td>
                                                                                <td className="text-center">{item.qty}</td>
                                                                                <td className="text-right">{parseInt(item.item.Price) * item.qty}</td>
                                                                            </tr>

                                                                        )

                                                                    })
                                                                }


                                                                <tr>
                                                                    {
                                                                        !data.orderStatus == true ? (<>
                                                                            <td className="thick-line text-left">
                                                                                <button className="btn btn-danger"
                                                                                        onClick={this.cancel}>Cancel
                                                                                    Order
                                                                                </button>
                                                                            </td>


                                                                        </>) : (<>

                                                                            <td className="thick-line text-left">
                                                                                <button
                                                                                    className="btn btn-primary">Order
                                                                                    Accepted
                                                                                </button>
                                                                            </td>

                                                                        </>)

                                                                    }
                                                                    <td className="thick-line"></td>
                                                                    <td className="thick-line text-center">
                                                                        <strong>Subtotal</strong></td>
                                                                    <td className="thick-line text-right">{data.totalAmount}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="no-line"></td>
                                                                    <td className="no-line"></td>
                                                                    <td className="no-line text-center">
                                                                        <strong>Shipping</strong></td>
                                                                    <td className="no-line text-right">$15</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="no-line"></td>
                                                                    <td className="no-line"></td>
                                                                    <td className="no-line text-center">
                                                                        <strong>Total</strong></td>
                                                                    <td className="no-line text-right">${data.totalAmount + 15}</td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
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
            </div>


        )

    }


}
