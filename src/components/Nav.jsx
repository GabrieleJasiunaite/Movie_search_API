import { useState } from "react";
import ModalFavs from "./ModalFavs";

const Nav = ({ favorites }) => {
    const [favoritesModal, setFavoritesModal] = useState(undefined);
    favoritesModal !== undefined ? document.body.classList.add('active-modal') : document.body.classList.remove('active-modal');

    return (
        <>
            <div className="favorites">
                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="tmdb logo" />
                <button className='favorites-list' onClick={() => setFavoritesModal(!favoritesModal)}>Favorites</button>
            </div>
            {favoritesModal && (
                <ModalFavs favoriteMovies={favorites} toggleModal={() => setFavoritesModal(undefined)} />
            )}
        </>
    );
};

export default Nav;