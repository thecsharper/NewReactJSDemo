import axios from 'axios';
import React, { Component } from 'react';

export class FormDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Put form values here
            // Bootstrap elements: https://getbootstrap.com/docs/4.3/components/forms/
            nameQuery: '(name)',
            ageQuery: '(age)',
            oneQuery: '(one)',
            twoQuery: '(two)',
            threeQuery: '(three)',
            selectedFile: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onFileChange = event => {
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
    };

    onFileUpload = () => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "files",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
       
        for (var [key, value] of formData.entries()) {
            console.log(key, value);
        }
        
        console.log("Selected file: " + this.state.selectedFile);

        axios.post("upload/UploadFile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "text/plain",
            },
        })
    };

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        alert('A name was submitted: '
            + this.state.nameQuery
            + this.state.ageQuery
            + this.state.oneQuery
            + this.state.twoQuery
            + this.state.threeQuery
            + this.state.selectedFile
        );
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>React Form</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" className="form-control" name="nameQuery" value={this.state.nameQuery} onChange={this.handleChange} /><br />
                    </div>
                    <div className="form-group">
                        <label>Age:</label>
                        <input type="text" className="form-control" name="ageQuery" value={this.state.ageQuery} onChange={this.handleChange} /><br />
                    </div>
                    <div className="form-group">
                        <label>One:</label>
                        <input type="text" className="form-control" name="oneQuery" value={this.state.oneQuery} onChange={this.handleChange} /><br />
                    </div>
                    <div className="form-group">
                        <label>Two:</label>
                        <input type="text" className="form-control" name="twoQuery" value={this.state.twoQuery} onChange={this.handleChange} /><br />
                    </div>
                    <div className="form-group">
                        <label>Three:</label>
                        <input type="text" className="form-control" name="threeQuery" value={this.state.threeQuery} onChange={this.handleChange} /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleDataList" className="form-label">Datalist example</label>
                        <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
                        <datalist id="datalistOptions">
                            <option value="San Francisco" />
                            <option value="New York" />
                            <option value="Seattle" />
                            <option value="Los Angeles" />
                            <option value="Chicago" />
                        </datalist>
                    </div>
                    <div className="form-group">
                        <label htmlFor="formFileMultiple" className="form-label">Multiple files input example</label>
                        <input className="form-control" type="file" id="formFileMultiple" multiple onChange={this.onFileChange} />
                    </div>
                    <div className="form-group">
                        <br />
                        <button type="submit" className="btn btn-primary" value="Submit" onClick={this.onFileUpload}>Submit!</button>
                    </div>
                </form>
            </div>
        );
    }
}