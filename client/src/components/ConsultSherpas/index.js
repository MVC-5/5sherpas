import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import "./style.css";
import mainKnot from "../../assets/main-knot.png";
import sherpa1 from "../../assets/sherpa1.png";
import sherpa3 from "../../assets/sherpa3.png";
import sherpa5 from "../../assets/sherpa5.png";
import yak1 from "../../assets/yak1.png";

import bubble1 from "../../assets/bubble-1.png";
import bubble2 from "../../assets/bubble-2.png";
import bubble3 from "../../assets/bubble-3.png";
import bubble4 from "../../assets/bubble-4.png";
import API from "../../utils/API";

let physAct = "";
let mentalAct = "";

function ConsultSherpas() {
  const [bubble2Text, setBubble2Text] = useState(
    "Click on me to get a physical activity suggestion"
  );
  const [bubble1Text, setBubble1Text] = useState(
    "Click on me to get a mental activity suggestion"
  );
  const [movieList, setMovieList] = useState([]);
  const [genre, setGenre] = useState(null);
  // const [physList, setPhysList] = useState([]);
  // const [mentalList, setMentalList] = useState([]);

  // this is a mess
  async function getMovie(movieGenre) {
    if (movieList.length && movieGenre === genre) {
      const randomIndex = Math.floor(Math.random() * movieList.length);
      return movieList[randomIndex];
    } else {
      // this is running every time :(
      setGenre(movieGenre);
      await API.getMovieSugg(movieGenre).then((res) => {
        setMovieList(res.data);
        console.log(res);
        const randomIndex = Math.floor(Math.random() * res.data.length);
        const movie = res.data[randomIndex];
        // this is returning
        return movie;
      });
    }
  }

  function handleSherpaClick(id) {
    console.log(id);
    if (id === "Josh") {
      const newMovie = getMovie("Action");
      console.log(newMovie);
    }

    if (id === "Jon") {
      API.getPhysActSugg().then((res) => {
        // console.log(res.data[Math.floor(Math.random()*res.data.length)+1].name)
        physAct =
          res.data[Math.floor(Math.random() * res.data.length) + 1].name;
        setBubble2Text(physAct);
        console.log(physAct);
      });
    }

    if (id === "Caleb") {
      API.getMentalActSugg().then((res) => {
        mentalAct =
          res.data[Math.floor(Math.random() * res.data.length) + 1].name;
        setBubble1Text(mentalAct);
        console.log(mentalAct);
      });
    }
  }
  return (
    <>
      <h1 className="header">consult a sherpa</h1>
      <div className="knot-container">
        <Grid columns={3} stackable id="sherpa-set">
          <Grid.Column>
            <Grid.Row className="consult-container">
              {/* mental act sherpa */}
              <div className="bubble-container">
                <img className="bubble" src={bubble1} alt="bubble" />

                <p className="bubble-text">{bubble1Text}</p>
              </div>
              <img
                onClick={(e) => handleSherpaClick(e.target.id)}
                aria-hidden="true"
                className="consult-sherpa"
                id="Caleb"
                src={sherpa5}
                alt="sherpa5"
              />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column>
            <Grid.Row className="consult-container">
              <div className="bubble-container">
                <img className="bubble" src={bubble2} alt="bubble" />

                <p className="bubble-text">{bubble2Text}</p>
              </div>
              {/* phyiscal act sherpa */}
              <img
                aria-hidden="true"
                onClick={(e) => handleSherpaClick(e.target.id)}
                className="consult-sherpa"
                id="Jon"
                src={sherpa1}
                alt="sherpa1"
              />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column>
            <Grid.Row className="consult-container">
              <div className="bubble-container">
                <img className="bubble" src={bubble3} alt="bubble" />

                <p className="bubble-text">Content</p>
                {/* <p>{bubble3Text}</p> */}
              </div>
              {/* movie sherpa */}
              <img
                aria-hidden="true"
                onClick={(e) => handleSherpaClick(e.target.id)}
                className="consult-sherpa"
                id="Josh"
                src={sherpa3}
                alt="sherpa3"
              />
            </Grid.Row>
          </Grid.Column>
        </Grid>

        <div className="yak-container">
          <img className="bubble-4" src={bubble4} alt="bubble" />
          <img
            onClick={(e) => handleSherpaClick(e.target.id)}
            aria-hidden="true"
            className="yak-img"
            src={yak1}
            id="PC Yak"
            alt="yak1"
          />
        </div>
        <div>
          <img id="second-knot" src={mainKnot} alt="knot-logo" />
        </div>
      </div>
    </>
  );
}

export default ConsultSherpas;
