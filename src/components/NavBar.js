import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';

import { FaEdit, FaBook } from 'react-icons/fa';
const NavBar = ({ users }) => {
	const history = useHistory();

	const signOut = () => {
		auth
			.signOut()
			.then((data) => {
				history.push('/');
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<>
			<NavContanier>
				<Link
					to='/card'
					style={{
						textDecoration: 'none',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						color: ' black',
					}}>
					<NavIconsBox>
						<p>Posts</p>
						<FaBook size={18} style={{ color: '#635a5a' }} />
					</NavIconsBox>
				</Link>

				<Link
					to='/post'
					style={{
						textDecoration: 'none',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						color: ' black',
					}}>
					<NavIconsBox>
						<p>Create post</p>
						<FaEdit className='icon' size={18} style={{ color: '#635a5a' }} />
					</NavIconsBox>
				</Link>
				{users ? (
					<NavIconsOut onClick={signOut}>
						<h5>SignOut</h5>
					</NavIconsOut>
				) : (
					<NavIconsOut color='#0084ff'>
						<Link
							to='/'
							style={{
								textDecoration: 'none',
								height: '100%',
								display: 'flex',
								alignItems: 'center',
								color: 'inherit',
							}}>
							<h5>Sign In</h5>
						</Link>
					</NavIconsOut>
				)}
			</NavContanier>
		</>
	);
};
const NavContanier = styled.div`
	width: 85%;
	margin: 0 auto;
	background-color: #d3cece;
	height: 7vh;
	margin-top: 2vh;
	display: flex;
	align-items: center;
	justify-self: flex-start;
`;
const NavIconsBox = styled.div`
	background-color: #f6f6f6;
	width: 200px;
	height: 100%;
	margin-right: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease-in;
	cursor: pointer;

	p {
		margin-right: 5px;
	}
	&:hover {
		color: #f6f6f6;
		background-color: #0084ff;
	}
`;
const NavIconsOut = styled(NavIconsBox)`
	margin-left: auto;
	margin-right: 0;
	color: ${(props) => props.color || 'red'};
	&:hover {
		background-color: ${(props) => props.color || 'red'};
		color: white;
	}
`;

export default NavBar;
