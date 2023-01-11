import { InfinitySpin } from 'react-loader-spinner';
import Box from 'components/Box/Box';

const Loader = () => {
  return (
    <Box marginLeft="auto" marginRight="auto">
      <InfinitySpin
        height="280"
        width="280"
        radius="29"
        color="red"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </Box>
  );
};

export default Loader;
// npm install react-loader-spinner --save
