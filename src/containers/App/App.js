import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import * as types from './types';
import Section from '../../components/Section/Section';
import Header from '../../components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

const hideNews = (objectID, dispatch) => {
  dispatch({ type: types.HIDE_NEWS, objectID });
};

const handleMore = (activePage, dispatch) => {
  dispatch({ type: types.GET_NEWS_API_CALL_REQUEST, page: activePage + 1 });
};

const handleUpVote = (objectID, dispatch) => {
  dispatch({ type: types.UP_VOTE, objectID });
};

const handleGotoFirst = (dispatch) => {
  dispatch({ type: types.GET_NEWS_API_CALL_REQUEST, page: 0 });
};

const App = () => {
  // eslint-disable-next-line no-shadow
  const state = useSelector(state => state.app.toJS());
  const dispatch = useDispatch();
  const { fetching, data, activePage } = state;
  
  useEffect(() => {
    dispatch({ type: types.GET_NEWS_API_CALL_REQUEST, page: 0 });
  }, []);

  return (
    <div className="app">
      <Header onClick={() => handleGotoFirst(dispatch)} />

      <Section
        activePage={activePage}
        dispatch={dispatch} 
        fetching={fetching} 
        data={data} 
        handleUpVote={handleUpVote} 
        handleGotoFirst={handleGotoFirst} 
        hideNews={hideNews} 
        handleMore={handleMore}/>

    </div>
  );
};

export default App;
