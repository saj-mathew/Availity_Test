import React, { Component } from 'react';

export class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
        this.state = { insuranceData: [], loading: true };
    }

    handleSubmit(event) {
        event.preventDefault();
        //alert(`Selected file - ${this.fileInput.current.files[0].name}`);

        const formData = new FormData();

        formData.append('File', this.fileInput.current.files[0]);

        fetch('https://localhost:5001/api/FileUpload', {
            method: 'POST',
            body: formData,
        }).then((response) => response.json()).then((result) => {
            console.log('Success:', result);
            this.setState({ insuranceData: result, loading: false });
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    static renderTable(insuranceData) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>First and Last Name</th>
                        <th>Version</th>
                        <th>Insurance Company</th>
                    </tr>
                </thead>
                <tbody>
                    {insuranceData.map((d,i) =>
                        <tr key={i}>
                            <td>{d.userId}</td>
                            <td>{d.firstAndLastName}</td>
                            <td>{d.version}</td>
                            <td>{d.insuranceCompany}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    

    render() {
        let contents = this.state.loading
            ? <p><em>Upload csv file ...For Sample file please refer to project directory -> Sample_csv_docs </em></p>
            : FileUpload.renderTable(this.state.insuranceData);

        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload file:
          <input type="file" ref={this.fileInput} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            
                {contents}
            </div>
        );
    }
}