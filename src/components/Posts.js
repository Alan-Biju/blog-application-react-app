import React, { useEffect, useState } from 'react';
import Card from './Card';
import styled from 'styled-components';
import db from '../firebase';
import { useHistory } from 'react-router-dom';

const Posts = ({ userId }) => {
	const history = useHistory();
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		/* const postRef = db.collection('posts');
		postRef.get()
			.then((posts) => {
			posts.forEach((post) => {
				let { id } = post;
				let data = post.data();
				const payload = { id, ...data };
				setPosts((posts) => [...posts, payload]);
			});
		}); */
		try {
			db.collection('user')
				.doc(userId)
				.collection('posts')
				.onSnapshot( (datas) => {
					let posts =  datas.docs.map((data) => {
						const value = data.data();
						let { id } = data;
						const payload = { id, ...value };

						return payload;
					});
					setPosts(posts);
				});
		} catch (error) {
			history.push('/');
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);

	return (
		<>
			<PostContainer>
				<TitleBar>
					<Title>Posts</Title>
				</TitleBar>
				{posts.map((data, idx) => {
					return <Card data={data} userId={userId} key={idx} />;
				})}
			</PostContainer>
		</>
	);
};
export const PostContainer = styled.div`
	width: 100%;
	max-width: 85vw;
	height: fit-content;
	margin: 0 auto;
	font-family: 'Raleway', sans-serif;
	margin-top: 5%;
	background-color: #d3cece;
`;
export const TitleBar = styled.div`
	width: 100%;
	height: 50px;
	background-color: #fcfcfc;
	display: flex;
	align-items: center;
	border: 1px solid rgba(0, 0, 0, 0.2);
`;
const Title = styled.p`
	font-size: 1.5rem;
	font-weight: 600;
	letter-spacing: 1px;
	padding: 0 0 0 10px;
`;

export default Posts;
