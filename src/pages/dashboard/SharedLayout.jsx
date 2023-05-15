import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styled from 'styled-components';
import BigSidebar from '../../components/BigSideBar';
import { useSelector, useDispatch } from 'react-redux';

const SharedLayout = () => {
  const { isSidebarOpen } = useSelector((store) => store.layoutSlice);
  return (
    <DashBoardContainer className='dashboard'>
      <BigSidebar />
      <Navbar />
      <Header />
      <DashboardPages>
        <Outlet />
      </DashboardPages>
    </DashBoardContainer>
  );
};
export default SharedLayout;

const DashBoardContainer = styled.main`
  display: grid;
  grid-template-rows: 9rem 1fr;
  height: 100vh;
 
overflow-y: hidden;
  grid-template-columns: [sidebar-start] minmax(min-content, max-content) [sidebar-gap]minmax(4rem, 1fr) [center-start] repeat(8, [col-start] minmax(min-content, 14rem) [col-end]) [center-end] minmax(4rem, 1fr) [end-margin];

  @media screen and (max-width: 200px) {
    grid-template-rows: 4rem max-content;
  }
  @media screen and (max-width: 760px) {
    grid-template-columns: [sidebar-start] minmax(min-content, max-content) [sidebar-gap]minmax(2rem, 1fr) [center-start] repeat(8, [col-start] minmax(min-content, 14rem) [col-end]) [center-end] minmax(4rem, 1fr) [end-margin];
  }
`;
const DashboardPages = styled.div`
  grid-row: 2/-1;
  grid-column: ${(props) => (props.isSidebarOpen ? 2 : 3)} / center-end;
  background-color: var(--backgroundColor);
 
  overflow-y: scroll;

  @media screen and (min-width: 200px) and (max-width: 1200px) {
    grid-column: 3 / center-end;
  }
`;

const Header = styled.header`
  grid-column: 1/-1;
  grid-row: 1/2;
  background-color: white;
`;
