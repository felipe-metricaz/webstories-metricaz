import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import  '../css/back.css';
import webstories_base from '../templates-webstories/body.txt';
import webstoriespage_base from '../templates-webstories/page.txt';

class Back extends React.Component {

    constructor() {
        super();
        this.state = {
            webstorie: this.objWebStorie,
            showcode: '',
            areacode: '',
        };
        fetch(webstories_base).then(r => r.text()).then(text => {
            webstories_base = text ;
        });
        fetch(webstoriespage_base).then(r => r.text()).then(text => {
            webstoriespage_base = text ;
        });
        this.sendJson();

    }

    objWebStorie = {
        name: 'ass',
        cover: {
            img: '',
            titulo: '',
            subtitulo: ''
        },
        pages: []
    };
    

    handleClick = (event) => {

        this.sendJson();

        this.atualizaCodigo();
    }; 

    plusPageClick = (event) => {
        this.objWebStorie.pages.push({image:'', text1:'', text2:''});
        this.setState({ webstorie: this.objWebStorie}, function () {
        });
    };

    handleFileChange = (e) => {
        const formData = new FormData();
        let fileName = e.target.files[0].name;
        if(e.target.id == 'imgcover'){
            fileName = 'cover.'+fileName.substr(fileName.length - 3);
            this.objWebStorie.cover.img = 'http://localhost:3001/img/'+fileName;
 
        } else {
            var id = e.target.getAttribute('index');
            fileName = 'page'+id+'.'+fileName.substr(fileName.length - 3);
            this.objWebStorie.pages[id].image = 'http://localhost:3001/img/'+fileName;    
        }
        formData.append('myFile', e.target.files[0],fileName);

        axios.post("http://localhost:3001/uploadimage", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        }).then(response => (this.atualizaCodigo()))
        
        this.setState({webstorie: this.objWebStorie}, function () {});
    };

    sendJson = () => {
        const formData = new FormData();
        formData.append('filename', this.state.webstorie.name);
        formData.append('json', JSON.stringify(this.state.webstorie));
        axios.post("http://localhost:3001/savejson", formData, {
          headers: {
           'content-type': 'text/json',
          },
        }).then();
    }

    atualizaCodigo = () => {
        var processCode = webstories_base;
        processCode = processCode.replaceAll('<!--imgcover-->',this.state.webstorie.cover.img)
        processCode = processCode.replaceAll('<!--titulo-->','<h1>'+this.state.webstorie.cover.titulo+'</h1>')
        processCode = processCode.replaceAll('<!--subtitulo-->','<p>'+this.state.webstorie.cover.subtitulo+'</p>')
        
        var processPages = '';
        for (var i=0;i < this.state.webstorie.pages.length;i++){
            processPages += webstoriespage_base
                .replaceAll('<!--key-->',i)
                .replaceAll('<!--titulo-->',this.state.webstorie.pages[i].text1)
                .replaceAll('<!--img-->',this.state.webstorie.pages[i].image)
                .replaceAll('<!--texto-->',this.state.webstorie.pages[i].text2);
        };

        processCode = processCode.replaceAll('<!-- amp-paginas-aqui -->',processPages)

        this.setState({ areacode: processCode });
        this.setState({ showcode: "data:text/html;charset=utf-8," + escape(processCode) });
    }

    changeInput = (e) => {
        var name = e.target.name;
        var valor = e.target.value;
        var objTest  = name.split('.').reduce(function(prev, curr) {
            if(!isNaN(curr) && prev[curr] !== undefined){
                name = name.replace('.'+curr, '['+curr+']');
                return prev[curr];
            }
            return prev.hasOwnProperty(curr) ? prev[curr] : null
        }, this.objWebStorie); 
        if(objTest !== null){
            eval('this.objWebStorie.' +name+ ' = "'+valor+'"');
        }
        this.setState({webstorie: this.objWebStorie}, function () {
            this.atualizaCodigo();
        });
    };

    render() {
        return <section>
            <div>
                <p><b>Projetos</b></p>
                <ul>
                    <li>Webstorie-#1</li>
                    <li>Webstorie-#2</li>
                    <li>Webstorie-#3</li>
                </ul>
            </div>
            <div><iframe id="iframestorie" width="360" height="640" src={this.state.showcode} ></iframe></div>
            <div><textarea name="" id="areacodigo" cols="30" value={this.state.areacode} rows="10" /></div>
            <div>
                <label>
                    <input name="name" value={this.state.webstorie.name} onChange={this.changeInput} placeholder="Nome" type="text" />
                </label>
                <label>
                    <input id="imgcover" placeholder="Imagem" type="file" onChange={this.handleFileChange} />
                </label>
                <label>
                    <input name="cover.titulo" value={this.state.webstorie.cover.titulo} onChange={this.changeInput} placeholder="Titulo" type="text" />
                </label>
                <label>
                    <input name="cover.subtitulo" value={this.state.webstorie.cover.subtitulo} onChange={this.changeInput} placeholder="Subtítulo" type="text" />
                </label>
                {this.state.webstorie.pages.map((page, i) => (
                  <div key={i}>
                    <label>
                        <input index={i} id={"img"+i} name="image" placeholder="Imagem" type="file" onChange={this.handleFileChange} />
                    </label>
                    <label>
                    <input name={"pages."+i+".text1"} value={this.state.webstorie.pages[i].text1} onChange={this.changeInput} placeholder="Texto" type="text" />
                    </label>
                    <label>
                    <input name={"pages."+i+".text2"} value={this.state.webstorie.pages[i].text2} onChange={this.changeInput}  placeholder="Texto" type="text" />
                    </label>
                  </div>
                ))}

                <div>
                    <button onClick={this.plusPageClick} >+ Page</button>
                    <button onClick={this.handleClick} >Gerar Webstorie</button>
                </div>
            </div>
        </section>
        ;
    }
}
export default Back
