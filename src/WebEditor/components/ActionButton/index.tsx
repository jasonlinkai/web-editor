import styles from "./ActionButton.module.scss";
import clsx from "clsx";
import { IconType } from "react-icons";

interface ActionButtonProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>> {
  IconComponent?: IconType;
  isActive?: boolean;
}
const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  IconComponent,
  isActive = false,
  ...p
}) => {
  return (
    <button
      {...p}
      className={clsx([
        styles.actionButton,
        {
          [styles.actionButtonActive]: isActive,
        },
      ])}
    >
      {IconComponent && (
        <IconComponent
          className={clsx([
            styles.actionIcon,
            {
              [styles.actionIconActive]: isActive,
            },
          ])}
        />
      )}
      {children}
    </button>
  );
};

export default ActionButton;
