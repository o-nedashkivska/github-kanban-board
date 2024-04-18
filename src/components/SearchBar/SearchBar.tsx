import { useDispatch } from "react-redux";
import { Flex, Input, Tooltip } from "antd";
import { fetchRepoData, AppDispatch } from "../../store";
import SearchLimit from "./SearchLimit";
import SearchButton from "./SearchButton";

import useInput from "../../hooks/useInput";
import { validateUrl } from "../../utils/validateUrl";
import { parseUrl } from "../../utils/parseUrl";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    value: url,
    error,
    isValid,
    onChange: setUrl,
    onBlur,
  } = useInput("", validateUrl);

  const handleSubmit = () => {
    const { owner, repo } = parseUrl(url);
    dispatch(fetchRepoData({ owner, repo }));
  };

  return (
    <Flex gap="large">
      <Tooltip title={isValid ? "" : "Please enter a valid url."}>
        <Input
          size="large"
          placeholder="Enter repo URL"
          status={error && "error"}
          onChange={setUrl}
          onBlur={onBlur}
          onPressEnter={isValid && handleSubmit}
        />
      </Tooltip>
      <SearchLimit />
      <SearchButton disabled={!isValid} onClick={handleSubmit} />
    </Flex>
  );
};

export default SearchBar;
