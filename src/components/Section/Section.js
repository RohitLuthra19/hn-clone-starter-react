import React from 'react';
import PropTypes from 'prop-types';
import './Section.scss';
import Button from '../Button/Button';
import TableRow from '../../components/TableRow/TableRow';

const renderTableRows = (items, dispatch, handleUpVote, hideNews) => items.map((item, index) => {
  const rowBgStyle = index % 2 === 0 ? 'even' : 'odd';
  return (
    <TableRow
      key={item.objectID}
      item={item}
      handleUpVote={handleUpVote}
      hideNews={hideNews}
      dispatch={dispatch}
      rowBgStyle={rowBgStyle}
    />
  );
});

const renderTableData = (items, dispatch, handleUpVote, hideNews) => (
  <div className="table-responsive">
    <table className="table">
      <tbody>
        {renderTableRows(items, dispatch, handleUpVote, hideNews)}
      </tbody>
    </table>
  </div>
);


const Section = (props) => {
  const {
    activePage, dispatch, data, fetching, handleMore, handleGotoFirst, handleUpVote, hideNews
  } = props;

  return (<section className="app-section">
            {fetching ? (<div>Loading...</div>) : renderTableData(data, dispatch, handleUpVote, hideNews)}
            {data.length !== 0
              ? (<Button variant="primary" onClick={() => handleMore(activePage, dispatch)} title="More" className="app-section-more" />)
              : (<Button variant="primary" onClick={() => handleGotoFirst(dispatch)} title="Go to First Page" className="app-section-gotofirstpage" />) }
          </section>);
};

Section.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Section;
