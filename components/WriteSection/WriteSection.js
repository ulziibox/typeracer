import axios from "axios";
import { useEffect, useState } from "react";
import TextContainer from "./WriteSection.style";
import Input from "../Input/Input";

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

  useEffect(() => {
    fetchQuote().then((apiQuote) => {
      setQuote(apiQuote);
    });
  }, []);
  //   console.log(props.text);
  return (
    <TextContainer>
      <p>{quote.content}</p>
      <Input />
    </TextContainer>
  );
};

export default WriteSection;
