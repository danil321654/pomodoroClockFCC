import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const render = (min,sec) => {
  if(sec.toString().length == 1) sec = '0'+sec;
ReactDOM.render(
<div>
  <PomodoroClock sec={sec} min={min}/>,
</div>,
document.getElementById("root")
);

setTimeout(timer,1000,min,sec);}

function timer  (min, sec)  {

  if(sec==0){ sec = 60;min--;}
  sec--;
  console.log(min,sec);
  render(min,sec);
}
class PomodoroClock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      secLength: 25,
      curBreakLength: 5,
      breakLength: 500,
      last: "RESET"
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event){
    console.log('sad');
    timer(
      this.props.min,
      this.props.sec);
  }
  componentWillUpdate(){
    console.log("update");
  }
  render() {
    return (
      <div className="PomodoroClock">
        <h1>Pomodoro Clock</h1>
        <div className="lengthControls">
          <div className="controlBlock">
            <div>Session Length</div>
            <div className="control">
              <button className="button">
                <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </button>
              <div>25:00</div>
              <button className="button">
                <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div className="controlBlock">
            <div>Break Length</div>
            <div className="control">
              <button className="button">
                <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </button>
              <div>5:00</div>
              <button className="button">
                <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="session">
          <div>Session</div>
          <div className="timer">{
            this.props.min}:{this.props.sec}</div>
          <div >
            <button className="button" onClick={this.handleClick} value="STARTSTOP"><div >
              <i class="fa fa-play fa-play" aria-hidden="true" ></i>
              <i class="fa fa-play fa-pause" aria-hidden="true"></i></div>
            </button>
            <button className="button">
              <i class="fa fa-repeat" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
<div>
    <PomodoroClock sec="00" min="25"/>,
</div>,
  document.getElementById("root")
);
