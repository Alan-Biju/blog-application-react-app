import React, { useState } from 'react';
import styled from 'styled-components';
import { PostContainer, TitleBar } from './Posts';
import db from '../firebase';
import { useHistory } from 'react-router-dom';

const CreatePost = ({ userId }) => {
	let history = useHistory();

	const [Title, setTitle] = useState('');
	const [Content, setContent] = useState('');
	const [Description, setDescription] = useState('');
	const changeTitle = (e) => {
		setTitle(e.target.value);
	};
	const changeContent = (e) => {
		setContent(e.target.value);
	};
	const changeDescription = (e) => {
		setDescription(e.target.value);
	};

	const clear = () => {
		setTitle('');
		setContent('');
		setDescription('');
	};
	const submits = (e) => {
		try {
			e.preventDefault();
			const postRef = db.collection('user').doc(userId).collection('posts');
			let payload = { Title, Content, Description};
			postRef
				.add(payload)
				.then((doc) => {
					console.log(doc.id);
					history.push('/card');
				})
				.catch((error) => {
					console.log(error);
					history.push('/');
				});

			clear();
		} catch (error) {
			console.log(error);
			history.push('/');
		}
	};
	return (
		<>
			<CreatePostcontainer>
				<PostTitleBar>Create Post</PostTitleBar>
				<InputContainer>
					<Input>
						<label htmlFor='Title'>Title</label>
						<input
							type='text'
							name='Title'
							value={Title}
							onChange={changeTitle}
							required
						/>
					</Input>
					<Input>
						<label htmlFor='Content'>Context</label>
						<input
							type='text'
							name='Content'
							maxLength='150'
							value={Content}
							onChange={changeContent}
							required
						/>
					</Input>
					<Input>
						<label htmlFor='Description'>Description</label>
						<textarea
							type='text'
							name='Description'
							rows='10'
							value={Description}
							onChange={changeDescription}
						/>
					</Input>
				</InputContainer>
				<Button onClick={submits}>Post</Button>
			</CreatePostcontainer>
		</>
	);
};

export const CreatePostcontainer = styled(PostContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
export const PostTitleBar = styled(TitleBar)`
	padding-left: 5px;
	font-weight: 600;
`;
export const InputContainer = styled.div`
	width: 80%;
	height: 50vh;
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-direction: column;
`;
export const Input = styled.div`
	width: 100%;
	padding-left: 10%;
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	height: fit-content;
	label {
		margin-bottom: 5px;
	}
	input {
		width: 100%;
		height: 30px;
		outline: none;
		border-radius: 5px;
		border: none;
		transition-duration: 169ms;
		font-size: 1rem;
		padding: 5px;
		&:hover {
			border: 2px solid #00fff2;
		}
	}
	&:last-child {
		textarea {
			outline: none;
			border-radius: 5px;
			border: none;
			transition-duration: 169ms;
			font-size: 1rem;
			height: 100px;
			width: 100%;
			padding: 5px;

			&:hover {
				border: 2px solid #00fff2;
			}
		}
	}
`;

export const Button = styled.button`
	width: 100px;
	height: 30px;
	margin: 0 0 20px 0;
	background-color: #0084ff;
	color: #ffffff;
	border: none;
	font-size: 1rem;
	font-family: 600;
	font-family: 'Raleway', sans-serif;
	transition-duration: 169ms;
	border-radius: 5px;
	cursor: pointer;
	&:hover {
		background-color: #ffffff;
		color: #0084ff;
	}
`;
export default CreatePost;
