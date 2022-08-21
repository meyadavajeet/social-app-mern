import React from 'react'
import Feed from '../../components/feed/Feed';
import Leftbar from '../../components/leftbar/Leftbar';
import Rightbar from '../../components/rightbar/Rightbar';
import Topbar from '../../components/topbar/Topbar';
import './home.css';
// import HomeIcon from '@mui/icons-material/Home';
// import MenuIcon from '@mui/icons-material/Menu';


const Home = () => {
    return (
        <>
            {/* <HomeIcon/>
            <MenuIcon/> */}
            <Topbar />
            <div className="homeContainer">
                <Leftbar />
                <Feed />
                <Rightbar />
            </div>
        </>
    )
}

export default Home