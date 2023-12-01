import React from 'react';
import ReactDOM from 'react-dom';
import RestrauSignUp from './RestrauSignUp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RestrauSignUp />, div);
  ReactDOM.unmountComponentAtNode(div);
});