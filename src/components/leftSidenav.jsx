import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";


class LeftSidenav extends Component {
    componentDidMount() {
        var elem = document.querySelector(".sidenav");
        M.Sidenav.init(elem, {
            edge: "left"
        });
    }

    render() {
        return (
            <div>
               <ul id="slide-out" className="sidenav sidenav-fixed">
                    <li />
                    <li>
                        <a href="#">
                            <i className="material-icons">cloud</i>First Link
                            With Icon
                        </a>
                    </li>
                    <li>
                        <a href="#">Second Link</a>
                    </li>
                    <li>
                        <div className="divider" />
                    </li>
                    <li>
                        <a className="subheader">Subheader</a>
                    </li>
                    <li>
                        <a className="waves-effect" href="#">
                            Third Link With Waves
                        </a>
                    </li>
               </ul>  
            </div>
        );
    }
}

export default LeftSidenav;