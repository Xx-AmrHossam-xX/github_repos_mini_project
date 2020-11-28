import { useState, useEffect, Fragment } from 'react';
import './App.css';
import MainPage from './Pages/MainPage/MainPage';
function App (){
	const a = [ 1, 2, 3 ];
	const b = [ 4, 5 ];
	const [ abc, setabc ] = useState([]);
	return (
		<Fragment>
			<MainPage />
			<button className="btn btn-large btn-success" onClick={() => setabc(prev => [ ...prev, ...a ])}>
				Click me
			</button>
			<button className="btn btn-large btn-danger" onClick={() => setabc(prev => [ ...prev, ...b ])}>
				Click me
			</button>
			<ul>{abc ? abc.map((item, key) => <li key={key}>{item}</li>) : <li>Wait . . .</li>}</ul>
		</Fragment>
	);
}

export default App;
