import React from 'react';
// import BackgroundImage from 'react-background-image';

import placeholder from './images/bgone.png';
// import hdImage from './images.jpg';
const Home = () => {
return (
	<div className='container' style={{ height: '100%' }}>
		<div className= "mainhead">
			<h1>Welcome to ToDo List</h1>
		</div>
	
		<div style= {{'text-align': 'center'}}>
			<img src={placeholder}/> 
		</div>
		
	</div>
);
};

export default Home;


/* <BackgroundImage
        placeholder={placeholder}
        src={hdImage}
        className='myCustomClass'
      >
        <p className='some-class'>Other element</p>
      </BackgroundImage> */