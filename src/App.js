import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Post from './components/Posts';
import CardDetails from './components/CardDetails';
import CreatePost from './components/CreatePost';
import NavBar from './components/NavBar';
import Updatecard from './components/Updatecard';
import PostProvider from './components/PostContext';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { auth } from './firebase';

import './App.css';

function App() {
	const [User, setUser] = useState(false);
	const [userId, setUserId] = useState('');

	auth.onAuthStateChanged((user) => {
		if (user) {
			setUser(true);
			setUserId(user.uid);
		} else {
			setUser(false);
			setUserId('');

		}
	});
	return (
		<div className='main-contanier'>
			<PostProvider>
				<Router>
					<NavBar users={User} />

					<Switch>
						<Route path='/' exact >
							<SignIn />
						</Route>
						<Route path='/SignUp' exact>
							<SignUp />
						</Route>
						<Route path='/post' exact>
							<CreatePost userId={userId} />
						</Route>
						<Route path='/card' exact>
							<Post userId={userId} />
						</Route>

						<Route path='/posts/:id'>
							<CardDetails userId={userId} />
						</Route>

						<Route path='/update/:id'>
							<Updatecard userId={userId} />
						</Route>
					</Switch>
				</Router>
			</PostProvider>
		</div>
	);
}

export default App;
