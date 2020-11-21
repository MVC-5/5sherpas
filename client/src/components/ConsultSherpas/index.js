import React, { useEffect, useState } from "react";
import { Grid, Dropdown, Icon } from "semantic-ui-react";
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

const movieGenres = [
  { key: 0, value: "Action", text: "Action" },
  { key: 1, value: "Adventure", text: "Adventure" },
  { key: 2, value: "Documentary", text: "Documentary" },
  { key: 3, value: "Comedy", text: "Comedy" },
  {
    key: 4,
    value: "Horror",
    text: "Horror",
  },
  {
    key: 5,
    value: "Family",
    text: "Family",
  },
  {
    key: 6,
    value: "Science Fiction",
    text: "Science Fiction",
  },
];

function ConsultSherpas() {
  const [bubble2Text, setBubble2Text] = useState(
    "It's time to move! Click on me if you are looking for something phyiscal."
  );
  const [bubble1Text, setBubble1Text] = useState(
    "Take care of the station master. I'll give you a mental activity suggestion."
  );
  const [bubble3Text, setBubble3Text] = useState(
    "Time to chill. Select a genre to get a movie."
  );

  const [yakText, setYakText] = useState("I'm a yak, click me!");

  const [genre, setGenre] = useState(null);
  const [physList, setPhysList] = useState([]);
  const [mentalList, setMentalList] = useState([]);
  const [yakList, setYakList] = useState([]);

  function getMovie(movieGenre) {
    API.getMovieSugg(movieGenre).then((res) => {
      console.log(res);
      const randomIndex = Math.floor(Math.random() * res.data.length);
      const movie = res.data[randomIndex];
      setBubble3Text(movie.title);
    });

    // }
  }

  useEffect(() => {
    if (genre !== null) {
      console.log("Genre changed");
      getMovie(genre);
    }
  }, [genre]);

  const getPhysical = () => {
    if (!physList.length) {
      API.getPhysActSugg().then((res) => {
        setPhysList(res.data);
        const randomIndex = Math.floor(Math.random() * res.data.length);

        const physAct = res.data[randomIndex].name;
        setBubble2Text(physAct);
        console.log(physAct);
      });
    } else {
      const randomIndex = Math.floor(Math.random() * physList.length);
      setBubble2Text(physList[randomIndex].name);
    }
  };

  const getMental = () => {
    if (!mentalList.length) {
      API.getMentalActSugg().then((res) => {
        setMentalList(res.data);
        const randomIndex = Math.floor(Math.random() * res.data.length);

        const mentalAct = res.data[randomIndex].name;
        setBubble1Text(mentalAct);
      });
    } else {
      const randomIndex = Math.floor(Math.random() * mentalList.length);
      setBubble1Text(mentalList[randomIndex].name);
    }
  };

  const yakQuote = () => {
    document.getElementById("closeYak").classList.remove("remove-yak-text");
    document.getElementById("bubble-4").classList.remove("remove-yak-text");
    document.getElementById("yakText").classList.remove("remove-yak-text");
    if (!yakList.length) {
      API.getYak().then((res) => {
        console.log(res.data);
        setYakList(res.data);
        const randomIndex = Math.floor(Math.random() * res.data.length);

        const yakQuote = res.data[randomIndex].quote;
        setYakText(yakQuote);
      });
    } else {
      const randomIndex = Math.floor(Math.random() * yakList.length);
      setYakText(yakList[randomIndex].quote);
    }
  };

  function handleSherpaClick(id) {
    switch (id) {
      // Third sherpa (green) getMovie
      case "Josh":
        // getMovie("Action");
        break;
      // first sherpa (purple) getMentalActivity
      case "Caleb":
        getMental();
        break;

      // second sherpa (blue) getPhysicalAct
      case "Jon":
        console.log("Jon");
        getPhysical();
        break;

      case "PC Yak":
        yakQuote();
        break;

      default:
        console.log("YAAAAAAAKKKK");
        break;
    }
  }

  function hideYakText() {
    document.getElementById("closeYak").classList.add("remove-yak-text");
    document.getElementById("bubble-4").classList.add("remove-yak-text");
    document.getElementById("yakText").classList.add("remove-yak-text");
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
                className="consult-sherpa sherpa-left"
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

                <p className="bubble-text">{bubble3Text}</p>

                {/* <p>{bubble3Text}</p> */}
              </div>
              {/* movie sherpa */}
              <Dropdown
                compact
                id="movie-dropdown"
                placeholder="Genre"
                search
                selection
                options={movieGenres}
                onChange={(event, data) => {
                  console.log(data);
                  setGenre(data.value);
                }}
              />
              <img
                aria-hidden="true"
                onClick={(e) => handleSherpaClick(e.target.id)}
                className="consult-sherpa sherpa-right"
                id="Josh"
                src={sherpa3}
                alt="sherpa3"
              />
            </Grid.Row>
          </Grid.Column>
        </Grid>

        <div className="yak-container">
          <Icon id="closeYak" name="close" onClick={hideYakText} />
          <img id="bubble-4" src={bubble4} alt="bubble" />
          <p id="yakText">{yakText}</p>
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
