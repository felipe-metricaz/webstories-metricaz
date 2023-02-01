import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/css/materialize.min.css";
import M from 'materialize-css';

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
                 <div class="row">
                   <div class="col s3">
                   </div>
                   <div class="col s9">
                   <div class="row">
                    <div class="col s12">
                      <ul class="tabs">
                        <li class="tab col s3"><a href="#test1">Test 1</a></li>
                        <li class="tab col s3"><a class="active" href="#test2">Test 2</a></li>
                        <li class="tab col s3"><a href="#test4">Test 4</a></li>
                      </ul>
                    </div>
                    <div id="test1" class="col s12">Test 1</div>
                    <div id="test2" class="col s12">Test 2</div>
                    <div id="test4" class="col s12">Test 4</div>
                  </div>
                   </div>
                   <div class="col s3">
                   </div>
                 </div>
               </div>
            </div>
        );
    }
}

export default Iframe;