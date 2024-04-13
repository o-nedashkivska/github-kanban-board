import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchIssues, AppDispatch } from "../../store";
import { Flex, Input, Button } from "antd";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [url, setUrl] = useState("");

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleButtonClick = () => {
    dispatch(fetchIssues({ owner: "facebook", repo: "react" }));
  };

  return (
    <Flex gap="large">
      <Input
        size="large"
        placeholder="Enter repo URL"
        onChange={handleInputChange}
      />
      <Button size="large" onClick={handleButtonClick}>
        Load Issues
      </Button>
    </Flex>
  );
};

export default SearchBar;
