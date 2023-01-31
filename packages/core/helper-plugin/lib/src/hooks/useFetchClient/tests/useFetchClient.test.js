import { renderHook } from '@testing-library/react-hooks';

import useFetchClient from '../index';

function setup() {
  return renderHook(() => useFetchClient());
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
