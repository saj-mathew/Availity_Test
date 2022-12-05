import React, { Component } from 'react';

export class Lisp extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    handleSubmit(event) {
        event.preventDefault();
        //alert(`Selected file - ${this.fileInput.current.files[0].name}`);

        

        fetch('https://localhost:5001/api/CheckLisp', {
            method: 'POST',
            body: JSON.stringify({
                body: this.state.value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((response) => response.json()).then((result) => {
            console.log('Success:', result);
            alert("Result : " + result);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Text:
          <input type="text" placeholder="Input Text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
