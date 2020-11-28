import { useState, useEffect, Fragment } from 'react';
import './MainPage.css';
import Repo from '../../Components/Repo/Repo';
function MainPage (){
	return (
		<Fragment>
			<h1>Main Page</h1>
			<Repo />
		</Fragment>
	);
}
export default MainPage;
