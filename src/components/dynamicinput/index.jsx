import React, { Component } from "react";

class DynamicInput extends React.Component {

    constructor({type,name,value,placeholder,change}) {
        super();
        //this.type = type;
        this.name = name;
        this.value = value;
        this.placeholder = placeholder;
        this.change = change;
    }

    type = 'text'; 
    name = null; 
    value = null;
    placeholder = null;
    change = null;


    render() {

        return <div>
        {(() => {
            console.log(this.type);
            switch (this.type) { 
              case 'text':
                return <label>
                <input name={this.name} value={this.name} onChange={this.change} placeholder={this.placeholder} type="text" />
                </label>
              default:
                return null
            }
        })()}
        </div>
    }
}

export default DynamicInput;