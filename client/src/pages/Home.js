import NewSideBar from "../components/NewSideBar";
import ChingLogo from '../Ching-logos/Ching-logos_black.png'
import '../styles/Home.css'

export default function Home() {
    return (
        <>
            <NewSideBar />
            <div className="homeContainer">
                <div className='imageContainer'>
                    <img src={ChingLogo} height={512} width={512}/>
                </div>
                <div className='textContainer'>
                    <h1 style={{color: '#e00000'}}>Welcome to Ching</h1>   
                    <h2 style={{color: '#e00000'}}>A place where Asian Americans can communicate </h2>
                    <h3 style={{color: '#e00000'}}>Supporting Mobile, Web, and Desktop Application! </h3>
                </div>

            </div>
        </>
    )
}