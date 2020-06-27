import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    };

    altSideDrawer = (prevState) => {
        this.setState({
            showSideDrawer: !prevState
        });
    };

    render() {
        return(
            <Aux>
                 <Toolbar toggleSideDrawer={() => {this.altSideDrawer(this.state.showSideDrawer)}}/>
                 <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                 <main className={classes.Content}>
                   {this.props.children}
                 </main>
            </Aux >
    
        );
    }
       
}

export default Layout;