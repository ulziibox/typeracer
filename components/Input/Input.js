import RacingInput from "./Input.style";

const Input = (props) => {
  const handleOnChange = (e) => {
    if (e.target.value.length > props.length) {
      props.timeOut();
    } else {
      if (e.target.value.length === 1) {
        props.gameStart();
      }
      //   console.log(e.target.value.length);
    }
  };

  const handleEnterKey = (e) => {
    if (
      (e.key === "Enter" || e.key === 13) &&
      e.target.value.length >= props.length
    ) {
      props.timeOut();
    }
  };

  return (
    <RacingInput
      type="text"
      onChange={handleOnChange}
      maxLength={props.length + 1}
      onKeyDown={handleEnterKey}
      //   onInput={props.gameStart()}
    />
  );
};

export default Input;
