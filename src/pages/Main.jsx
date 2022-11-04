import React from "react";
import "../styles/style.css";
import LatestItems from "../components/LatestItems";
import LargestCollections from '../components/LargestCollections'

const Main = () => {
  

  return (
    <div>
      <h1 className="title">Latest Items</h1>
      <LatestItems />
      <h1 className="title">5 Largest Collections</h1>
      <LargestCollections />
    </div>
  );
};

export default Main;
