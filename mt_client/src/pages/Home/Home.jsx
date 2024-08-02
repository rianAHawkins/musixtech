import { useState, useEffect } from 'react'
import reactLogo from '../../assets/react.svg'
import about from './pics/about.jpg'
import gaming from './pics/gaming.jpg'
import port from './pics/port.jpg'
import software from './pics/software.jpg'
import '../../App.css'
import { useNavigate } from 'react-router-dom';

var navigate;

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

function Home() {
  navigate = useNavigate();
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="ex1">        
        {Card('/About',about,"About")}
        {Card('/Gaming',gaming,"gaming")}
        <a href="https://rianandrewwhite.wixsite.com/my-site">
        {Card('/Home',port,"port")}
        </a>
        {Card('/Software',software,"software")}
      </div>
      <h1>MUSIX TECH</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default Home
