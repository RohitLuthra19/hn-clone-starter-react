import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import * as types from './types';
import { toBaseURL, getFormattedDate } from '../../common/utils';
import logo from '../../images/y18.gif';


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

const renderItems = (items, dispatch) => items.map((item, index) => (
  <div key={item.objectID} className={index % 2 === 0 ? 'app-section-even' : 'app-section-odd'}>
    <span className="app-section-comments">{item.num_comments}</span>
    <span className="app-section-points">
      {item.points}
      <span className="arrow-up" onClick={() => handleUpVote(item.objectID, dispatch)} role="button" onKeyUp={() => {}} tabIndex="0" />
    </span>
    <span>{item.title}</span>
    <span className="app-section-url">
      <a href={item.url}>
        (
        {toBaseURL(item.url)}
        )
      </a>
      {' '}
      by
    </span>
    <span className="app-section-author">{item.author}</span>
    <span className="app-section-date">{getFormattedDate(item.created_at)}</span>
    <span className="app-section-action">
    [
      <span onClick={() => hideNews(item.objectID, dispatch)} role="button" onKeyUp={() => {}} tabIndex="0" className="app-section-hide">hide</span>
    ]
    </span>
  </div>
));

const App = () => {
  // eslint-disable-next-line no-shadow
  const state = useSelector(state => state.app.toJS());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: types.GET_NEWS_API_CALL_REQUEST, page: 0 });
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="logo" className="app-header-logo" />
        <span className="app-header-top" onClick={() => handleGotoFirst(dispatch)} role="button" onKeyUp={() => {}} tabIndex="0">top</span>
        | new
      </header>
      <section className="app-section">
        {state.fetching ? (<div>Loading...</div>) : renderItems(state.data, dispatch)}
        {state.data.length !== 0
          ? (<div className="app-section-more" onClick={() => handleMore(state.activePage, dispatch)} role="button" onKeyUp={() => {}} tabIndex="0">More</div>)
          : (<div className="app-section-gotofirst" onClick={() => handleGotoFirst(dispatch)} role="button" onKeyUp={() => {}} tabIndex="0">Go to First</div>) }
      </section>
    </div>
  );
};

export default App;
