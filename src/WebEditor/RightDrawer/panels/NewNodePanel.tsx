import styles from "./Panel.module.scss";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../mobx/useMobxStateTreeStores";
import ActionButton from "../../components/ActionButton";
import { useState } from "react";
import clsx from "clsx";
import { FaArrowUp, FaArrowDown, FaImage } from "react-icons/fa";
import { LuContainer } from "react-icons/lu";
import { GoTypography } from "react-icons/go";

const NewNodePanel = observer(() => {
  const { editor } = useStores();
  const [isOpen, setIsOpen] = useState(false);
  const node = editor.selectedAstNode;
  if (!node) return null;
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>NewNode</div>
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
          <div className={styles.panelItemColumnCenterArea}>
            <div className={styles.panelItemActionRowBox} onClick={() => {}} draggable>
              <LuContainer />
              Container
            </div>
            <div className={styles.panelItemActionRowBox} onClick={() => {}} draggable>
              <FaImage />
              Image
            </div>
            <div className={styles.panelItemActionRowBox} onClick={() => {}} draggable>
              <GoTypography />
              Text
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default NewNodePanel;
