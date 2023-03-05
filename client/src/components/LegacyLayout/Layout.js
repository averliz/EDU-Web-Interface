import React, { Component } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Leftside from "./Leftside";
import Home from "./Home";

export default class Layout extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  render() {
    return (
      <div>
        <div id="wrapper">
          <Leftside></Leftside>
          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <Header />
              <Home />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
