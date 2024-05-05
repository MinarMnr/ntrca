// core
import React, { Suspense } from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { siteRoutes } from "../../routes";
import GuestRoute from "../../components/routes/GuestRoute";
import ProgressBar from "react-topbar-progress-indicator";
import "./Site.scss";
const Content = () => {

	return (
		<main className="offer-area">
			<div className="container">
				<Suspense fallback={<ProgressBar />}>
					<Switch>
						{siteRoutes.map((route, idx) => {
							return route.component && (
								<GuestRoute
									key={idx}
									path={route.path}
									exact={route.exact}
									name={route.name}
									component={route.component}
								/>
							)
						})}
					</Switch>
				</Suspense>
			</div>
			<div className="offer-shape">
				<img src="/images/new/1.png" alt="Image" />
				<img src="/images/new/2.png" alt="Image" />
				<img src="/images/new/3.png" alt="Image" />
				<img src="/images/new/4.png" alt="Image" />
				<img src="/images/new/5.png" alt="Image" />
				<img src="/images/new/5.png" alt="Image" />
				<img src="/images/new/6.png" alt="Image" />
			</div>
		</main>
	);

};

export default Content;
