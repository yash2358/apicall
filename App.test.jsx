import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {describe,test,expect} from 'vitest'
import countReducer, { increment, decrement } from './countReducer';
import App from './App';

import { JSDOM } from 'jsdom';
const jsdom = new JSDOM();
global.document = jsdom.window.document;
global.window = jsdom.window;
global.navigator = {
  userAgent: 'node.js',
};

const renderWithRedux = (
  component,
  { initialState, 
    store = configureStore({ reducer: { count: countReducer }, 
      preloadedState: initialState }) } = {}    ) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('Counter App', () => {
  test('displays initial count', () => {
    renderWithRedux(<App />, { initialState: { count: 0 } });
    expect(screen.getByRole('heading',{name:"Counter Application"})).toBeInTheDocument();
  });

  test('displays initial count', () => {
    renderWithRedux(<App/>, { initialState: { count: 0 } });
    expect.concurrent(screen.getByText('0')).toBeInTheDocument();
  });
  test('displays increment button', () => {
    renderWithRedux(<App />, { initialState: { count: 0 } });
    expect(screen.getByText('Increment')).toBeInTheDocument();
  });
  test('displays decrement button', () => {
    renderWithRedux(<App />, { initialState: { count: 0 } });
    expect(screen.getByText('Decrement')).toBeInTheDocument();
  });

  test('increments', () => {
    const { store } = renderWithRedux(<App />, { initialState: { count: 0 } });
    fireEvent.click(screen.getByText('Increment'));
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
