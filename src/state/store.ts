import { useDispatch } from "react-redux";
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";
import {
  AnyAction,
  combineReducers,
  createStore,
  legacy_createStore,
  applyMiddleware,
} from "redux";
import { ThunkDispatch, thunk } from "redux-thunk";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

export const useAppDispatch = useDispatch<AppDispatchType>;

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
