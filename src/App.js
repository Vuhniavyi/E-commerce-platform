import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import 'antd/dist/antd.css';
import 'axios-progress-bar/dist/nprogress.css';
import Routes from './router/routes';

const buttonTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#00acc1',
      secondary: '#2dff46'
    }
  }
});

const App = () => {
  return (
    <MuiThemeProvider theme={buttonTheme}>
      <div className="App">
        <Routes />
      </div>
    </MuiThemeProvider>
  );
};

export default App;
