import { useState, useEffect, Component } from 'react'
import reactLogo from '../../assets/react.svg'
import about from './pics/about.jpg'
import gaming from './pics/gaming.jpg'
import port from './pics/port.jpg'
import software from './pics/software.jpg'
import '../../App.css'
import Api from '../components/API/Api.js'
import { useNavigate } from 'react-router-dom';

var navigate;

var API;

function Index(going) {

  console.log("going to /")
  navigate(going, { replace: false });
}

function Card(where,source, text){
  return(
    <>
      <div>
      <img onClick={()=>{Index(where);}} src={source} className="logo" alt="Vite logo" />
      <p>{text}</p>
      </div>
    </>

  );
}



class Gaming extends Component {

  constructor(props){
    super(props);
  this.state={
    count:0,
    msg:"Test"
  };

  API = new Api();
  }
  //callAPI();
  componentDidMount(){
    this.callAPI();
  }

  callAPI(){
    try{
      //API.setBaseURL('/api/');
      API.getHB()
      .then((Response) =>{
        console.log(Response.data.msg);
        this.setState({msg:Response.data.msg});
      });
  
    }catch(err){
      console.log(err);
    }
  }

  render(){
    //this.callAPI();
  return (
    <>
      <div class="ex1">        
        {Card('/',about,"About")}
        {Card('/',gaming,"gaming")}
        {Card('/',port,"port")}
        {Card('/',software,"software")}
      </div>
      <h1>{this.state.msg}</h1>
      <div className="card">
        <button onClick={() => this.setState({count:(this.state.count + 1)})} >
          count is {this.state.count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
}

export default Gaming
