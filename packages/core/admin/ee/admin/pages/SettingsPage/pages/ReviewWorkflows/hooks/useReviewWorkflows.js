import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useFetchClient, useNotification } from '@strapi/helper-plugin';

const QUERY_KEY = 'review-workflows';

export function useReviewWorkflows(workflowId) {
  const { get, put } = useFetchClient();
  const toggleNotification = useNotification();

  async function fetchWorkflows() {
    // eslint-disable-next-line no-unreachable
    try {
      return [
        {
          id: 1,
          stages: [
            {
              id: 1,
              name: `Something ${Math.random()}`,
            },
          ],
        },
      ];

      const {
        data: { data },
      } = await get(`/admin/review-workflows/workflows/${workflowId ?? ''}?populate=stages`);

      return data;
    } catch (err) {
      return null;
    }
  }

  async function updateRemoteWorkflow(payload) {
    return {
      id: 1,
      stages: [
        {
          id: 1,
          name: 'Something',
        },
      ],
    };

    try {
      const {
        data: { data },
      } = await put(`/admin/review-workflows/workflows/${payload.id}`, payload);

      return data;
    } catch (err) {
      return null;
    }
  }

  function updateWorkflow(payload) {
    return workflowUpdateMutation.mutateAsync(payload);
  }

  const workflows = useQuery([QUERY_KEY, workflowId ?? 'default'], fetchWorkflows);

  const workflowUpdateMutation = useMutation(updateRemoteWorkflow, {
    async onError() {
      toggleNotification({
        type: 'error',
        message: { id: 'notification.error', defaultMessage: 'An error occured' },
      });
    },

    async onSuccess() {
      toggleNotification({
        type: 'success',
        message: { id: 'notification.success.saved', defaultMessage: 'Saved' },
      });
    },
  });

  return {
    workflows,
    updateWorkflow,
  };
}
