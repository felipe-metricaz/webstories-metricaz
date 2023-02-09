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
        M.CharacterCounter.init(input_field, {});

        var text_area = document.querySelector("textarea#textarea");
        M.CharacterCounter.init(text_area, {});

    };

      

    render() {
        return (
            <div>
               <ul id="slide-out" className="sidenav sidenav-fixed">     
                    <form class="col 12 input-box">



                        {/* Titulo do story */}
                        <div class="input-field">
                        <i class="material-icons prefix">mode_edit</i>
                        <input id="input_text" type="text" data-length="50"/>
                        <label for="input_text">Titulo do Story</label>
                        <span class="helper-text" data-error="wrong" data-length="10" data-success="right">Insira um titulo com até 50 caracteres</span>
                        </div>


                        {/* Descrição do story */}
                        <div class="input-field description">
                        <i class="material-icons prefix">mode_edit</i>
                        <textarea id="textarea" class="materialize-textarea" type="text" data-length="120"></textarea>
                        <label for="textarea">Descrição do Story</label>
                        <span class="helper-text" data-error="wrong" data-length="10" data-success="right">Insira uma descrição com até 150 caracteres</span>
                        </div>



                        {/* Select File */}
                        <div class="file-field input-field select-img">
                        <div class="btn">
                            <span><i class="material-icons left">file_upload</i>Selecione a imagem</span>
                            <input type="file"/>
                          
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text"/>
                        </div>
                        </div>


                        {/* Download button */}
                        <div class="download">
                        <a class="waves-effect waves-light btn"><i class="material-icons left">file_download</i>Download HTML</a>
                        </div>
                    </form>
                </ul>
            </div>
        );
    }
}

export default RightSidenav;