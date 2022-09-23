/* eslint-disable no-undef */
import 'jest-environment-jsdom';
import { gateway } from '@services/gateways';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { getServerSideProps } from '@pages/gateways/[id]';

describe('getServerSideProps', () => {
  const server = setupServer(
    // capture "GET /gateways" requests
    rest.get(gateway.GET_GATEWAY(1), (req, res, ctx) => {
      // respond using a mocked JSON body
      return res(
        ctx.json({
          id: 1,
          name: 'Metamask',
          ip: '125.254.2.18',
          createdAt: '2022-09-22T21:03:29.197Z',
        })
      );
    })
  );

  it('should call gateway api', async () => {
    server.listen();
    const response = await getServerSideProps({ params: { id: 1 } });
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          data: {
            id: 1,
            name: 'Metamask',
            ip: '125.254.2.18',
            createdAt: '2022-09-22T21:03:29.197Z',
          },
        },
      })
    );
    server.close();
  });
});
