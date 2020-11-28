import { useState, useEffect, Fragment } from 'react';
import './MainPage.css';
import Repo from '../../Components/Repo/Repo';
function MainPage (){
	const [ TotalRepos, SetTotalRepos ] = useState([]);
	const [ Error, SetError ] = useState(false);
	let PageNo = 1;

	useEffect(() => {
		ApiRequest();
		window.addEventListener('scroll', FetchMore);
		return () => window.removeEventListener('scroll', FetchMore);
	}, []);

	function FetchMore (){
		if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
			PageNo++;
			ApiRequest();
		}
	}

	const ApiRequest = () => {
		console.log(PageNo, ' ??????????????????????????');
		fetch(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${PageNo}`)
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
			});
	};
	if (Error) {
		return <h1>An Unexpected Error has occured , please check your internet connectivity and refresh the page</h1>;
	} else {
		return (
			<ul className="ReposList pt-5 pl-5 pr-5">
				{TotalRepos.length > 0 ? (
					TotalRepos.map((item, key) => (
						<Repo
							key={key}
							name={item.name}
							description={item.description}
							stars={item.stargazers_count}
							issues={item.open_issues_count}
							userName={item.owner.login}
							img={item.owner.avatar_url}
						/>
					))
				) : null}
			</ul>
		);
	}
}
export default MainPage;
