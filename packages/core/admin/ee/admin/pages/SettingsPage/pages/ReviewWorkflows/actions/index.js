import {
  ACTION_SET_WORKFLOWS,
  ACTION_SET_WORKFLOW,
  ACTION_DELETE_STAGE,
  ACTION_ADD_STAGE,
  ACTION_UPDATE_STAGE,
} from '../constants';

export function setWorkflows({ status, data }) {
  return {
    type: ACTION_SET_WORKFLOWS,
    payload: {
      status,
      workflows: data,
    },
  };
}

export function setWorkflow(data) {
  return {
    type: ACTION_SET_WORKFLOW,
    payload: {
      data,
    },
  };
}

export function deleteStage(stageId) {
  return {
    type: ACTION_DELETE_STAGE,
    payload: {
      stageId,
    },
  };
}

export function addStage(stage = {}) {
  return {
    type: ACTION_ADD_STAGE,
    payload: stage,
  };
}

export function updateStage(id, payload) {
  return {
    type: ACTION_UPDATE_STAGE,
    payload: {
      id,
      data: payload,
    },
  };
}
