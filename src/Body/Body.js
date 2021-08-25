import {React, Component, state, deleteProduct} from "react";


import {Container, Col, Row} from 'react-bootstrap';
import Registration from './Registration'
import {Route} from 'react-router-dom';
import Login from './Login'
import addResturant from '../Resturant/addResturant'
import addHotel from '../Hotel/addHotel'
import viewHotel from '../Body/viewHotel'

import viewResturant from '../Body/viewResturant'
import updateRes from '../Body/updateResturant'
import Cart from './Cart'
import Tabs from './TabPanel'

import admin from './admin'
import checkOut from './checkOut'
import Updateuser from './Updateuser'
import Home from '../Home/Home'
import Order from '../Body/orderReciept'
import Update from './Update'
import Map from './Navigation/AMap'
import BMap from './Navigation/BMap'

import ShowOrder from './Navigation/showAllOrder'
import singleProduct from './singleProduct'
import addFood from './addFood'
import UpdateFood from './Navigation/updateFood'
import viewUser from './viewUser'
import viewRestFood from './viewRestFood'
import AllOrder from './Navigation/allOrderAccept'
import axios from 'axios';

class Body extends Component {


    render() {
        return (


            <div className="container-fluid" id="appbody">
                <Row>

                    <Col>
                        <Route path='/map' component={Map}/>
                        <Route path='/maps/:lat/:lng' component={BMap}/>


                        {/*User Routes*/}
                        <Route exact path="/" component={Home}/>
                        <Route path='/register' component={Registration}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/checkOut' component={checkOut}/>
                        <Route exact path="/order" component={Order}/>
                        <Route path="/update/:id" component={Update}/>
                        <Route path="/cart" component={Cart}/>
                        <Route path='/update' component={Updateuser}/>
                        <Route path='/singleProduct/:id' component={singleProduct}/>
                        <Route path='/viewRestFood/:id' component={viewRestFood}/>


                        <Route path='/tab' component={Tabs}/>
                        {/*Admin Routes*/}
                        <Route path='/updateFood/:id' component={UpdateFood}/>
                        <Route path='/users' component={viewUser}/>
                        <Route path='/addFood/:id' component={addFood}/>
                        <Route path="/viewResturant" component={viewResturant}/>
                        <Route path="/addResturant" component={addResturant}/>
                        <Route path="/viewHotel" component={viewHotel}/>
                        <Route path="/addHotel" component={addHotel}/>
                        <Route exact path="/showAllOrder" component={ShowOrder}/>
                        <Route path='/allorder' component={AllOrder}/>
                        <Route path='/admin' component={admin}/>
                        <Route path='/updateRes/:id' component={updateRes}/>


                    </Col>
                </Row>
                <Row>

                </Row>
            </div>


        )
    }

}

export default Body;
