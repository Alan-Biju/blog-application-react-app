import React, { useState } from 'react';
import { CreatePostcontainer, PostTitleBar, Input, Button } from './CreatePost';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import styled from 'styled-components';
import { Error } from './SignIn';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
	const history = useHistory();
	const [Email, setEmail] = useState('');
	const [Password, setPassword] = useState('');
	const [error, setError] = useState('');
	const changeEmail = (e) => {
		setEmail(e.target.value);
	};
	const changePassword = (e) => {
		setPassword(e.target.value);
	};
	const submit = (e) => {
		auth
			.createUserWithEmailAndPassword(Email, Password)
			.then((data) => {
				setEmail('');
				setPassword('');
				history.push('/post');
			})
			.catch((error) => {
				setError(error.message);
			});
	};
	return (
		<>
			<CreatePostcontainer>
				<PostTitleBar>Sign Up</PostTitleBar>
				<Error>{error}</Error>

				<InputContainers>
					<Input>
						<label htmlFor='Email'>Email</label>
						<input
							type='Email'
							name='Email'
							value={Email}
							onChange={changeEmail}
							required
						/>
					</Input>
					<Input>
						<label htmlFor='Passsword'>Password</label>
						<input
							type='Passsword'
							name='Password'
							maxLength='150'
							value={Password}
							onChange={changePassword}
							required
						/>
					</Input>
				</InputContainers>
				<Button type='submit' onClick={submit}>
					Sign Up
				</Button>
				<Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
					<Reroute>Need to Sign In ? </Reroute>
				</Link>
			</CreatePostcontainer>
		</>
	);
};
const InputContainers = styled.div`
	width: 50%;
	height: 25vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
const Reroute = styled.p`
	font-size: 1rem;
	letter-spacing: 1px;
	padding: 10px;
	cursor: pointer;
	&:hover {
		color: blue;
	}
`;
export default SignUp;
