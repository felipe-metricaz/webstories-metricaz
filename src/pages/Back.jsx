import React from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import { useState } from 'react';
import  '../css/back.css';
import webstories_base from '../templates-webstories/body.txt';
import webstoriespage_base from '../templates-webstories/page.txt';
import DynamicInput from '../components/dynamicinput/index.jsx';

class Back extends React.Component { 

    constructor() {
        super();
        this.state = {
            clientes: this.arrClientes,
            webstorie: this.objWebStorie,
            showcode: '',
            areacode: '',
        };
        fetch("http://localhost:3001/getclientes").then(r => r.text()).then(text => {
            if(!text){ return; }
            this.arrClientes = JSON.parse(text);
            this.setState({ clientes: this.arrClientes});
        });
        fetch(webstories_base).then(r => r.text()).then(text => {
            webstories_base = text ;
        });
        fetch(webstoriespage_base).then(r => r.text()).then(text => {
            webstoriespage_base = text ;
        });
    }



    arrClientes = [];
    tplCliente = {
        name: '',
        webStories: []
    };

    objWebStorie = {
        id:'',
        cliente: {},
        name: '',
        cover: {
            img: '',
            titulo: '',
            subtitulo: '',
            extra: []
        },
        pages: []
    };

    /*objWebStorie = {
        id:'',
        cliente: {},
        name: '',
        cover: [],
        pages: []
    };*/



    renderInput = (tipo) => {
        var change = null;
        if(tipo=='upload'){
            change = this.handleFileChange;
        } else {
            change = this.changeInput;
        }
        var t = this.objWebStorie.cover.extra.length;
        this.objWebStorie.cover.extra.push(
            {
              type: tipo,  
              name: 'cover.extra.'+t+'.value',
              placeholder: 'teste',
              value: this.state.webstorie.cover.titulo,
              change: change
            }
        );
        this.setState({ webstorie: this.objWebStorie}, function () {
           
        });
    };

    plusPageClick = (event) => {
        
        this.objWebStorie.pages.push({image:'', text1:'', text2:''});
        this.setState({ webstorie: this.objWebStorie}, function () {
        });
    };

    newCLiente = (event) => {
        var name = document.getElementById("nomeNovoCliente").value;
        if(name==""){
            alert('Campo requerido');
            return;
        }
        document.getElementById("nomeNovoCliente").value = '';
        this.arrClientes.push({name: name,webStories: []});
        this.updateCLiente();
    };

    updateCLiente = () => {
        this.setState({ clientes: this.arrClientes}, function () {
            const formData = new FormData();
            formData.append('clientes', JSON.stringify(this.state.clientes));
            axios.post("http://localhost:3001/saveclientes", formData, {
              headers: {
               'content-type': 'application/json',
              },
            }).then();
        });
    }

    newWebstorie = (event, idCliente) => {
        event.preventDefault();
        for (var member in this.objWebStorie){
            if(typeof this.objWebStorie[member] === 'object'){
                for (var m in this.objWebStorie[member]){
                    if(Array.isArray(this.objWebStorie[member][m])){
                        this.objWebStorie[member][m] = [];
                    } else {
                        this.objWebStorie[member][m] = '';
                    }
                }
            }  else{
                this.objWebStorie[member] = '';
            }
        } 
        this.objWebStorie.cliente = {id:idCliente,name:this.state.clientes[idCliente].name};
        this.objWebStorie.name = 'novo webstorie';
        this.setState({ areacode: '' });
        this.setState({ showcode: '' });
        this.setState({ webstorie: this.objWebStorie });
    };

    setWebstorie = (event, idWebstore) => {
        event.preventDefault();
        fetch("http://localhost:3001/getwebstores/"+idWebstore).then(r => r.text()).then(text => {
            if(!text){ return; }
            this.objWebStorie = JSON.parse(text);
            this.setState({ webstorie: this.objWebStorie }, function () {
                this.atualizaCodigo();
            });
        });
    };

    handleFileChange = (e) => {
        const formData = new FormData();
        let fileName = e.target.files[0].name;
        var idWebstore = this.setId();
        if(e.target.id == 'imgcover'){
            fileName = idWebstore+'-cover.'+fileName.substr(fileName.length - 3);
            this.objWebStorie.cover.img = 'http://localhost:3001/img/'+fileName;
 
        } else {
            var id = e.target.getAttribute('index');
            fileName = idWebstore+'-page'+id+'.'+fileName.substr(fileName.length - 3);
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

    setId = () => {
        if(this.state.webstorie.id != ''){
            return this.state.webstorie.id;
        }
        var id = Date.now();
        this.objWebStorie.id = id;
        this.setState({webstorie: this.objWebStorie});
        var idCLiente = this.state.webstorie.cliente.id;

        this.arrClientes[idCLiente].webStories.push({id:id,name:this.objWebStorie.name});
        this.updateCLiente();
        return id;
    }

    sendJson = () => {
        const formData = new FormData();
        var idName = '';
        if(this.state.webstorie.id == ''){
            idName = this.setId();

        } else {
            idName = this.state.webstorie.id;
        }
        formData.append('filename', idName);
        formData.append('json', JSON.stringify(this.state.webstorie));
        axios.post("http://localhost:3001/savejson", formData, {
          headers: {
           'content-type': 'application/json',
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
        this.sendJson();
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
        console.log('this.objWebStorie.' +name+ ' = "'+valor+'"');
        console.log(this.objWebStorie);
        this.setState({webstorie: this.objWebStorie}, function () {
           // this.atualizaCodigo();
            if(name == 'name' && this.objWebStorie.id != ''){
                for (var web in this.arrClientes[this.objWebStorie.cliente.id].webStories){
                    if(this.arrClientes[this.objWebStorie.cliente.id].webStories[web].id==this.objWebStorie.id){
                        this.arrClientes[this.objWebStorie.cliente.id].webStories[web].name = valor;
                    }
                }
                this.updateCLiente();
            }
        });

    };

    

    render() {
        return <section>
            <div>
                <p><b>Projetos</b></p>
                <ul>
                {this.state.clientes.map((cli, i) => (
                    <li key={i}>
                        <b>{cli.name}</b>
                        <ul>
                            <li><a href="#" onClick={(e) => this.newWebstorie(e, i)}> Novo Webstorie</a></li>
                            {cli.webStories.map((web, j) => (
                                <li key={j} onClick={(e) => this.setWebstorie(e, web.id)}>{web.name}</li>
                            ))}
                        </ul>
                    </li>
                ))}               
                </ul>
                <div>
                    <input id="nomeNovoCliente" type="text" />
                    <button onClick={this.newCLiente} >Novo CLiente</button>
                </div>
            </div>
            <div>
                <iframe id="iframestorie" width="360" height="640" src={this.state.showcode} ></iframe>
                <textarea style={{display: "none"}} name="" id="areacodigo" value={this.state.areacode}  />
            </div>
            <div>
                <label>
                    <input name="name" value={this.state.webstorie.name} onChange={this.changeInput} placeholder="Titulo do WebStorie" type="text" />
                </label>
                <fieldset id="coverfield">
                    <legend>Capa</legend>
                    <label>
                        Imagem de fundo <br />
                        <input id="imgcover" placeholder="Imagem" type="file" onChange={this.handleFileChange} />
                    </label>
                    <label>
                        <input name="cover.titulo" value={this.state.webstorie.cover.titulo} onChange={this.changeInput} placeholder="Titulo" type="text" />
                    </label>  
                    {this.state.webstorie.cover.extra.map((extra, i) => (
                         <DynamicInput key={i} state={this.state} type={extra.type} name={extra.name} placeholder={extra.placeholder} value={extra.value} change={extra.change} />
                
                    ))} 
                    
                    <button onClick={() => this.renderInput('text')} >Titulo</button>
                    <button onClick={() => this.renderInput('textarea')} >Paragrafo</button>
                    <button onClick={() => this.renderInput('upload')} >Imagem</button> 
                </fieldset>
                
                
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
                </div>
            </div>
        </section>
        ;
    }
}
export default Back
