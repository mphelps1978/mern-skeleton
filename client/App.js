import React from 'react';
import MainRouter from './MainRouter'
import { BrowserRouter as Router} from 'react-router-dom'
import { hot } from 'react-hot-loader'

import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </Router>
   );
}

export default hot(module)(App)