import { useState, useEffect, Fragment } from 'react';
//CSS
import './MainPage.css';
//COMPONENTS
import Repo from '../../Components/Repo/Repo';
import Loading from '../../Components/Loading/Loading';
import ErrorMsg from '../../Components/ErrorMsg/ErrorMsg';

function MainPage (){
	//VARIABLES
	const [ TotalRepos, SetTotalRepos ] = useState([]);
	const [ Error, SetError ] = useState(false);
	const [ loading, SetLoading ] = useState(true);
	let PageNo = 1;
	//COMPONENT DIDMOUNT AND UNMOUNT
	useEffect(() => {
		ApiRequest();
		window.addEventListener('scroll', FetchMore);
		return () => window.removeEventListener('scroll', FetchMore);
	}, []);

	function FetchMore (){
		if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
			SetLoading(true);
			PageNo++;
			ApiRequest();
		}
	}

	const ApiRequest = () => {
		fetch(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${PageNo}`)
			.then(response => response.json())
			.then(data => {
				if (data.message === 'Not Found') {
					SetError(true);
				} else {
					SetError(false);
					SetTotalRepos(prev => [ ...prev, ...data.items ]);
				}
				SetLoading(false);
			})
			.catch(error => {
				SetError(true);
				SetLoading(false);
			});
	};
	if (Error) {
		return <ErrorMsg />;
	} else {
		return (
			<ul className="ReposList pt-5 pl-5 pr-5">
				{TotalRepos.length > 0 ? (
					<Fragment>
						{TotalRepos.map((item, key) => (
							<Repo
								key={key}
								name={item.name}
								description={item.description}
								stars={item.stargazers_count}
								issues={item.open_issues_count}
								userName={item.owner.login}
								img={item.owner.avatar_url}
							/>
						))}
						{loading ? <Loading /> : null}
					</Fragment>
				) : null}
			</ul>
		);
	}
}
export default MainPage;
