import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <main>
        {/*<Header/>*/}
        {this.props.children}
        {/*<Footer/>*/}
      </main>
    )
  }
}
let thisApp = connect()(App)

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  thisApp = hot(module)(App)
}

export default thisApp
