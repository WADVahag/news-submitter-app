import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Popup } from './components/Popup';
import newsReducer from "./reducers/newsReducer";
import store from "./store";

store.dispatch({
  type: "ADD_NEW", payload: {
    id: 2,
    title: "Lorem ipsum 222222222222222222222222",
    description: "Lorem ipsum aveli shat lorem ipsum22222222222222222222222222222222222222222",
    created_at: (new Date()),
    published: false
  }
});

store.dispatch({
  type: "ADD_NEW", payload: {
    id: 3,
    title: "Lorem ipsum 33333",
    description: "Lorem ipsum aveli shat lorem ipsum 3333",
    created_at: (new Date()),
    published: false
  }
});

store.dispatch({
  type: 'PUBLISH',
  payload: { id: 2 }
})

console.log("news:", store.getState());

let userpassword = '';
let usernameLogin = '';
let canModifyNews = false;
let loggedin = false;

export default function App() {

  const [popupOpened, SetPopupOpened] = useState(false);



  const checkUser = () => {
    usernameLogin = document.getElementById('login').value;
    userpassword = document.getElementById('password').value;
    alert(usernameLogin);

    if (usernameLogin == 'admin' && userpassword == '123456') {
      canModifyNews = true;
      loggedin = true;

    } else if (usernameLogin == 'guest' && userpassword == '121212') {
      canModifyNews = false;
      loggedin = true;
    } else {
      canModifyNews = false;
      loggedin = false;
    }


  }




  const getUser = () => {

    if (usernameLogin == undefined) {
      return 'Гость';
    } else {
      return usernameLogin;
    }

  }

  const togglePopup = () => {
    SetPopupOpened(() => !popupOpened);
  };




  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Главная  </Link>
            </li>
            <li>
              <Link to="/news">Новости</Link>
            </li>
            <li>
              <button onClick={() => togglePopup()}>Вход/Выход</button>
            </li>
          </ul>
        </nav>
        {popupOpened && <Popup innerCloser={togglePopup} checkUser={checkUser} />}
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/news" component={News} />
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home username={getUser()} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


function addNews() {
  store.dispatch({
    type: "ADD_NEW", payload: {
      id: store.getState()[store.getState().length - 1].id + 1,
      title: document.getElementById('newTitle').value,
      description: document.getElementById('newDescription').value,
      created_at: (new Date()),
      published: false
    }
  })
}
function Home(props) {

  if (loggedin === true) {
    return (
      <div>
        <h2> "Привет, {props.username}", </h2>
        <input id='newTitle' type='text' />
        <hr />
        <textarea id='newDescription'></textarea>
        <hr />
        <button onClick={addNews}> Add New News</button>
      </div>
    );
  } else {

    return <h2> Привет,Гость PLease sign in to see teh news username/password = 'admin/123456' for admin and 'guest/121212' for user </h2>;
  }
}

function News() {

  if (loggedin === true) {
    if (canModifyNews === true) {

      return (store.getState().map((news) => {

        return <div >
          Title : <input type="text" value={news.title} />
           Text : <textarea>{news.description}</textarea>
          <button onClick={() => {

            store.dispatch({
              type: 'DELETE_NEWS',
              payload: { id: news.id }
            })
            alert('deleted go fpr pther link and come back to see the changes');
          }}> DELETE</button>
          <button onClick={() => {
            store.dispatch({
              type: 'PUBLISH',
              payload: { id: news.id }
            })
            alert('Published go fpr pther link and come back to see the changes');
          }}> PUBLISH</button>
        </div >
      }))

    } else {
      // return <h2> Hello user here are the news </h2>;
      return (store.getState().map((news) => {

        return <div >
          Title : <input type="text" value={news.title} />
           Text : <textarea>{news.description}</textarea>
           Published: {news.published == true ? 'yes' : 'no'}
        </div>
      }))
    }
  } else {
    return <h2> PLease sign in to see teh news username/password = 'admin/123456' for admin and 'guest/121212' for user </h2>;
  }



}

function Users() {
  return <h2>Users</h2>;
}

