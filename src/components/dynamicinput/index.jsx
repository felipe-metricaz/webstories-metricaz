import React, { Component } from "react";
import { useState } from 'react';

class DynamicInput extends React.Component {

    constructor({type,name,value,placeholder,change,state}) {
        super();
        this.state = {
            type: type,
            name: name,
            value: state.webstorie.cover.titulo,
            placeholder: placeholder,
            change: change
        };
        console.log('aaa');
    }



    render() {

        return <div>
        {(() => {
            switch (this.state.type) { 
              case 'text':
                return <label>
                <input name={this.state.name} value={this.state.value} onChange={this.state.change} placeholder={this.state.placeholder} type="text" />
                </label>
              case 'textarea':
                return <label>
                <textarea name={this.state.name} onChange={this.state.change} placeholder={this.state.placeholder} cols="30" rows="10">{this.state.value}</textarea>
                </label>
              case 'upload':
                return <label>
                <input name={this.state.name} id={this.state.name} onChange={this.state.change} type="file" />
                </label>
              default:
                return null
            }
        })()}
        </div>
    }
}

export default DynamicInput;