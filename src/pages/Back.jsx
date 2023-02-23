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

    renderInput = (obj, tipo, name) => {
        var t = obj.extra.length;
        obj.extra.push(
            {
              type: tipo,  
              name: name+'.'+t+'.value',
              placeholder: 'teste',
              value: '',
            }
        );
                
        this.setState({ webstorie: this.objWebStorie});
    };

    setChangeTrigger = (tipo) => {
        if(tipo=='upload'){
            return this.handleFileChange;
        }
        return this.changeInput;
    };

    plusPageClick = (event) => {
        
        this.objWebStorie.pages.push({extra:[]});
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
        var saveValue = '';

        fileName = idWebstore+'-'+e.target.id+'.'+fileName.substr(fileName.length - 3);
        if(e.target.name == 'cover.img'){
            saveValue = 'http://localhost:3001/img/'+fileName;
        } else {
            saveValue = 'http://localhost:3001/img/'+fileName;    
        }
        
        formData.append('myFile', e.target.files[0],fileName);
        axios.post("http://localhost:3001/uploadimage", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        }).then(response => {
            let fakeE = {
                target: {
                    name: e.target.name,
                    value: saveValue
                }
            };
            this.changeInput(fakeE);
        })
        
        
    };

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
        
        var processCoverExtra = '';
        for (var i=0;i < this.state.webstorie.cover.extra.length;i++){
            let extra = this.state.webstorie.cover.extra[i];
            switch (extra.type) {
                case 'upload':
                    processCoverExtra += '<img src="'+extra.value+'" />'
                break;
                case 'text':
                    processCoverExtra += '<h2>'+extra.value+'</h2>'
                break;
                case 'textarea':
                    processCoverExtra += '<p>'+extra.value+'</p>'
                break;
                default:
                    processCoverExtra += '<div>'+extra.value+'</div>'
            }
        };
        processCode = processCode.replaceAll('<!--extra-->',processCoverExtra);
        var processPages = '';
        for (var i=0;i < this.state.webstorie.pages.length;i++){
            processPages += webstoriespage_base
                .replaceAll('<!--key-->',i);

            var processPageExtra = '';
            for (var j=0;j < this.state.webstorie.pages[i].extra.length;j++){
                let extra = this.state.webstorie.pages[i].extra[j];
                switch (extra.type) {
                    case 'upload':
                        processPageExtra += '<img src="'+extra.value+'" />'
                    break;
                    case 'text':
                        processPageExtra += '<h2>'+extra.value+'</h2>'
                    break;
                    case 'textarea':
                        processPageExtra += '<p>'+extra.value+'</p>'
                    break;
                    default:
                        processPageExtra += '<div>'+extra.value+'</div>'
                }
            };

            processPages = processPages.replaceAll('<!--extra-->',processPageExtra);
        };

        processCode = processCode.replaceAll('<!-- amp-paginas-aqui -->',processPages)

        this.setState({ areacode: processCode });
        this.setState({ showcode: "data:text/html;charset=utf-8," + escape(processCode) });
        this.sendJson();
    }

    

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
            <div className="side-properties">
                <div className="properties">
                    <label>
                        <input name="name" value={this.state.webstorie.name} onChange={this.changeInput} placeholder="Titulo do WebStorie" type="text" />
                    </label>
                    <fieldset id="coverfield">
                        <legend>Capa</legend>
                        <label>
                            Imagem de fundo <br />
                            <input name="cover.img" placeholder="Imagem" type="file" onChange={this.handleFileChange} />
                        </label>
                        <label>
                            <input name="cover.titulo" value={this.state.webstorie.cover.titulo} onChange={this.changeInput} placeholder="Titulo" type="text" />
                        </label>  
                        {this.state.webstorie.cover.extra.map((extra, i) => {
                            extra.change = this.setChangeTrigger(extra.type);
                            return <DynamicInput key={i} input={extra} />            
                        })} 
                        
                        <button onClick={() => this.renderInput(this.objWebStorie.cover,'text','cover.extra')} >Titulo</button>
                        <button onClick={() => this.renderInput(this.objWebStorie.cover,'textarea','cover.extra')} >Paragrafo</button>
                        <button onClick={() => this.renderInput(this.objWebStorie.cover,'upload','cover.extra')} >Imagem</button> 
                    </fieldset>
                    {this.state.webstorie.pages.map((page, i) => (
                      <fieldset key={i}>
                        <legend>Pagina {i+1}</legend>
                        {page.extra.map((extra, j) => {
                            extra.change = this.setChangeTrigger(extra.type);
                            return <DynamicInput key={j} input={extra} />            
                        })}
                        <button onClick={() => this.renderInput(this.objWebStorie.pages[i],'text','pages.'+i+'.extra')} >Titulo</button>
                        <button onClick={() => this.renderInput(this.objWebStorie.pages[i],'textarea','pages.'+i+'.extra')} >Paragrafo</button>
                        <button onClick={() => this.renderInput(this.objWebStorie.pages[i],'upload','pages.'+i+'.extra')} >Imagem</button> 
                      </fieldset>
                    ))}

                    <div>
                        <button onClick={this.plusPageClick} >+ Page</button>
                    </div>
                </div>
                <div>
                    <div><b>Estilo Capa</b></div>
                    <fieldset>
                        <legend>Titulo</legend>
                        <div>Tamanho: <input type="number" value="37" min="12" max="80" /></div>
                        <div>Color: <input type="color" value="#FFFFFF" /></div>
                        <div>Fonte: 
                            <select name="font" className="browser-default">
                                <option value="Roboto">Roboto</option>
                                <option value="Anton">Anton</option>
                                <option value="Work Sans">Work Sans</option>
                            </select>
                        </div>
                        <div>Largura: <input type="range"  min="10" max="100" step="10" className="browser-default" /></div>
                        <div>Altura: <input type="range"  min="10" max="100" step="10" className="browser-default" /></div>
                    </fieldset>
                </div>
            </div>
        </section>
        ;
    }
}
export default Back
