import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

export default class TomatoToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            displayName: "",
            description: "",
            price: 0
        };
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleOpen = () => {
        this.setState({displayName: ""});
        this.setState({description: ""});
        this.setState({price: 0});

        this.setState({open: true});
    };
    
    handleCancel = () => {
        this.setState({open: false});
    };

    handleAdd = () => {
        this.setState({open: false});

        let _this = this;

        const reader = new FileReader();

        reader.onloadend = function() {
            const buf = window.buffer.Buffer(reader.result)

            window.ipfs.files.add(buf, (err, result) => {
                if(err) {
                    console.error('Error sending file to IPFS: ', err);
                    return;
                }

                let url = result[0].hash
                console.log("IPFS url: https://ipfs.io/ipfs/" + url)

                let _url = url

                window.contract.addTomato(
                    _this.state.displayName, 
                    _this.state.description, 
                    _this.state.price,
                    0,
                    _url,
                    { from: window.signedInUser }, 
                    function (error, result) {
                        if (error) {
                            alert("Error while adding tomato: " + error)
                        }
                    }
                );
            })
        } 
    
        const photo = document.getElementById("fileInput");
        reader.readAsArrayBuffer(photo.files[0]);
    };

    render() {
        const dialogStyle = {
            width: '600px'
          };

        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleCancel}
            />,
            <FlatButton
              label="Add"
              primary={true}
              disabled={false}
              onClick={this.handleAdd}
            />,
          ]

        return (
        <Toolbar>
            <ToolbarGroup firstChild={true}>
                <RaisedButton label="Add Tomato" primary={true} onClick={this.handleOpen} />
                <Dialog
                    title="Add Tomato"
                    actions={actions}
                    contentStyle={dialogStyle}
                    modal={true}
                    open={this.state.open}
                >
                    <TextField name="displayName" hintText="Title" value={this.state.displayName} onChange={this.handleChange}/>
                    <br />
                    <TextField name="description" hintText="Description" value={this.state.description} onChange={this.handleChange}/>
                    <br />
                    <TextField name="price" hintText="Price" value={this.state.price} onChange={this.handleChange}/>
                    <br />
                    <input id="fileInput" type="file" ref={(ref) => this.upload = ref} style={{ display: 'none' }} />
                    <br />
                    <RaisedButton
                        label="Pick photo"
                        onClick={(e) => this.upload.click() }
                    >
                    </RaisedButton>
                </Dialog>
            </ToolbarGroup>
        </Toolbar>
        );
    }
}