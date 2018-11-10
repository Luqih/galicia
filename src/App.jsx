import React, { Component } from 'react';

import { getCustomers, createMerchant } from './api';

import ContentLoader from './components/ContentLoader';
import Pyme from './components/Pyme';
import First from './components/First';
import Second from './components/Second';
import Third from './components/Third';
import WithCamera from './components/WithCamera';
import Fourth from './components/Fourth';

class App extends Component {
  state = {
    component: 'camera',
    // component: 'pyme',
    firstFormData: null,
    loading: false,
  }

  changeComponent = (component) => {
    this.setState(() => ({ component }));
  }

  handleFirstForm = async () => {
    const form = document.querySelector('#FormIngreso');
    const data = new URLSearchParams(new FormData(form)).toString().split('&');
    const formattedData = data.reduce((acc, content) => {
      content = content.split('=');
      return { ...acc, [decodeURIComponent(content[0])]: decodeURIComponent(content[1]) };
    }, {});
    this.setState(() => ({ firstFormData: formattedData, loading: true }));
    const customers = await getCustomers();
    this.setState(() => ({ loading: false }));
    const customerExists = customers.findIndex(c => c.Doc_Number === `${formattedData.doc.split('.').join('')}`) > -1;
    this.changeComponent('second');
  }

  handlePymeForm = async () => {
    const form = document.querySelector('#FormIngresoDos');
    const data = new URLSearchParams(new FormData(form)).toString().split('&');
    let formattedData = data.reduce((acc, content) => {
      content = content.split('=');
      return { ...acc, [decodeURIComponent(content[0])]: decodeURIComponent(content[1]) };
    }, {});
    formattedData = [{
      Id: 1500,
      Name: 'SUPER',
      Category: 'Combustibles',
      Street_Name: 'AMADEO JACQUES',
      Street_Number: '957',
      City: 'GENERAL PAZ',
      State: 'CHACO',
      Zip: '7979',
      Lat: '-33.899568',
      Lng: '-11.272268',
    }];
    console.log(formattedData);
    // this.setState(() => ({ firstFormData: formattedData, loading: true }));
    const response = await createMerchant(formattedData);
    console.log(response);
    // this.setState(() => ({ loading: false }));
    // const customerExists = customers.findIndex(c => c.Doc_Number === `${formattedData.doc.split('.').join('')}`) > -1;
    // this.changeComponent('second');
  }

  render () {
    const { component, loading } = this.state;

    return (loading
      ? <ContentLoader />
      : component === 'first'
        ? <First handleSubmit={this.handleFirstForm} />
        : component === 'second'
          ? <Second changeComponent={this.changeComponent} />
          : component === 'third'
            ? <Third />
            : component === 'fourth'
              ? <Fourth />
              : component === 'camera'
                ? <WithCamera />
                : component === 'pyme'
                  ? <Pyme handleSubmit={this.handlePymeForm} />
                  : null
    );
  }
}

export default App;
