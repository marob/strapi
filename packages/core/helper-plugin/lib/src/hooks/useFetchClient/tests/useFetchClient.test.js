import React, { useEffect } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useFetchClient } from '@strapi/helper-plugin';

jest.mock('@strapi/helper-plugin', () => ({
  ...jest.requireActual('@strapi/helper-plugin'),
  useFetchClient: jest.fn().mockReturnValue({
    get: jest.fn().mockResolvedValue({
      data: {
        results: [
          { id: 2, name: 'newest', publishedAt: null },
          { id: 1, name: 'oldest', publishedAt: null },
        ],
        pagination: { page: 1, pageCount: 10 },
      },
    }),
    post: jest.fn(),
    put: jest.fn(),
    del: jest.fn(),
  }),
}));

const TestComponent = (props) => {
  const { get } = useFetchClient();
  useEffect(() => {
    get('/foo');
  }, [get]);

  // eslint-disable-next-line react/prop-types
  return <div {...props}>{props.children}</div>;
};

function setup(props) {
  return new Promise((resolve) => {
    act(() => {
      resolve(
        renderHook(() => useFetchClient(), {
          wrapper: ({ children }) => <TestComponent {...props}>{children}</TestComponent>,
        })
      );
    });
  });
}

describe('useFetchClient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should contain the get, del, put, post methods and call once the GET method even when we rerender the Component', async () => {
    const { result, rerender } = await setup();

    expect(result.current).toHaveProperty('get');
    expect(result.current).toHaveProperty('post');
    expect(result.current).toHaveProperty('put');
    expect(result.current).toHaveProperty('del');

    expect(result.current.get).toHaveBeenCalledTimes(1);

    rerender();

    expect(result.current.get).toHaveBeenCalledTimes(1);
  });
});
