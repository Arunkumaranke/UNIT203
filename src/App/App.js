import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  // const App = () => (
  //   <div>
  //     <Switch>
  //       <Route exact path='/' component={Home}/>
  //       <Route path='/list' component={List}/>
  //     </Switch>
  //   </div>
  // )
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      {/* <Route path="/dashboard">
            <Dashboard />
          </Route> */}
    </Routes>
  );
}
export default App;
