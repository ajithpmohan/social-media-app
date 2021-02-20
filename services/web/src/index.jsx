import ReactDOM from 'react-dom';

import ApolloProvider from 'ApolloProvider';
import reportWebVitals from 'reportWebVitals';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import 'semantic-ui-css/semantic.min.css';

TimeAgo.addDefaultLocale(en);

ReactDOM.render(ApolloProvider, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
