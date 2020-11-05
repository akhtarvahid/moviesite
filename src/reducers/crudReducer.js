import {
  LIST_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM,
  CHECKED_ITEM, ALL_CHECKED, DELETE_ITEMS
} from "../actions/types";
let initialState = {
  lists: [],
  item: {}
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_ITEMS:
      return {
        ...state,
        lists: action.payload
      };
    case ADD_ITEM:
      return {
        ...state,
        lists: [...state.lists, action.payload],
        item: { ...state.item, loading: false }
      };
    case UPDATE_ITEM:
      let update = state.lists.map(list =>
        list.id === action.payload.id ? action.payload : list
      );
      return {
        ...state,
        lists: update,
        item: { ...state.item, loading: false }
      };
    case DELETE_ITEM:
      let filtered = state.lists.filter(({ id, ...rest }) => id !== action.payload.id);
      return {
        ...state,
        lists: filtered,
        item: { ...state.item, loading: false }
      }
    case CHECKED_ITEM:
      let checked = state.lists
      checked.forEach(list => {
        if (list.title === action.payload.itemName)
          list.completed = action.payload.checked
      })
      return {
        ...state,
        lists: checked,
        item: { ...state.item, loading: false }
      }
    case ALL_CHECKED:
      let _list = state.lists
      _list.forEach(list => {
        list.completed = action.payload;
      })
      return {
        ...state,
        lists: _list,
        item: { ...state.item, loading: false }
      }
    case DELETE_ITEMS:
      let all = state.lists.filter(list => list.completed !== true)
      return {
        ...state,
        lists: all,
        item: { ...state.item, loading: false }
      }
    default:
      return state;
  }
}
