import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/404';

import { rootReducer, RootState } from './reducers';

declare global {
    interface Window { __PRELOADED_STATE__: RootState; }
}

let preloadedState;

if(typeof window !== 'undefined') {
    preloadedState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;
}

const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk, createLogger()))

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/dashboard" component={Dashboard} />
                <Route component={NotFound} />
            </Switch>
        </Provider>
    );
}

export default App;