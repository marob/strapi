import { current, original, produce } from 'immer';
import isEqual from 'lodash/isEqual';

import {
  ACTION_SET_WORKFLOWS,
  ACTION_SET_WORKFLOW,
  ACTION_DELETE_STAGE,
  ACTION_ADD_STAGE,
} from '../constants';

export const initialState = {
  status: 'loading',
  serverState: {
    currentWorkflow: null,
    workflows: [],
  },
  clientState: {
    currentWorkflow: { data: null, isDirty: false },
    workflows: [],
  },
};

export function reducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ACTION_SET_WORKFLOWS: {
        draft.status = action.payload.status;

        if (action.payload.workflows) {
          const workflows = [...state.serverState.workflows, ...action.payload.workflows];

          draft.serverState.workflows = workflows;
          draft.serverState.currentWorkflow = workflows[0];
          draft.clientState.currentWorkflow.data = workflows[0];
        }
        break;
      }

      case ACTION_SET_WORKFLOW: {
        const { data } = action.payload;

        draft.serverState.workflows = state.serverState.workflows.map((workflow) =>
          workflow.id === data.id ? data : workflow
        );
        break;
      }

      case ACTION_DELETE_STAGE: {
        const { stageId } = action.payload;
        const { currentWorkflow } = state.clientState;

        draft.clientState.currentWorkflow.data = {
          ...currentWorkflow.data,
          stages: currentWorkflow.data.stages.filter(
            (stage) => stage?.id ?? stage.__temp_key__ !== stageId
          ),
        };

        draft.clientState.currentWorkflow.isDirty = !isEqual(
          current(draft.clientState.currentWorkflow).data,
          state.clientState.currentWorkflow.data
        );

        break;
      }

      case ACTION_ADD_STAGE: {
        const { currentWorkflow } = state.clientState;

        draft.clientState.currentWorkflow.data = {
          ...currentWorkflow.data,
          stages: [
            ...currentWorkflow.data.stages,
            {
              __temp_key__: state.clientState.currentWorkflow.data.stages.length + 1,
              name: '',
            },
          ],
        };

        draft.clientState.currentWorkflow.isDirty = !isEqual(
          current(draft.clientState.currentWorkflow).data,
          state.clientState.currentWorkflow.data
        );

        break;
      }

      default:
        break;
    }
  });
}
