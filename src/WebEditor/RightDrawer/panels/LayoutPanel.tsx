import styles from "./Panel.module.scss";
import { observer } from "mobx-react-lite";
import Input from "../../components/Input";
import { useStores } from "../../../mobx/useMobxStateTreeStores";
import { StyleEnum } from "../../types";
import { useState } from "react";
import clsx from "clsx";
import ActionButton from "../../components/ActionButton";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const LayoutPanel = observer(() => {
  const { editor } = useStores();
  const [isOpen, setIsOpen] = useState(true);
  const node = editor.selectedAstNode;
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>Layout</div>
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
              label="width:"
              value={node?.props.style.width || ""}
              onChange={(e) =>
                node?.updateStyle({
                  styleKey: StyleEnum.width,
                  styleValue: e,
                })
              }
            />
            <Input
              label="height:"
              value={node?.props.style.height || ""}
              onChange={(e) =>
                node?.updateStyle({
                  styleKey: StyleEnum.height,
                  styleValue: e,
                })
              }
            />
          </div>
        </div>
        <div className={styles.panelItem}>
          <label className={styles.panelItemLabel}>Padding</label>
          <div className={styles.panelItemColumnArea}>
            <Input
              label="top:"
              value={node?.props.style.paddingTop || ""}
              onChange={(e) =>
                node?.updateStyle({
                  styleKey: StyleEnum.paddingTop,
                  styleValue: e,
                })
              }
            />
            <Input
              label="bottom:"
              value={node?.props.style.paddingBottom || ""}
              onChange={(e) =>
                node?.updateStyle({
                  styleKey: StyleEnum.paddingBottom,
                  styleValue: e,
                })
              }
            />
            <Input
              label="left:"
              value={node?.props.style.paddingLeft || ""}
              onChange={(e) =>
                node?.updateStyle({
                  styleKey: StyleEnum.paddingLeft,
                  styleValue: e,
                })
              }
            />
            <Input
              label="right:"
              value={node?.props.style.paddingRight || ""}
              onChange={(e) =>
                node?.updateStyle({
                  styleKey: StyleEnum.paddingRight,
                  styleValue: e,
                })
              }
            />
          </div>
        </div>
        <div className={styles.panelItem}>
          <label className={styles.panelItemLabel}>Margin</label>
          <div className={styles.panelItemColumnArea}>
            <Input
              label="top:"
              value={node?.props.style.marginTop || ""}
              onChange={(e) =>
                node?.updateStyle({
                  styleKey: StyleEnum.marginTop,
                  styleValue: e,
                })
              }
            />
            <Input
              label="bottom:"
              value={node?.props.style.marginBottom || ""}
              onChange={(e) =>
                node?.updateStyle({
                  styleKey: StyleEnum.marginBottom,
                  styleValue: e,
                })
              }
            />
            <Input
              label="left:"
              value={node?.props.style.marginLeft || ""}
              onChange={(e) =>
                node?.updateStyle({
                  styleKey: StyleEnum.marginLeft,
                  styleValue: e,
                })
              }
            />
            <Input
              label="right:"
              value={node?.props.style.marginRight || ""}
              onChange={(e) =>
                node?.updateStyle({
                  styleKey: StyleEnum.marginRight,
                  styleValue: e,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default LayoutPanel;
