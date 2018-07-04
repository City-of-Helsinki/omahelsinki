import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
    render() {
        return (
            <main>
                {/*<Header/>*/}
                {this.props.children}
                {/*<Footer/>*/}
            </main>
        );
    }
}

export default connect()(App);
