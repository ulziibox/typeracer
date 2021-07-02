import axios from "axios";
import { useEffect, useState, useContext, useRef } from "react";
import { CountdownContext } from "../../context/CountdownContext";
import TextContainer from "./WriteSection.style";
import Input from "../Input/Input";
import Countdown from "react-countdown";

const fetchQuote = () => {
  return axios
    .get("https://api.quotable.io/random")
    .then((res) => {
      const results = res.data;
      // console.log(results);
      return results;
    })
    .catch((err) => {
      console.error(err);
    });
};

const WriteSection = () => {
  const [quote, setQuote] = useState([]);
  const clockRef = useRef();
  const [isStarted, setIsStarted] = useState(true);
  let time = 0;
  //   const msg = useContext(CountdownContext);

  useEffect(() => {
    fetchQuote().then((apiQuote) => {
      setQuote(apiQuote);
    });
  }, []);

  const typingTimeCalc = () => {
    const time = quote.length * 1000;
    if (time < 150000) {
      return Date.now() + time;
    } else {
      return Date.now() + 150000;
    }
  };

  const gameStart = () => {
    setIsStarted(true);
    console.log("starting");
    clockRef.current.start();
  };

  const timeOut = (userValue) => {
    console.log("Game over");
    clockRef.current.stop();
    setIsStarted(false);
    console.log("Time:" + time);
    WPMcalculater(time, userValue);
    time = 0;
  };

  const Completionist = () => {
    return <span>Game is over!</span>;
  };

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      timeOut();
      return <Completionist />;
    } else {
      time++;
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  const wordsCounter = (str) => {
    var state = 0;
    var words = 0;
    var i = 0;

    while (i < str.length) {
      if (str[i] == " " || str[i] == "\n" || str[i] == "\t") state = 0;
      else if (state == 0) {
        state = 1;
        ++words;
      }
      ++i;
    }
    console.log("String words: " + words);
    return words;
  };

  const WPMcalculater = (endTime, userValue) => {
    let words = wordsCounter(userValue);
    let userWPM;
    if (endTime > 0) {
      userWPM = (words * 60) / endTime;
    } else {
      userWPM = words * (60 / endTime);
    }

    console.log("Your CPM: " + userWPM);
  };

  return (
    <>
      {quote.length > 0 ? (
        <Countdown
          date={typingTimeCalc()}
          renderer={renderer}
          ref={clockRef}
          autoStart={false}
        >
          <Completionist />
        </Countdown>
      ) : null}

      <TextContainer>
        <p>{quote.content}</p>
        {console.log(quote.length)}
        <Input
          length={quote.length}
          timeOut={timeOut}
          gameStart={gameStart}
          autoFocus
        />
      </TextContainer>
    </>
  );
};

export default WriteSection;
