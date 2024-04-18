import { useSelector } from "react-redux";
import { Button } from "antd";
import { getDataIsLoading } from "../../store/selectors";

interface SearchButtonProps {
  disabled: boolean;
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ disabled, onClick }) => {
  const isLoading = useSelector(getDataIsLoading);

  return (
    <Button size="large" disabled={disabled || isLoading} onClick={onClick}>
      Load Issues
    </Button>
  );
};

export default SearchButton;
