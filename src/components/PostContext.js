import React, { createContext, useState, useEffect } from 'react';
export const PostContext = createContext();
export default function PostProvider(props) {
	var data = localStorage.getItem('myData');

	const [id, setId] = useState(data);
	useEffect(() => {
		localStorage.clear('myData');

		localStorage.setItem('myData', id);
	}, [id]);

	return (
		<>
			<PostContext.Provider value={[id, setId]}>
				{props.children}
			</PostContext.Provider>
		</>
	);
}
