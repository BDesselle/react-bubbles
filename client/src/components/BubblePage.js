import React from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = React.useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  React.useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(res => setColorList(res.data))
      .catch(err => console.log(err));
  }, []);

  React.useEffect(() => {
    console.log("there was a change why you no work");
  }, [colorList]);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
