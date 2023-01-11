import { BtnStyle } from './Button.styled';
import PropTypes from 'prop-types';

export const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <BtnStyle type="button" onClick={onLoadMore}>
      Load More
    </BtnStyle>
  );
};
LoadMoreBtn.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
