import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
//CSS
import './Loading.css';

function Loading (){
	return (
		<SkeletonTheme color="#ada1a1" highlightColor="#cec3c3">
			<div className="LoadingContainer">
				<Skeleton width={200} height={200} />
				<div className="LoadingDataContainer">
					<Skeleton width={200} />
					<Skeleton width={300} />
					<Skeleton width={300} />
				</div>
			</div>
		</SkeletonTheme>
	);
}

export default Loading;
