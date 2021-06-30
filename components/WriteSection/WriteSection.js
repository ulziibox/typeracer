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

const WriteSection = (props) => {
  const [quote, setQuote] = useState([]);
  const clockRef = useRef();
  const [isStarted, setIsStarted] = useState(true);
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

  const timeOut = () => {
    console.log("Game over");
    clockRef.current.stop();
    setIsStarted(false);
  };

  const Completionist = () => {
    return <span>Game is over!</span>;
  };

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      timeOut();
      return <Completionist />;
    } else {
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  const WPMcalculater = (startTime, endTime, words) => {
    const seconds = (endTime - startTime) / 1000;
    const minutes = seconds / 60;
    const userWPM = Math.floor(words / minutes);
    console.log(userWPM);
    return userWPM;
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
