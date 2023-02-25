import './style.css';
import audio from './A2.wav';
const PlayAudioTest = ()=>{
    const playAudio = ()=>{
        const audioElm = new Audio(audio);
        console.log("Play : ",audioElm);
        audioElm.play();
    }
    return(
        <div id="audioBox"
        style={{
            backgroundImage:'url(./pic.jpg)',
            border:'1px solid black',
            width:'320px',height:'240px'}}>
            <h3 style={{textAlign:'center', paddingTop:'32px'}}>Audio</h3>
            <button onClick={playAudio}>Play audio pls</button>
        </div>
    )
}

export default PlayAudioTest;