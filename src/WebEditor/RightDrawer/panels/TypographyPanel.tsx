import styles from "./Panel.module.scss";
import { observer } from "mobx-react-lite";
import Input from "../../components/Input";
import { useStores } from "../../../mobx/useMobxStateTreeStores";
import { StyleEnum } from "../../types";
import { useState } from "react";
import clsx from "clsx";
import ActionButton from "../../components/ActionButton";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Select from "../../components/Select";
import options from "../../components/Select/options";

const TypographyPanel = observer(() => {
  const { editor } = useStores();
  const [isOpen, setIsOpen] = useState(false);
  const node = editor.selectedAstNode;
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>Typography</div>
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
            <Input
              label="color:"
              value={node?.props.style.color || ""}
              onChange={(e) =>
                node?.updateStyle({
                  styleKey: StyleEnum.color,
                  styleValue: e,
                })
              }
            />
            <Input
              label="fontSize:"
              value={node?.props.style.fontSize || ""}
              onChange={(e) =>
                node?.updateStyle({
                  styleKey: StyleEnum.fontSize,
                  styleValue: e,
                })
              }
            />
            <Input
              label="fontWeight:"
              value={node?.props.style.fontWeight || ""}
              onChange={(e) =>
                node?.updateStyle({
                  styleKey: StyleEnum.fontWeight,
                  styleValue: e,
                })
              }
            />
            <Select
              label="textAlign:"
              value={node?.props.style.textAlign || ""}
              onChange={(e) =>
                node?.updateStyle({
                  styleKey: StyleEnum.textAlign,
                  styleValue: e,
                })
              }
              options={options.textAlign}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default TypographyPanel;
