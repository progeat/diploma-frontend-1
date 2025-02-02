import { Header } from '../header/header';
import styled from 'styled-components';

const Page = styled.main`
	margin: 0 auto;
	max-width: 1600px;
	min-width: 1000px;
	width: 100%;
	height: 100%;
	padding: 70px 0 20px;
`;

export const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<Page>{children}</Page>
		</>
	);
};
