import axios from 'axios'
import React, {state, Component, fileHandler, changeHandler} from 'react'
import {ToastContainer, toast} from 'react-toastify'

class addHotel extends Component {
    state = {
        name: "",
        address: "",
        phone: "",
        rating: "",
        images: null,
        config: {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }
    }

    changeHandler = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    fileHandler = (e) => {

        this.setState({
            images: e.target.files[0],
            loaded: 0
        })
        console.log(e.target.files[0])

    }
    addHotel = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('name', this.state.name)
        data.append('address', this.state.address)
        data.append('phone', this.state.phone)
        data.append('rating', this.state.rating)
        data.append('images', this.state.images)

        axios.post("http://localhost:3000/addHotel", data, this.state.config).then((response) => {
            console.log(response)
            toast.success("New Hotel Added")
            // window.location.reload()
        })
    }

    render() {


        return (
            <div>
                <ToastContainer/>

                <section class="get-in-touch">
                    <h1 class="title">Add New Hotel</h1>
                    <form class="contact-form row">
                        <div class="form-field col-lg-6">
                            <input id="text" name="name" className="input-text js-input" value={this.state.name}
                                   onChange={this.changeHandler} type="text"/>
                            <label className="label">Hotel Name</label>
                        </div>
                        <div class="form-field col-lg-6 ">
                            <input id="text" name="address" className="input-text js-input" value={this.state.address}
                                   onChange={this.changeHandler} type="text" required/>
                            <label className="label">Address</label>
                        </div>
                        <div class="form-field col-lg-6 ">
                            <input id="company" className="input-text js-input" name="phone" value={this.state.phone}
                                   onChange={this.changeHandler} type="text" required/>
                            <label className="label">Phone</label>
                        </div>
                        <div class="form-field col-lg-6 ">
                            <input id="phone" className="input-text js-input" name="rating" value={this.state.rating}
                                   onChange={this.changeHandler} type="number" required/>
                            <label className="label" for="phone">Rating</label>
                        </div>
                        <div class="form-field col-lg-12">
                            <input id="message" className="input-file js-input" name="images" value={this.state.image}
                                   onChange={this.fileHandler} type="file" required/>
                            <label className="label" for="message">Image</label>
                        </div>
                        <div class="form-field col-lg-12">
                            <input className="submit-btn" type="submit" onClick={this.addHotel} value="Submit"/>
                        </div>
                    </form>
                </section>
            </div>

        )
    }
}

export default addHotel
