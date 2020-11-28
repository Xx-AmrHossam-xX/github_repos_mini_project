import { useState, useEffect, Fragment } from 'react';
import './Repo.css';
function Repo ({ name, description, stars, issues, userName, img }){
	return (
		<article className="RepoContainer mb-5">
			<img src={img} alt="Avatar" className="Avatar" />
			<div className="DataContainer ml-3">
				<h2>{name}</h2>
				<p>{description ? description : 'No description for this repo'}</p>

				<footer className="RepoFooter">
					<div>
						<div>Stars: {stars}</div>
						<div>Issues: {issues}</div>
					</div>
					<p>Submitted 30 days ago by {userName}</p>
				</footer>
			</div>
		</article>
	);
}
export default Repo;
