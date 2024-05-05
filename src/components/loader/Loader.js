import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top:'0',
          left: 0,
          bottom:'200px',
          right: '200px',
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign:'center'
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function Loader() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}

// import React, { Component } from "react";
// const divStyle = {
//     textAlign: 'center'
//   };
// const Loader =({...props}) => {
//     const {alttext,imageUrl,height,width,alignment} = props
//     return(
//         <> 
//             <div style={divStyle }>
//                 <img
//                 alt={alttext}
//                 src={imageUrl}
//                 height={height}
//                 width={width}
//                 align={alignment}
//                 />
//             </div>
//        </>
//     )
// }

// export default Loader;