import styled from 'styled-components';
import React, { useContext, useState, useEffect } from 'react';
import { PostContext } from './PostContext';
import { PostContainer, TitleBar } from './Posts';
import db from '../firebase';
import { auth } from '../firebase';


const CardDetails = ({userId}) => {
	// eslint-disable-next-line no-unused-vars
	const [ids, setId] = useContext(PostContext);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const passItems = (Details) => {
		setTitle(Details.Title);
        setContent(Details.Description);
	};
	useEffect(() => {
	auth.onAuthStateChanged((user) => {
		if (user) {
			const postRef = db
				.collection('user')
				.doc(user.uid)
				.collection('posts')
				.doc(ids);
			postRef.get().then((post) => {
				const data = post.data();
				passItems(data);
			});
		} else {
			
		}
	});
	});
	return (
		<CardDetailsContainer>
			<CardDetailsTitle>{title}</CardDetailsTitle>
			<CardDetail>
                <Details>{ content}</Details>
			</CardDetail>
		</CardDetailsContainer>
	);
};

const CardDetailsContainer = styled(PostContainer)``;
const CardDetailsTitle = styled(TitleBar)`
	font-size: 1.2rem;
	font-weight: 600;
	padding-left: 6px;
`;
const CardDetail = styled.div`
	width: 100%;
	font-family: 'Raleway', sans-serif;
	padding: 20px 0 0 10px;
	height: 80vh;
`;
const Details = styled.p`
	font-size: 1rem;
	letter-spacing: 1px;
	line-height: 25px;

	p {
		margin-top: 5px;
	}
`;
export default CardDetails;
