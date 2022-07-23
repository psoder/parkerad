import { Comparitor } from "utils/LocationReviewUtils";

const Sort = ({ onChange }: { onChange: any }) => {
  return (
    <div style={{ display: "flex" }}>
      <h2 style={{ margin: 0 }}>Sort Locations</h2>
      <select onChange={onChange} name={"comparitor"}>
        <option value={Comparitor.RATING}> Rating</option>
        <option value={Comparitor.WEIGHTED_RATING}>Weighted rating</option>
        <option value={Comparitor.DATE_ADDED}> Date Added</option>
        <option value={Comparitor.NO_RATINGS}> No. Ratings</option>
      </select>
    </div>
  );
};

export default Sort;
