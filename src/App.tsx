import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Home from './components/Home/Home';
import Posts from './components/Posts/Posts';
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import PostDetails from './containers/Posts/PostDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/posts' component={Posts} exact/>
          {/*  :id is the URL Param */}
          <Route path='/posts/:id' component={PostDetails}/> 
        </Switch>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
