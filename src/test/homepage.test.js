/* eslint-disable no-undef */
/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from '@pages/index';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ToastContextProvider from './../contexts/ToastContext';
import GlobalContextProvider from './../contexts/GlobalContext';
import { gateway } from '@services/gateways';

describe('Home with api', () => {
  const server = setupServer(
    // capture "GET /gateways" requests
    rest.get(gateway.GET_GATEWAYS, (req, res, ctx) => {
      // respond using a mocked JSON body
      return res(
        ctx.json([
          {
            id: 17,
            name: 'Metamask',
            ip: '125.254.2.18',
            createdAt: '2022-09-22T21:03:29.197Z',
          },
        ])
      );
    })
  );

  const renderHome = () => (
    <GlobalContextProvider>
      <ToastContextProvider>
        <Home />
      </ToastContextProvider>
    </GlobalContextProvider>
  );

  // reset any request handlers that are declared as a part of our tests
  // (i.e. for testing one-time error scenarios)
  afterEach(() => server.resetHandlers());

  it('renders home pages with the devices list', async () => {
    server.listen();
    render(renderHome());
    await waitFor(() => screen.getByText('Metamask'));
    server.close();
  });
  it('add gateway', async () => {
    server.listen();
    render(renderHome());
    await waitFor(() => screen.getByText('Metamask'));
    await waitFor(() => screen.getByText('Add Gateway'));
    fireEvent.click(screen.getByText('Add Gateway'));
    await waitFor(() => screen.getByText('New Gateway'));
    screen.findAllByPlaceholderText('Name').value = 'New device';
    screen.findAllByPlaceholderText('xxx.xxx.xxx.xxx').value = '10.210.1.1';
    fireEvent.click(screen.getByText('Add'));
    server.close();
  });
});
