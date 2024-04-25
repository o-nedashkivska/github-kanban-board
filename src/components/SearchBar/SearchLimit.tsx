import { useDispatch, useSelector } from "react-redux";
import { Select, Tooltip } from "antd";
import { changeLimit } from "../../store";
import { getDataIsLoading } from "../../store/selectors";

import styles from "./search-bar.module.css";

const tooltipText =
  "NOTE: 'No limit' option will not apply on 'Done' column due to performance reasons. Value 100 will be used instead.";

export const limitOptions = [
  { value: "30", label: "30 issues per column" },
  { value: "50", label: "50 issues per column" },
  { value: "100", label: "100 issues per column" },
  { value: "Infinity", label: "No limit per column" },
];

const SearchLimit = () => {
  const isLoading = useSelector(getDataIsLoading);
  const dispatch = useDispatch();

  const handleChange = (newValue) => {
    dispatch(changeLimit(+newValue));
  };

  return (
    <Tooltip title={tooltipText}>
      <Select
        disabled={isLoading}
        defaultValue="30"
        className={styles["search-limit"]}
        onChange={handleChange}
        options={limitOptions}
        size="large"
      />
    </Tooltip>
  );
};

export default SearchLimit;
