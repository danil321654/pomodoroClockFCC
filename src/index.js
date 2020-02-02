import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {createStore} from "redux";
import {Provider, connect} from "react-redux";

const timer = (state = {min: "25", sec: "00", defaultmin: "25"}, action) => {
  let state1 = state;
  switch (action.type) {
    case "START":
      console.log(state1);
      if (state1.sec == 0)
        Object.assign(state1, {min: state1.min - 1, sec: "59"});
      else Object.assign(state1, {sec: state1.sec - 1});
      return state1;
    case "RESET":
        Object.assign(state1, {min: state1.defaultmin, sec: "00"});
        return state1;
  }

  /*
  if (action.type == "START") {
    if (state1.sec == 0)
      Object.assign(state1, {min: state1.min - 1, sec: "60", paused: false});
  }
  if (action.type == "PAUSE") Object.assign(state1, {paused: true});
  console.log(state1);
  if (state1.sec.length == 1) Object.assign(state1, {sec: "0" + state1.sec});
  if (!state1.paused) Object.assign(state, {sec: state.sec - 1});*/
  return state1;
};
const store = createStore(timer);
var intervalID;
class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pause: true
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    switch (event.currentTarget.value) {
      case "STARTSTOP":
        if (this.state.pause) {
          store.dispatch({
            id: "",
            type: "START"
          });
          intervalID = setInterval(store.dispatch, 1000, {
            id: "",
            type: "START"
          });
        } else {
          clearInterval(intervalID);
        }

        this.setState({pause: !this.state.pause});
        break;
      case "RESET":
        clearInterval(intervalID);
        store.dispatch({
          id: "",
          type: "RESET"
        });
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
          <div className="timer">
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
            <button
              className="button"
              onClick={this.handleClick}
              value="RESET"
            >
              <i class="fa fa-repeat" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <div>
      <PomodoroClock
        sec={store.getState().sec}
        min={store.getState().min}
        paused={store.getState().paused}
      />
    </div>,
    document.getElementById("root")
  );
};
render();
store.subscribe(render);
