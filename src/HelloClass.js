import React, { Component } from 'react'

class HelloClass extends React.Component{
    render(){
        return (
            <div>
                <h1>Hai, {this.props.name} a.k.a {this.props.heroName}</h1>
                {this.props.children}
            </div>
        );
    }
}

export default HelloClass