import React, { Component } from "react";
import M from 'materialize-css';
import "materialize-css/dist/css/materialize.min.css";
import "./style.css"
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";



class RightSidenav extends Component {
    componentDidMount() {

        /*       Iniciate Sidenav */
        var elem = document.querySelector(".sidenav");
        M.Sidenav.init(elem, {
            edge: "right"
        });

        var textInputs = document.querySelectorAll("input" );
        for (var i = 0; i < textInputs.length; i++) {
            M.CharacterCounter.init(textInputs[i], {});
         };

         var textArea = document.querySelectorAll("textarea" );
         for (var i = 0; i < textArea.length; i++) {
             M.CharacterCounter.init(textArea[i], {});
          };

        };

      

    render() {
        return (
            <div>
               <ul id="slide-out" className="sidenav sidenav-fixed">     
                   
                   
                

                    <form class="col 12 input-box">
                    <div class="pages-story">
                        {/* Titulo Capa */}
                        <div class="input-field">
                            <i class="material-icons prefix input-fields-icons">mode_edit</i>
                            <input id="input_title_story" type="text" data-length="50"/>
                            <label for="input_title_story">Titulo do Story</label>
                            <span class="helper-text" data-error="wrong" data-length="10" data-success="right">Insira um titulo com até 50 caracteres</span>
                        </div>
                    </div>

                    <div class="story-capa">
                        <h5>Capa</h5>
                        
                        {/* Select File */}
                        <div class="file-field input-field select-img">
                        <div class="btns">
                            <span><i class="material-icons left">file_upload</i>Selecione a imagem</span>
                            <input type="file"/>
                          
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text"/>
                        </div>
                        </div>

                        {/* Titulo Capa */}
                        <div class="input-field">
                            <i class="material-icons prefix input-fields-icons">mode_edit</i>
                            <input id="input_title-cover" type="text" data-length="50"/>
                            <label for="input_title-cover">Titulo do Story</label>
                            <span class="helper-text" data-error="wrong" data-length="10" data-success="right">Insira um titulo com até 50 caracteres</span>
                        </div>


                        {/* Descrição Capa */}
                        <div class="input-field description">
                        <i class="material-icons prefix input-fields-icons">mode_edit</i>
                        <textarea id="textarea" class="materialize-textarea" type="text" data-length="120"></textarea>
                        <label for="textarea">Descrição do Story</label>
                        <span class="helper-text" data-error="wrong" data-length="10" data-success="right">Insira uma descrição com até 150 caracteres</span>
                        </div>
                    </div>

                    <div class="pages-story">

                        <h5>Page 1</h5>

                        {/* Select File */}
                        <div class="file-field input-field select-img">
                        <div class="btns">
                            <span><i class="material-icons left">file_upload</i>Selecione a imagem</span>
                            <input type="file"/>
                          
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text"/>
                        </div>
                        </div>

                        {/* Titulo Capa */}
                        <div class="input-field">
                            <i class="material-icons prefix input-fields-icons">mode_edit</i>
                            <input id="input_text_page_1" type="text" data-length="50"/>
                            <label for="input_text_page_1">Titulo do Story</label>
                            <span class="helper-text" data-error="wrong" data-length="10" data-success="right">Insira um titulo com até 50 caracteres</span>
                        </div>


                        {/* Descrição Capa */}
                        <div class="input-field description">
                        <i class="material-icons prefix input-fields-icons">mode_edit</i>
                        <textarea id="textarea_1" class="materialize-textarea" type="text" data-length="120"></textarea>
                        <label for="textarea_1">Descrição do Story</label>
                        <span class="helper-text" data-error="wrong" data-length="10" data-success="right">Insira uma descrição com até 150 caracteres</span>
                        </div>

                    </div>

                    <div>
                        <a class="waves-effect waves-light btns"><i class="material-icons left">add</i>Page</a>
                    </div>

                    <div class="pages-story">
                       <Editor/>
                    </div>

                    </form>
                    
                        {/* Download button */}
                        <div class="download">
                            <a class="waves-effect waves-light btns"><i class="material-icons left">file_download</i>Download HTML</a>
                        </div>
                </ul>
            </div>
        );
    }
}

export default RightSidenav;