import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SearchDetail = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <div className="SearchDetail container">
      <h2>Here is SearchDetail</h2>
      <h2>building number is = {id}</h2>
    </div>
  );
};

export default SearchDetail;
