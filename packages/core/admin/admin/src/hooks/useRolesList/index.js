import { useEffect, useReducer, useCallback } from 'react';
import { useFetchClient, useNotification } from '@strapi/helper-plugin';
import get from 'lodash/get';
import init from './init';
import reducer, { initialState } from './reducer';

const useRolesList = (shouldFetchData = true) => {
  const toggleNotification = useNotification();
  const [{ roles, isLoading }, dispatch] = useReducer(reducer, initialState, () =>
    init(initialState, shouldFetchData)
  );

  const fetchClient = useFetchClient();

  useEffect(() => {
    if (shouldFetchData) {
      fetchRolesList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchData]);

  const fetchRolesList = useCallback(async () => {
    try {
      dispatch({
        type: 'GET_DATA',
      });

      const {
        data: { data },
      } = await fetchClient.get('/admin/roles');

      dispatch({
        type: 'GET_DATA_SUCCEEDED',
        data,
      });
    } catch (err) {
      const message = get(err, ['response', 'payload', 'message'], 'An error occured');

      dispatch({
        type: 'GET_DATA_ERROR',
      });

      if (message !== 'Forbidden') {
        toggleNotification({
          type: 'warning',
          message,
        });
      }
    }
    // TODO: remove when we evaluate the need of the useCallback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleNotification]);

  return { roles, isLoading, getData: fetchRolesList };
};

export default useRolesList;
