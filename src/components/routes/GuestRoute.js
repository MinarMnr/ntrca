import * as React from 'react';
import {Redirect, Route} from "react-router-dom";
import Cookies from 'js-cookie';

const GuestRoute = ({component: Component, ...rest}) => {

	let accessToken = Cookies.get('access_token');

	return (
		<Route
			{...rest}
			render={props =>
				!accessToken ? (
					<Component {...props} />
				) : (
					<Redirect to='/portal/dashboard'/>
				)
			}
		/>
 	)

};

export default GuestRoute;