import { all, takeEvery, put, call } from 'redux-saga/effects';
import { VideoAction } from '../types/actions';
import { setActions } from './actionsReducer';
import constants from '../constants';

const fetchActions = (): Promise<Response> => fetch(constants.ACTIONS_URL)

function* getActionData(): Generator<any, VideoAction[], any> {
  const data = yield call(fetchActions)
  const json = yield call(() => new Promise(res => res(data.json())));

  yield put(setActions(json))

  return json
}

function* watchActionData() {
  yield takeEvery('FETCH_ACTIONS', getActionData);
}

export default function* rootSaga() {
  yield all([
    watchActionData()
  ]);
}
