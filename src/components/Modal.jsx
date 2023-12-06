import './Modal.css';

const Modal = ({ movieDetails, toggleModal, isLoading, error }) => {

    return (
        <>
            {isLoading && <div className="load-error"><h3>Loading...</h3></div>}
            {error && <div className="load-error"><h3>{error}</h3></div>}
            <div className='modal'>
                <div onClick={toggleModal} className='overlay'></div>
                <div className='modal-content'>
                    <h4>Movie Details: {movieDetails.original_title}</h4>
                    <p><strong>Runtime: </strong>{movieDetails.runtime} mins</p>
                    <p><strong>Genres: </strong>{movieDetails.genres.map(genre => genre.name + " ")}</p>
                    <p><strong>Box Office: </strong>{(movieDetails.revenue / 1000000).toFixed(2)} mln.</p>
                    <p><strong>Plot: </strong>{movieDetails.overview}</p>
                    <p><strong>Rating: </strong>{movieDetails.vote_average}</p>
                    <p><strong>Vote Count: </strong>{movieDetails.vote_count}</p>

                    <button className='close-modal' onClick={toggleModal}>&#10006;</button>
                </div>
            </div>
        </>
    );
};

export default Modal;