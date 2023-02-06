import React, { Component } from "react";
import M from 'materialize-css';
import "materialize-css/dist/css/materialize.min.css";
import "./style.css"


class RightSidenav extends Component {
    componentDidMount() {

        /*       Iniciate Sidenav */
        var elem = document.querySelector(".sidenav");
        M.Sidenav.init(elem, {
            edge: "right"
        });

        /*  Initiate form */
        var input_field = document.querySelector("input#input_text");
        M.CharacterCounter.init(input_field, {
            edge: "right"
        });

    }

    render() {
        return (
            <div>
               <ul id="slide-out" className="sidenav sidenav-fixed">     
                    <form class="col 12 input-box">



                        {/* Titulo do story */}
                        <div class="input-field col s6">
                        <i class="material-icons prefix">mode_edit</i>
                        <input id="input_text" type="text" data-length="50"/>
                        <label for="input_text">Titulo do Story</label>
                        <span class="helper-text" data-error="wrong" data-length="10" data-success="right">Insira um titulo com até 50 caracteres</span>
                        </div>


                        {/* Descrição do story */}
                        <div class="input-field col s6">
                        <i class="material-icons prefix">mode_edit</i>
                        <input id="input_text" type="text" data-length="50"/>
                        <label for="input_text">Descrição do Story</label>
                        <span class="helper-text" data-error="wrong" data-length="10" data-success="right">Insira uma descrição com até 150 caracteres</span>
                        </div>



                        {/* File */}
                        <div class="file-field input-field">
                        <div class="btn">
                            <span>Selecione a imagem</span>
                            <input type="file"/>
                          
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text"/>
                        </div>
                        </div>
                    </form>
                </ul>
            </div>
        );
    }
}

export default RightSidenav;