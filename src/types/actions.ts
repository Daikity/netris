export interface Zone {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface VideoAction {
  timestamp: number;
  duration: number;
  zone: Zone;
}

export interface ActionReducers {
  actionsReducer: ActionState;
}

export interface ActionReducer {
  type: string;
  payload: VideoAction[];
}

export interface ActionState {
  actions: VideoAction[];
}
