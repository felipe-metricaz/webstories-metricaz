import React, { Component } from "react";
import { useState } from 'react';

class DynamicInput extends React.Component {
    render() {
        return <div>
        {(() => {
            switch (this.props.input.type) { 
              case 'text':
                return <label>
                <input name={this.props.input.name} value={this.props.input.value} onChange={this.props.input.change} placeholder={this.props.input.placeholder} type="text" />
                </label>
              case 'textarea':
                return <label>
                <textarea name={this.props.input.name} onChange={this.props.input.change} placeholder={this.props.input.placeholder} cols="30" rows="10">{this.props.input.value}</textarea>
                </label>
              case 'upload':
                return <label>
                <input name={this.props.input.name} id={this.props.input.name} onChange={this.props.input.change} type="file" />
                </label>
              default:
                return null
            }
        })()}
        </div>
    }
}

export default DynamicInput;