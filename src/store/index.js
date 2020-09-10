import { createStore } from "redux";

import newsReducer from "../reducers/newsReducer";

const store = createStore(newsReducer);

console.log(
    store
);

export default store;