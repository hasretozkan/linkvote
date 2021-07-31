import * as React from "react";
import { ArrowUp, ArrowDown, Loader, Trash2, IconProps as BaseIconProps, MousePointer } from "react-feather";

type IconProps = {
  name: "arrowUp" | "arrowDown" | "loader" | "trash";
  size: number;
  className?: string;
  onClick?: () => void;
};

const iconMap: Record<IconProps["name"], React.FC<BaseIconProps>> = {
  arrowDown: ArrowDown,
  arrowUp: ArrowUp,
  loader: Loader,
  trash: Trash2,
};

const Icon: React.FC<IconProps> = ({ name, className, ...props }) => {
  const IconComponent = iconMap[name] || MousePointer;
  const iconClassName = `${className} ${name === "loader" ? "spin" : ""}`;

  return <IconComponent className={iconClassName} {...props} />;
};

export default Icon;
