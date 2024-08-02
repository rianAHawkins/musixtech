import { useState, useEffect } from 'react'
import reactLogo from '../../assets/react.svg'
import about from './pics/about.jpg'
import gaming from './pics/gaming.jpg'
import port from './pics/port.jpg'
import software from './pics/software.jpg'
import '../../App.css'
import { useNavigate } from 'react-router-dom';
import jObj from './Data.json';
import Card from '../components/card';

var navigate;

function About() {
  navigate = useNavigate();
  const [count, setCount] = useState(0);
  const {AboutMSG} = jObj;

  return (
    <>
      <h1>This the About page</h1>
      <div class="ex1">        
        {Card("",AboutMSG,false)}
      </div>      
    </>
  )
}

export default About
