import { useState, useEffect, Component } from 'react'
import reactLogo from '../../assets/react.svg'
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

function search(formData) {
  const query = formData.get("query");
  alert(`You searched for '${query}'`);
}

class Login extends Component {

  constructor(props){
    super(props);
  this.state={
    count:0,
    msg:"Test",
    LogOrSig:false
  };

  API = new Api();
  }
  //callAPI();
  componentDidMount(){
    this.callAPI();
  }

  callAPI(){
    try{
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
  return (
    <>
      <button onClick={() => this.setState({LogOrSig:!this.stateLogOrSig})} >
        Switch Form
      </button>
      <h1>{this.state.msg}</h1>
      <div>
        <form action={search}>
          <p>Username</p>
          <input name="Uname" />
          <p>PassWord</p>
          <input name="Pword" />
          {
          this.state.LogOrSig?
          <><p>RePassword</p><input name="REword" /></>:<><></>
          
          <></><button type="submit">Search</button></>
          }
        </form>
      </div>
      <div className="card">

      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
}

export default Login
