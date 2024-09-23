import { ActionReducer, ActionState, VideoAction } from '../types/actions';

const initialState: ActionState = {
  actions: []
}

export default function actionsReducer(state: ActionState = initialState, action: ActionReducer): ActionState {
  switch (action.type) {
    case 'LOAD_ACTIONS':
      return {
        ...state,
        actions: [ ...action.payload ]
      };
    default:
      return state;
  }
};

export const setActions = (payload: VideoAction[]) => ({type: 'LOAD_ACTIONS', payload});
export const fetchActions = () => ({type: 'FETCH_ACTIONS'});
