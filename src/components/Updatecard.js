import React, { useContext, useState, useEffect } from 'react';
import {
	CreatePostcontainer,
	PostTitleBar,
	InputContainer,
	Input,
	Button,
} from './CreatePost';
import db from '../firebase';
import { PostContext } from './PostContext';

import { useHistory } from 'react-router-dom';

const UpdateCard = ({userId}) => {
	let history = useHistory();
	// eslint-disable-next-line no-unused-vars
	const [ids, setId] = useContext(PostContext);

	const passItems = (Details) => {
		setTitle(Details.Title);
		setContent(Details.Content);
		setDescription(Details.Description);
	};
	useEffect(() => {
		const postRef = db
			.collection('user')
			.doc(userId)
			.collection('posts')
			.doc(ids);
		postRef.get().then((post) => {
			const data = post.data();
			passItems(data);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ids]);

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
	const submit = () => {
	try {
			const postRef = db
				.collection('user')
				.doc(userId)
				.collection('posts')
				.doc(ids);
			let payload = { Title, Content, Description };
			postRef
				.update(payload)
				.then((doc) => {
					console.log('updated');
				})
				.catch((error) => {
					console.log(error);
				});
			history.push('/card');
			clear();
	} catch (error) {
		console.log(error);
			history.push('/card');

	}
	};
	return (
		<>
			<CreatePostcontainer>
				<PostTitleBar>Edit Post</PostTitleBar>
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
							type='textarea'
							name='Description'
							value={Description}
							onChange={changeDescription}
						/>
					</Input>
				</InputContainer>
				<Button type='submit' onClick={submit}>
					Edit
				</Button>
			</CreatePostcontainer>
		</>
	);
};
export default UpdateCard;
