import { AnyAction } from 'redux';
import { DECREMENT_PART, INCREMENT_PART, ADD_PART } from '../../actions/parts';

// import { v4 as uuid } from 'uuid';

const initialState = [
  {
    name: 'Wheel',
    amount: 0,
  },
  {
    name: 'Chasis',
    amount: 0,
  },
  {
    name: 'Engine',
    amount: 0,
  },
  {
    name: 'Windshield',
    amount: 0,
  },
];

const schoolsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case INCREMENT_PART: {
      const newState = state.map(item =>
        item.name === action.partName
          ? { ...item, amount: item.amount + 1 }
          : item
      );
      return newState;
    }
    case DECREMENT_PART: {
      const newState = state.map(item =>
        item.name === action.partName
          ? { ...item, amount: Math.max(item.amount - 1, 0) }
          : item
      );
      return newState;
    }
    case ADD_PART: {
      return [...state, { name: action.partName, amount: 0 }];
    }
    default:
      return state;
  }
};

export default schoolsReducer;
