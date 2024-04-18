import { Typography } from "antd";
import { BulbOutlined } from "@ant-design/icons";

import styles from "./info-bar.module.css";

const { Paragraph } = Typography;

const InfoBarStatus: React.FC = () => {
  return (
    <Paragraph className={styles["info-bar__status"]} italic>
      <BulbOutlined
        style={{ color: "#e67701" }}
        className={styles["info-bar__icon"]}
      />
      To view issues of any existing repository, please enter a valid repository
      url into the input above and click 'Load issues' button.
    </Paragraph>
  );
};

export default InfoBarStatus;
