import * as React from "react";
import * as ReactDOM from "react-dom";
// @TODO _ REDUX IN NEXT MILESTONE
// import { Provider } from "react-redux";
// import store from "./reducers";
import { Routes, DynamicRoute } from "./routes";
import { green, grey } from '@material-ui/core/colors';

import "./global.scss";
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


export default function App(props: any) {
	return(
		<div>
			<div className="container">
				<Container routes={props.routes} />
			</div>
		</div>
	);
}

const theme: Theme = createMuiTheme({
    palette: {
        primary: {
            main: green[500],
        },
        secondary: {
            main: grey[50],
        },
    },
});
function Container(props: any) {
	return props.routes.map((route: any) => <DynamicRoute key={route.path} { ...route }/>);
}

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<Routes />
	</ThemeProvider>
	,
	document.getElementById("app")
);
