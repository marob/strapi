import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import useFetchClient from '../index';

function setup(props) {
  return new Promise((resolve) => {
    act(() => {
      resolve(
        renderHook(() => useFetchClient(), {
          wrapper: ({ children }) => <div {...props}>{children}</div>,
        })
      );
    });
  });
}

describe('useFetchClient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should contain the get, del, put, post methods', async () => {
    const { result } = await setup();

    expect(result.current).toHaveProperty('get');
    expect(result.current).toHaveProperty('post');
    expect(result.current).toHaveProperty('put');
    expect(result.current).toHaveProperty('del');
  });
});
