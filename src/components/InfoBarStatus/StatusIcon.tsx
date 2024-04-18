import {
  BulbOutlined,
  WarningOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

interface StatusIconProps extends React.HTMLProps<HTMLElement> {
  status: string;
}

const StatusIcon: React.FC<StatusIconProps> = ({
  status,
  ...props
}: StatusIconProps) => {
  switch (status) {
    case "initial":
      return <BulbOutlined style={{ color: "#e67701" }} {...props} />;
    case "rejected":
      return <WarningOutlined style={{ color: "#ff4d4f" }} {...props} />;
    case "loading":
      return <LoadingOutlined style={{ color: "#52c41a" }} {...props} />;
  }
};

export default StatusIcon;
