const GlobalProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 25,
    //width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 10,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    //padding: 5,
    //display: "flex",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}${
          completed > 10 ? "%" : ""
        }`}</span>
      </div>
    </div>
  );
};

export default GlobalProgressBar;
