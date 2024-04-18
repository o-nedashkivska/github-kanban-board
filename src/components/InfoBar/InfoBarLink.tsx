import { Button } from "antd";

interface InfoBarLinkProps {
  text: string;
  href: string;
}

const InfoBarLink: React.FC<InfoBarLinkProps> = ({
  text,
  href,
}: InfoBarLinkProps) => {
  const upCaseFirst = text[0].toUpperCase() + text.slice(1);

  return (
    <Button type="link" size="large" target="_blank" href={href}>
      {upCaseFirst}
    </Button>
  );
};

export default InfoBarLink;
