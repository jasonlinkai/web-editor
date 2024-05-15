import styles from "./Panel.module.scss";
import { observer } from "mobx-react-lite";
import {
  LuAlignHorizontalJustifyStart,
  LuAlignHorizontalJustifyCenter,
  LuAlignHorizontalJustifyEnd,
  LuAlignHorizontalSpaceBetween,
  LuAlignHorizontalSpaceAround,
} from "react-icons/lu";
import Select from "../../components/Select";
import { useStores } from "../../../mobx/useMobxStateTreeStores";
import { StyleEnum } from "../../types";
import ActionButton from "../../components/ActionButton";
import options from "../../components/Select/options";
import { useState } from "react";
import clsx from "clsx";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ArrangementPanel = observer(() => {
  const { editor } = useStores();
  const [isOpen, setIsOpen] = useState(true);
  const node = editor.selectedAstNode;
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>Arrangement</div>
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
          <label className={styles.panelItemLabel}>Display</label>
          <div className={styles.panelItemRowCenterArea}>
            <Select
              value={node?.props.style.display || ""}
              onChange={(e) =>
                node?.updateStyle({
                  styleKey: StyleEnum.display,
                  styleValue: e,
                })
              }
              options={options.display}
            />
          </div>
        </div>
        {node?.props.style.display === "flex" && (
          <>
            <div className={styles.panelItem}>
              <label className={styles.panelItemLabel}>FlexDirection</label>
              <div className={styles.panelItemRowCenterArea}>
                <Select
                  value={node?.props.style.flexDirection || ""}
                  onChange={(e) =>
                    node?.updateStyle({
                      styleKey: StyleEnum.flexDirection,
                      styleValue: e,
                    })
                  }
                  options={options.flexDirection}
                />
              </div>
            </div>
            <div className={styles.panelItem}>
              <label className={styles.panelItemLabel}>JustifyContent</label>
              <div className={styles.panelItemRowBetweenAera}>
                <ActionButton
                  IconComponent={LuAlignHorizontalJustifyStart}
                  isActive={node.props.style.justifyContent === "start"}
                  onClick={() => {
                    node?.updateStyle({
                      styleKey: StyleEnum.justifyContent,
                      styleValue: "start",
                    });
                  }}
                ></ActionButton>
                <ActionButton
                  IconComponent={LuAlignHorizontalJustifyCenter}
                  isActive={node.props.style.justifyContent === "center"}
                  onClick={() => {
                    node?.updateStyle({
                      styleKey: StyleEnum.justifyContent,
                      styleValue: "center",
                    });
                  }}
                ></ActionButton>
                <ActionButton
                  IconComponent={LuAlignHorizontalJustifyEnd}
                  isActive={node.props.style.justifyContent === "end"}
                  onClick={() => {
                    node?.updateStyle({
                      styleKey: StyleEnum.justifyContent,
                      styleValue: "end",
                    });
                  }}
                ></ActionButton>
                <ActionButton
                  IconComponent={LuAlignHorizontalSpaceBetween}
                  isActive={node.props.style.justifyContent === "space-between"}
                  onClick={() => {
                    node?.updateStyle({
                      styleKey: StyleEnum.justifyContent,
                      styleValue: "space-between",
                    });
                  }}
                ></ActionButton>
                <ActionButton
                  IconComponent={LuAlignHorizontalSpaceAround}
                  isActive={node.props.style.justifyContent === "space-around"}
                  onClick={() => {
                    node?.updateStyle({
                      styleKey: StyleEnum.justifyContent,
                      styleValue: "space-around",
                    });
                  }}
                ></ActionButton>
              </div>
            </div>
            <div className={styles.panelItem}>
              <label className={styles.panelItemLabel}>AlignItems</label>
              <div className={styles.panelItemRowBetweenAera}>
                <ActionButton
                  IconComponent={LuAlignHorizontalJustifyStart}
                  isActive={node.props.style.alignItems === "start"}
                  onClick={() => {
                    node?.updateStyle({
                      styleKey: StyleEnum.alignItems,
                      styleValue: "start",
                    });
                  }}
                ></ActionButton>
                <ActionButton
                  IconComponent={LuAlignHorizontalJustifyCenter}
                  isActive={node.props.style.alignItems === "center"}
                  onClick={() => {
                    node?.updateStyle({
                      styleKey: StyleEnum.alignItems,
                      styleValue: "center",
                    });
                  }}
                ></ActionButton>
                <ActionButton
                  IconComponent={LuAlignHorizontalJustifyEnd}
                  isActive={node.props.style.alignItems === "end"}
                  onClick={() => {
                    node?.updateStyle({
                      styleKey: StyleEnum.alignItems,
                      styleValue: "end",
                    });
                  }}
                ></ActionButton>
                <ActionButton
                  IconComponent={LuAlignHorizontalSpaceBetween}
                  isActive={node.props.style.alignItems === "space-between"}
                  onClick={() => {
                    node?.updateStyle({
                      styleKey: StyleEnum.alignItems,
                      styleValue: "space-between",
                    });
                  }}
                ></ActionButton>
                <ActionButton
                  IconComponent={LuAlignHorizontalSpaceAround}
                  isActive={node.props.style.alignItems === "space-around"}
                  onClick={() => {
                    node?.updateStyle({
                      styleKey: StyleEnum.alignItems,
                      styleValue: "space-around",
                    });
                  }}
                ></ActionButton>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default ArrangementPanel;
