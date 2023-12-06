import './Modal.css';

const ModalFavs = ({ favoriteMovies, toggleModal }) => {
    return (
        <div>
            <div className='modal'>
                <div onClick={toggleModal} className='overlay'></div>
                <div className='modal-content'>
                    <ul>
                        {favoriteMovies.length === 0 ? <li>You have no favorites</li> : favoriteMovies.map(movie => {
                            return <li key={movie.id}><img src={movie.src} alt={movie.title}></img>{movie.title}</li>
                        })
                        }
                    </ul>

                    <button className='close-modal' onClick={toggleModal}>&#10006;</button>
                </div>
            </div>
        </div>
    );
};

export default ModalFavs;