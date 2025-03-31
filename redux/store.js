import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

// Import reducers
import healthReducer from './reducers/healthReducer';

// Combine all reducers into a single reducer (you can add more reducers as the app grows)
const rootReducer = combineReducers({
  health: healthReducer,
});

// Create Redux store
const store = createStore(rootReducer);

export default store;