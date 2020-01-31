import React from "react";

class PomodoroClock extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event){
    this.props.updateScr({type: "STARTSTOP"});
  }
  componentDidMount(){

  }
  componentDidUpdate(){
    setTimeout( () => {
      this.props.curSesLengthSec--;
      if (this.props.curSesLengthSec == 59)
        this.props.curSesLengthMin--;

    },1000)
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
          <div className="timer">{this.props.curSesLengthMin}:{this.props.curSesLengthSec}</div>
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

export default PomodoroClock;
