import React, { useState, useEffect } from 'react'
import axios from "../axios";
import "./Row.css";
import movieTrailler from "movie-trailer"
import Youtube from "react-youtube"

const baseImgUrl = "https://image.tmdb.org/t/p/original";



function Row({ title, fetchUrl,isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])
    
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
          autoplay: 1,
        },
      };

    const handleClick = async (movie) => {
    if (trailerUrl) {
        setTrailerUrl("");
    } else {
        // movieTrailler(movie?.name || "")
        // .then((url) => {
        //     const urlParams = new URLSearchParams(new URL(url).search) ;
        //     setTrailerUrl(urlParams.get("v"));
        //     console.log(trailerUrl);
        // })
        // .catch((err) => console.log(err));
        let trailerurl = await axios.get(
            `/movie/${movie.id}/videos?api_key=f965fdfdb0f9c4541f7d2b26eceb3ae0`
          );
          setTrailerUrl(trailerurl.data.results[0]?.key);
    }
    };
    console.log(trailerUrl);

    return (
        <div className ="row">
            <h2 className="title">{title}</h2>
            <div className="row__posters">
            {movies.map(
                (movie) =>
                movie.backdrop_path !== null && (
                <img
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${baseImgUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path }`}
                    alt={movie.name}
                    key={movie.id}
                    onClick={() => handleClick(movie)}
                />
                )
             )}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
