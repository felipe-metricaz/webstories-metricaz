import React, { Component } from "react";
//import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import M from 'materialize-css';
import "./style.css"


class LeftSidenav extends Component {
    componentDidMount() {
        var sidenav = document.querySelector(".sidenav");
        M.Sidenav.init(sidenav, {
            edge: "left"
        });

        var collapsible = document.querySelector(".collapsible");
        M.Collapsible.init(collapsible, {
        });
    }


    render() {
        return (
            <div>
              
              <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

{/* Start Code */}

<ul id="slide-out" class="sidenav sidenav-fixed">

    <li>
        <div class="user-view">
      <div className="background user-background"> </div>
      <a href="#name"><span class="black-text name">John Doe</span></a>
      <a href="#email"><span class="black-text email">jdandturk@gmail.com</span></a>
    </div>
    </li>


      <ul class="collapsible">
          <li>
            <a class="collapsible-header">Livelo<i class="material-icons">arrow_right</i></a>
            <div class="collapsible-body">
              <ul>
                <li><a href="#!">First</a></li>
                <li><a href="#!">Second</a></li>
                <li><a href="#!">Third</a></li>
                <li><a href="#!">Fourth</a></li>
              </ul>
            </div>
          </li>
        </ul>
  </ul>

          
          

{/* End code */}



            </div>
        );
    }
}

export default LeftSidenav;