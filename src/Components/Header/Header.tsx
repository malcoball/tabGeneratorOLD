import './Header.css';
import {Stack,Slider } from '@mui/material';
const Header = (props:any)=>{
    const {title} =props;
    const handleChange =()=>{
        console.log("hello!");
    }
    return(
        <header>
            <h1>{title}</h1>

        </header>
    )
}

export default Header;