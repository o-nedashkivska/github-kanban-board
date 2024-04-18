import { Typography } from "antd";
import { useSelector } from "react-redux";
import {
  getCurrentRepoStatus,
  getCurrentRepoStatusReason,
} from "../../store/selectors";
import StatusIcon from "./StatusIcon";

import styles from "./info-bar-status.module.css";

const { Paragraph } = Typography;

const InfoBarStatus: React.FC = () => {
  const status = useSelector(getCurrentRepoStatus);
  const statusReason = useSelector(getCurrentRepoStatusReason);

  return (
    <Paragraph className={styles["info-bar__status"]} italic>
      <StatusIcon status={status} className={styles["info-bar__icon"]} />
      {statusReason}
    </Paragraph>
  );
};

export default InfoBarStatus;
