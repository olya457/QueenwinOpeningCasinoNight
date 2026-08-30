/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const {View} = require('react-native');
  return {
    GestureHandlerRootView: ({children}: {children: React.ReactNode}) => <View>{children}</View>,
  };
});

jest.mock('react-native-webview', () => {
  const React = require('react');
  const {View} = require('react-native');
  return {
    WebView: () => <View />,
  };
});

jest.mock('@react-navigation/native', () => {
  const React = require('react');
  return {
    NavigationContainer: ({children}: {children: React.ReactNode}) => <>{children}</>,
  };
});

jest.mock('@react-navigation/native-stack', () => {
  const React = require('react');
  return {
    createNativeStackNavigator: () => ({
      Navigator: ({children}: {children: React.ReactNode}) => <>{children}</>,
      Screen: ({children, component: Component}: any) => {
        if (typeof children === 'function') {
          return children({});
        }
        return Component ? <Component navigation={{navigate: jest.fn(), replace: jest.fn(), popToTop: jest.fn()}} route={{params: {}}} /> : null;
      },
    }),
  };
});

jest.mock('@react-navigation/bottom-tabs', () => {
  const React = require('react');
  return {
    createBottomTabNavigator: () => ({
      Navigator: ({children}: {children: React.ReactNode}) => <>{children}</>,
      Screen: ({component: Component}: any) =>
        Component ? <Component navigation={{navigate: jest.fn(), replace: jest.fn(), popToTop: jest.fn()}} route={{params: {}}} /> : null,
    }),
  };
});

import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
