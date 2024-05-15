import styles from "./Panel.module.scss";
import { observer } from "mobx-react-lite";
import ActionButton from "../../components/ActionButton";
import { useState } from "react";
import clsx from "clsx";
import { FaArrowUp, FaArrowDown, FaImage } from "react-icons/fa";
import { LuContainer } from "react-icons/lu";
import { GoTypography } from "react-icons/go";
import { ContainerElementType, SelfClosingElementType, TextElementType } from "../../types";

const NewNodePanel = observer(() => {
  const [isOpen, setIsOpen] = useState(false);
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
            <div
              className={styles.panelItemActionRowBox}
              draggable
              onDragStart={(ev) => {
                ev.dataTransfer.effectAllowed = "move";
                ev.dataTransfer.setData("application/json", JSON.stringify({
                  type: 'add new node',
                  data: {
                    nodeType: ContainerElementType.div,
                  },
                }));
              }}
            >
              <LuContainer />
              Container
            </div>
            <div
              className={styles.panelItemActionRowBox}
              draggable
              onDragStart={(ev) => {
                ev.dataTransfer.effectAllowed = "move";
                ev.dataTransfer.setData("application/json", JSON.stringify({
                  type: 'add new node',
                  data: {
                    nodeType: SelfClosingElementType.img,
                  },
                }));
              }}
            >
              <FaImage />
              Image
            </div>
            <div
              className={styles.panelItemActionRowBox}
              draggable
              onDragStart={(ev) => {
                ev.dataTransfer.effectAllowed = "move";
                ev.dataTransfer.setData("application/json", JSON.stringify({
                  type: 'add new node',
                  data: {
                    nodeType: TextElementType.span,
                  },
                }));
              }}
            >
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
