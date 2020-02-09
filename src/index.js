import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {createStore} from "redux";
import {Provider, connect} from "react-redux";
import PomodoroClock from "./PomodoroClock.js";
const timer = (
  state = {
    min: "25",
    sec: "00",
    sesLength: "25",
    breakLength: "05",
    pause: true,
    curState: "START"
  },
  action
) => {
  let state1 = state;
  if (state1.min == 0)
    document.querySelector("#display").style = "color: rgb(142, 23, 23)";
  switch (action.type) {
    case "PAUSE":
      Object.assign(state1, {pause: !state1.pause});
      break;
    case "START":
      if (state1.curState == "START")
        Object.assign(state1, {curState: "TIMER"});
      console.log(state1);
      if (state1.sec == 0) {
        Object.assign(state1, {min: String(state1.min - 1), sec: "59"});
        if (state1.min == -1 && state1.sec == "59")
          switch (state1.curState) {
            case "TIMER":
              Object.assign(state1, {
                curState: "BREAK",
                min: state1.breakLength,
                sec: "00"
              });
              break;
            case "BREAK":
              Object.assign(state1, {
                curState: "TIMER",
                min: state1.breakLength,
                sec: "00"
              });
              break;
          }
      } else Object.assign(state1, {sec: String(state1.sec - 1)});
      if (state1.sec.toString().length == 1)
        Object.assign(state1, {sec: "0" + state1.sec});
      if (state1.min.toString().length == 1)
        Object.assign(state1, {min: "0" + state1.min});

      if (state1.min == 0){
        document.getElementById("display").style = "color: rgb(142, 23, 23)";
        if (state1.sec <= 5)
          document.getElementById("player").play();}
      else document.getElementById("display").style = "";
      break;
    case "RESET":
      Object.assign(state1, {
        min: state1.sesLength,
        sec: "00",
        curState: "START",
        pause: true
      });

      if (state1.min == 0)
        document.getElementById("display").style = "color: rgb(142, 23, 23)";
      else document.getElementById("display").style = "";
      break;
    case "BREAKLENGTH":
      console.log("1");
      switch (action.id) {
        case "UP":
          if (Number(state1.breakLength) + 1 < 100)
            Object.assign(state1, {
              breakLength: Number(state1.breakLength) + 1
            });
          break;
        case "DOWN":
          if (Number(state1.breakLength) - 1 > 0)
            Object.assign(state1, {
              breakLength: Number(state1.breakLength) - 1
            });
          break;
      }
      if (state1.breakLength.toString().length == 1)
        Object.assign(state1, {breakLength: "0" + state1.breakLength});
      break;
    case "SESLENGTH":
      console.log("2");
      switch (action.id) {
        case "UP":
          if (Number(state1.sesLength) + 1 < 100)
            Object.assign(state1, {sesLength: Number(state1.sesLength) + 1});
          break;
        case "DOWN":
          if (Number(state1.sesLength) - 1 > 0)
            Object.assign(state1, {sesLength: Number(state1.sesLength) - 1});
          break;
      }
      if (state1.sesLength.toString().length == 1)
        Object.assign(state1, {sesLength: "0" + state1.sesLength});
      if (state1.curState == "START")
        Object.assign(state1, {min: state1.sesLength});
      break;
  }
  return state1;
};
const store = createStore(timer);
const render = () => {
  ReactDOM.render(
    <div>
      <PomodoroClock
        sec={store.getState().sec}
        min={store.getState().min}
        pause={store.getState().pause}
        sesLength={store.getState().sesLength}
        breakLength={store.getState().breakLength}
        curState={store.getState().curState}
        dispatch={store.dispatch}
      />
    </div>,
    document.getElementById("root")
  );
};
render();
store.subscribe(render);
