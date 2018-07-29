import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import WebFont from "webfontloader";
import registerServiceWorker from './registerServiceWorker';

WebFont.load({
    google: {
      families: ["Open Sans:300,400,500,700,800:cyrillic,greek,latin-ext"]
    },
    timeout: 2000
  });

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
