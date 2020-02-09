import React from "react";
var intervalID;
class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    switch (event.currentTarget.value) {
      case "STARTSTOP":
        this.props.dispatch({
          id: "",
          type: "PAUSE"
        });
        if (this.props.pause) {
          this.props.dispatch({
            id: "",
            type: "START"
          });
          intervalID = setInterval(this.props.dispatch, 1000, {
            id: "",
            type: "START"
          });
        } else {
          clearInterval(intervalID);
        }

        break;
      case "RESET":
        clearInterval(intervalID);
        this.props.dispatch({
          id: "",
          type: "RESET"
        });
        break;
      case "SESLENGTH":
        this.props.dispatch({
          id: event.currentTarget.id,
          type: "SESLENGTH"
        });
        break;
      case "BREAKLENGTH":
        this.props.dispatch({
          id: event.currentTarget.id,
          type: "BREAKLENGTH"
        });
        break;
      default:
        break;
    }
  }
  componentWillMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div className="PomodoroClock">
        <h1>Pomodoro Clock</h1>
              <audio id="player" className="invis"
                src="https://thumbs.dreamstime.com/audiothumb_10551/105514696.mp3" controls />
        <div className="lengthControls">
          <div className="controlBlock">
            <div>Session Length</div>
            <div className="control">
              <button
                className="button arrow"
                value="SESLENGTH"
                id="DOWN"
                onClick={this.handleClick}
              >
                <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </button>
              <div>{this.props.sesLength}:00</div>
              <button
                className="button arrow"
                value="SESLENGTH"
                id="UP"
                onClick={this.handleClick}
              >
                <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div className="controlBlock">
            <div>Break Length</div>
            <div className="control">
              <button
                className="button arrow"
                value="BREAKLENGTH"
                id="DOWN"
                onClick={this.handleClick}
              >
                <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </button>
              <div>{this.props.breakLength}:00 </div>
              <button
                className="button arrow"
                value="BREAKLENGTH"
                id="UP"
                onClick={this.handleClick}
              >
                <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="session">
          <div>{this.props.curState}</div>
          <div className="timer" id="display">
            {this.props.min}:{this.props.sec}
          </div>
          <div>
            <button
              className="button"
              onClick={this.handleClick}
              value="STARTSTOP"
            >
              <div>
                <i class="fa fa-play fa-play" aria-hidden="true"></i>
                <i class="fa fa-play fa-pause" aria-hidden="true"></i>
              </div>
            </button>
            <button className="button" onClick={this.handleClick} value="RESET">
              <i class="fa fa-repeat" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default PomodoroClock;
