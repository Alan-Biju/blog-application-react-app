import React, { useState } from 'react';
import { CreatePostcontainer, PostTitleBar, Input, Button } from './CreatePost';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

const SignIn = () => {
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
		auth.signInWithEmailAndPassword(Email, Password)
			.then((data) => {
				console.log(`signed In ${ data }`);
				history.push('/post');
			}).catch((error) => {
				console.log(error);
            setError(error.message);
				
			})
		setEmail('');
		setPassword('');
		

		
		
	};
	return (
		<>
			<CreatePostcontainer>
				<PostTitleBar>Sign In</PostTitleBar>
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
							name='Email'
							maxLength='150'
							value={Password}
							onChange={changePassword}
							required
						/>
					</Input>
				</InputContainers>
				<Button type='submit' onClick={submit}>
					Sign In
				</Button>
				<Link to='/SignUp' style={{ textDecoration: 'none', color: 'black' }}>
					<Reroute>Need to Sign Up ? </Reroute>
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
export const Error = styled.p`
	color: red;
	font-size: 0.9rem;
	letter-spacing: 1px;
	padding: 5px;
	font-weight:600;
`;
export default SignIn;
