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

const panel = observer(() => {
  const { editor } = useStores();
  const node = editor.selectedAstNode;
  return (
    <div className={styles.panel}>
      <div className={styles.panelTitle}>Arrangement</div>
      <div className={styles.panelArea}>
        <div className={styles.panelItem}>
          <label className={styles.panelItemLabel}>display</label>
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
              <label className={styles.panelItemLabel}>
                justify-content
              </label>
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
              <label className={styles.panelItemLabel}>
                align-items
              </label>
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

export default panel;
