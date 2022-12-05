import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FileUpload } from './components/FileUpload';
import { Lisp } from './components/Lisp';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/fileupload' component={FileUpload} />
            <Route path='/Lisp' component={Lisp} />
      </Layout>
    );
  }
}
