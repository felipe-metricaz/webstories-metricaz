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
    }

    objWebStorie = {
        cover: {
            img: '',
            titulo: '',
            subtitulo: ''
        },
        pages: []
    };
    

    handleClick = (event) => {

        var txtImg = document.getElementById('imgcover').files[0];
        var txtTitulo = document.getElementById('titulo').value;
        var txtSubTitulo = document.getElementById('subtitulo').value;
        if(!txtImg || !txtTitulo || !txtSubTitulo){
            alert('Totos são requeridos');
            return;
        }
        let tmpCover = this.state.webstorie.cover;
        let tmpPages = this.state.webstorie.pages;
        tmpCover.titulo = txtTitulo;
        tmpCover.subtitulo = txtSubTitulo;

        this.setState({ cover: tmpCover}, function () {
            
        });
        this.setState({ pages: tmpPages}, function () {

        });

        this.atualizaCodigo();
    }; 

    plusPageClick = (event) => {
        let tmpPage = this.state.webstorie.pages;
        tmpPage.push({image:'', text1:'', text2:''});
        this.setState({ pages: tmpPage}, function () {
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

        axios.post("http://localhost:3001/api/uploadfile", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        }).then(response => (this.atualizaCodigo()))
        
        this.setState({webstorie: this.objWebStorie}, function () {});
    };

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

    handleChangeCover = (e) => {
        var id = e.target.id;
        this.objWebStorie.cover[id] = e.target.value;
        this.setState({webstorie: this.objWebStorie}, function () {
            this.atualizaCodigo();
        });
    };

    handleChange = (e) => {
        var myindex = e.target.getAttribute('index');
        var name = e.target.name;
        this.objWebStorie.pages[myindex][name] = e.target.value;
        this.setState({webstorie: this.objWebStorie}, function () {
            this.atualizaCodigo();
        });
    };

    render() {
        return <section>
            <div><iframe id="iframestorie" width="360" height="640" src={this.state.showcode} ></iframe></div>
            <div><textarea name="" id="areacodigo" cols="30" value={this.state.areacode} rows="10" /></div>
            <div>
                <label>
                    <input id="imgcover" placeholder="Imagem" type="file" onChange={this.handleFileChange} />
                </label>
                <label>
                    <input id="titulo" value={this.state.webstorie.cover.titulo} onChange={this.handleChangeCover} placeholder="Titulo" type="text" />
                </label>
                <label>
                    <input id="subtitulo" value={this.state.webstorie.cover.subtitulo} onChange={this.handleChangeCover} placeholder="Subtítulo" type="text" />
                </label>
                {this.state.webstorie.pages.map((page, i) => (
                  <div key={i}>
                    <label>
                        <input index={i} id={"img"+i} name="image" placeholder="Imagem" type="file" onChange={this.handleFileChange} />
                    </label>
                    <label>
                    <input index={i} id={"text1"+i} name="text1" value={this.state.webstorie.pages[i].text1} onChange={this.handleChange} placeholder="Texto" type="text" />
                    </label>
                    <label>
                    <input index={i} id={"text2"+i} name="text2" value={this.state.webstorie.pages[i].text2} onChange={this.handleChange}  placeholder="Texto" type="text" />
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
