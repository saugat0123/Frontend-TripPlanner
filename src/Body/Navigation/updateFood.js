import axios from 'axios';
import React, { Component,state,update,changeHandler,fileHandler

} from 'react';

export default class updateFood extends Component {

state={


    Name:"",
    Price:"",
    Description:"",
    Rating:"",
    Image:"",
    id:this.props.match.params.id
}

fileHandler =(e)=>{

this.setState({

    Image:e.target.files[0]
})

}
update=()=>{

const data = new FormData()

data.append('Name',this.state.Name)
data.append('Price',this.state.Price)
data.append('Description',this.state.Description)
data.append('Rating',this.state.Rating)
data.append('Image',this.state.Image)




axios.put('http://localhost:3000/updateFood/'+this.state.id,data).then((response)=>{

console.log(response)

})


}



changeHandler =(e)=>{


    this.setState({

        [e.target.name]:e.target.value
    })
}

componentDidMount(){


    
 axios.get('http://localhost:3000/food/show/'+this.state.id).then((response)=>{

    this.setState({
        Name:response.data.data.Name,
        Image:response.data.data.Image,
        Rating:response.data.data.Rating,
        Price:response.data.data.Price,
        Description:response.data.data.Description
    })
    
    console.log(response.data)
     })
    
}

  render() {
    return (
      <div> 
          
           
<div>
 
 

 <section class="get-in-touch">
    <h1 class="title">Update Food</h1>
    <img src={"http://localhost:3000/images/"+this.state.Image} height="200" width="200"/>
    <form class="contact-form row">
       
       <div class="form-field col-lg-6">
          <input id="text" name="Name" className="input-text js-input" value={this.state.Name} onChange ={this.changeHandler} type="text" />
          <label className="label" > Name</label>
       </div>
       <div class="form-field col-lg-6 ">
          <input id="text" name ="Description" className="input-text js-input" value={this.state.Description} onChange ={this.changeHandler} type="text" required/>
          <label className="label">Description</label>
       </div>
       <div class="form-field col-lg-6 ">
          <input id="company" className="input-text js-input" name="Price" value={this.state.Price} onChange ={this.changeHandler} type="text" required/>
          <label className="label" >Price</label>
       </div>
        <div class="form-field col-lg-6 ">
          <input id="phone" className="input-text js-input" name ="Rating"value={this.state.Rating} onChange ={this.changeHandler} type="number" required/>
          <label className="label" for="phone">Rating</label>
       </div>
       <div class="form-field col-lg-6">
          <input id="message" className="input-file js-input" name="Image" onChange ={this.fileHandler} type="file" required/>
          <label className="label" for="message">Image</label>
       </div>
      
       <div class="form-field col-lg-12">
          <input className="submit-btn" type="submit" onClick={this.update} value="Submit"/>
       </div>
    </form>
 </section>
 </div>
     
          
           </div>
    );
  }
}
