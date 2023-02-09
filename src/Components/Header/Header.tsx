import './Header.css';
import {Stack,Slider } from '@mui/material';
import Images from '../../Data/Images';
const Header = (props:any)=>{
    const {title} =props;
    const handleChange =()=>{
        console.log("hello!");
    }
    return(
        <header>
            <h1>{title}</h1>
            <div className='volumeDiv'>
                <img src={Images.ui.audio.speaker.off} alt="dwn"/>
                <Slider/>
                <img src={Images.ui.audio.speaker.on} alt="up"/>
            </div>
        </header>
    )
}

export default Header;