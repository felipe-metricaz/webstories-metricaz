import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from 'materialize-css';
import "./style.css"

class Iframe extends Component {

  componentDidMount() {
    var tabs = document.querySelector(".tabs");
    M.Tabs.init(tabs, {
    });
}


    render() {
        return (
            <div>
               <div class="container center-column">
                   <div class="col s9">
                      <ul class="tabs">
                        <li class="tab col s3"><a href="#test1">Webstory</a></li>
                        <li class="tab col s3"><a class="active" href="#test2">Code</a></li>
                      </ul>
                    <div id="test1" class="col s12">
                      <h1>Webstory goes here!</h1>
                    </div>
                    <div id="test2" class="col s12">
                      <h1>
                        Code goes here!
                      </h1>
                    </div>
                   </div>
               </div>
            </div>
        );
    }
}

export default Iframe;