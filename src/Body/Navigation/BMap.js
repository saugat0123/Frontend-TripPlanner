
import {Component,state} from 'react'
import Map from './Map'
class BMap extends Component{
    


state={

    lat:this.props.match.params.lat,
    lng:this.props.match.params.lng
    
        }
render(){



    const lat =this.state.lat
    const lng =this.state.lng
    console.log(lat+","+lng)

return(
<div>
<Map style={{margin:'50px'}}

center ={{lat:parseFloat(lat),lng:parseFloat(lng)}}
height='600px'
zoom={13}

>


</Map>
</div>

)

}





}
export default BMap