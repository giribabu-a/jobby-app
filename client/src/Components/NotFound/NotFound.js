import './NotFound.css';

const NotFound = ()=> {
    return(
        <div className='not-found-container'>
            <img className='not-found-image'
                src='https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png' alt='not found'>

            </img>
            <h1 className='not-found-heading'>
                Page Not Found
            </h1>
            <p className='not-found-text'>
                We are sorry, the page you are requested could not be found
            </p>
        </div>
    )
};

export default NotFound;