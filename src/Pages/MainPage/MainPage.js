import { useState, useEffect, Fragment } from 'react';
import './MainPage.css';
import Repo from '../../Components/Repo/Repo';
function MainPage (){
	const [ TotalRepos, SetTotalRepos ] = useState([]);
	const [ PageNo, SetPageNo ] = useState(1);
	const [ Error, SetError ] = useState(false);
	useEffect(
		() =>
			fetch(
				`https://api.github.com/search/repositssssssories?q=created:>2017-10-22&sort=stars&order=desc&page=${PageNo}`
			)
				.then(response => response.json())
				.then(data => {
					console.log('data ', data);
					if (data.message === 'Not Found') {
						SetError(true);
					} else {
						SetError(false);
						SetTotalRepos(prev => [ ...prev, ...data.items ]);
					}
				})
				.catch(error => {
					SetError(true);
				}),
		[]
	);
	if (Error) {
		return <h1>An Unexpected Error has occured , please check your internet connectivity and refresh the page</h1>;
	} else {
		return <Fragment>{TotalRepos.length > 0 ? TotalRepos.map((item, key) => <Repo key={key} />) : null}</Fragment>;
	}
}
export default MainPage;
