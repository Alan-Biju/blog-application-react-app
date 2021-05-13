import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PostContext } from './PostContext';
import  db  from '../firebase'
const Card = ({ data,userId }) => {
	// eslint-disable-next-line no-unused-vars
	const [id, setId] = useContext(PostContext);
	const setPostId = () => {
		setId(data.id);
	};
	const remove = () => {
		db.collection('user').doc(userId).collection('posts').doc(data.id).delete();
}
	return (
		<>
			<CardContainer>
				<CardTitle>
					<div>
						<h5>{data.Title}</h5>
						<LinkContanier>
							<Link
								to={`/posts/${data.id}`}
								style={{
									textDecoration: 'none',
									height: '100%',
									display: 'flex',
									alignItems: 'center',
									color: '#0084ff',
								}}
								onClick={setPostId}>
								<p>Read Full</p>
							</Link>
							<Link
								to={`/update/${data.id}`}
								style={{
									textDecoration: 'none',
									height: '100%',
									display: 'flex',
									alignItems: 'center',
									color: '#0084ff',
								}}
								onClick={setPostId}>
								<p>Edit</p>
							</Link>
							<Delete onClick={remove}>Delete</Delete>
						</LinkContanier>
					</div>
					<Content>{data.Content}</Content>
				</CardTitle>
			</CardContainer>
		</>
	);
};
const CardContainer = styled.div`
	width: 100%;
	height: 150px;
	max-height: 150px;
	padding-top: 30px;
	background-color: #f6f6f6;
	border: 1px solid rgba(0, 0, 0, 0.2);
	margin-top: 10px;
`;
const CardTitle = styled.div`
	width: 100%;
	font-family: 'Raleway', sans-serif;
	padding: 0 0 0 10px;

	div {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 15px;
		padding: 0 10px;
		
		p {
			text-decoration: none;
		}
	}
	h5 {
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 1px;
		padding-bottom: 10px;
	}
`;
const Content = styled.p`
	font-size: 0.9rem;
	letter-spacing: 1px;
	font-weight: 400;
	line-height: 25px;
	margin-left: 10px;
`;
const LinkContanier = styled.div`
	display:flex;
	align-items:center;
	width:250px;
	font-size:0.9rem;	

`;
const Delete = styled(Content)`
	text-decoration: none;
	color: #0084ff;
	cursor: pointer;
`;

export default Card;
