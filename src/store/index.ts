import actionsReducer from './actionsReducer';
import createSagaMiddleware from 'redux-saga';
import { 
  legacy_createStore as createStore,
  combineReducers, 
  applyMiddleware
} from 'redux';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  actionsReducer
})

export const store = createStore(rootReducer, undefined, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)
