import { useSelector } from "react-redux";
import { Flex, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import InfoBarLink from "./InfoBarLink";
import InfoBarStatus from "./InfoBarStatus";

import { getCurrentRepo } from "../../store/selectors";

import styles from "./info-bar.module.css";

const { Text } = Typography;
const githubUrl = "https://github.com";

const InfoBar: React.FC = () => {
  const { name: currentRepoName, stars } = useSelector(getCurrentRepo);

  if (!currentRepoName) {
    return <InfoBarStatus />;
  }

  const [owner, repo] = currentRepoName.split("/");

  return (
    <Flex align="center" gap="large">
      <Flex align="center" className={styles["info-bar__links"]}>
        <InfoBarLink text={owner} href={`${githubUrl}/${owner}`} />
        <Text style={{ color: "#1677ff" }} strong>
          {">"}
        </Text>
        <InfoBarLink text={repo} href={`${githubUrl}/${owner}/${repo}`} />
      </Flex>
      <Text strong>
        <StarFilled
          style={{ color: "#e67701" }}
          className={styles["info-bar__icon"]}
        />
        {`${stars} K stars`}
      </Text>
    </Flex>
  );
};

export default InfoBar;
