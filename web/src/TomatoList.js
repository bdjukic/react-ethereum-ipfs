import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import FlatButton from 'material-ui/FlatButton';
import './TomatoList.css';

class TomatoList extends Component {
    constructor(context) {
      super();
    }
  
    state = {
      tomatoes: []
    }


    getTomatoes() {
        let _this = this;

        var tomatoData = []

        _this.setState({
            tomatoes: tomatoData
        })

        window.contract.getTomatoCount({ from: window.signedInUser }, function (error, result) {
            var tomatoCount = result.c[0];

            for (var i = 0; i < tomatoCount; i++) {
                window.contract.getTomato(i, { from: window.signedInUser }, function (error, result) {
                    if (result != null) {
                        tomatoData.push({ displayName: result[0], description: result[1], price: result[2], photoIpfsHash: result[3] })
                            _this.setState({tomatoes: tomatoData})
                    }
                });
            }
        });
  }

  componentWillMount() {
    this.getTomatoes()
  }

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
        label="Done"
        primary={true}
        disabled={false}
        onClick={this.handleDone}
      />,
    ]

    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 500,
        height: '100%',
        overflowY: 'auto',
      },
    };

    let tomatoes = this.state.tomatoes;
    const tomatoItems = []

    for (var i = 0; i < tomatoes.length; i++) {
      tomatoItems.push(
        <GridTile
          key={i}
          className="TomatoList"
          title={<b>{tomatoes[i].displayName}</b>}
          subtitle={tomatoes[i].description}
          actionIcon={<FlatButton 
            label="Order" 
            //onClick={(event) => this.orderTomato(tomatoId)}
            primary={true} />}>
        <img src={"https://ipfs.io/ipfs/" + tomatoes[i].photoIpfsHash} />
      </GridTile>
      );
    }

    return (
      <div style={styles.root}>
        <GridList
          cellHeight={200}
          style={styles.gridList}
          cols={2}
        >
          {tomatoItems}
        </GridList>
      </div>)
  }
}

export default TomatoList;
