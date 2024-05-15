import styles from "./Panel.module.scss";
import { observer } from "mobx-react-lite";
import InfoField from "../InfoField";
import { useStores } from "../../../mobx/useMobxStateTreeStores";
import { useState } from "react";
import clsx from "clsx";
import ActionButton from "../ActionButton";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const InfoPanel = observer(() => {
  const { editor } = useStores();
  const [isOpen, setIsOpen] = useState(true);
  const node = editor.selectedAstNode;
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>Info</div>
        <ActionButton
          className={styles.panelHeaderToggleButton}
          IconComponent={isOpen ? FaArrowUp : FaArrowDown}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        ></ActionButton>
      </div>
      <div
        className={clsx([
          styles.panelArea,
          {
            [styles.panelAreaClose]: !isOpen,
          },
        ])}
      >
        <div className={styles.panelItem}>
          <div className={styles.panelItemColumnArea}>
            <InfoField label="uuid:" value={node?.uuid || ""} />
            <InfoField label="parent:" value={node?.parent?.uuid || ""} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default InfoPanel;
