import styles from "./Panel.module.scss";
import { observer } from "mobx-react-lite";
import Select from "../../components/Select";
import { useStores } from "../../../mobx/useMobxStateTreeStores";
import { StyleEnum } from "../../types";
import options from "../../components/Select/options";
import Input from "../../components/Input";

const PositionPanel = observer(() => {
  const { editor } = useStores();
  const node = editor.selectedAstNode;
  return (
    <div className={styles.panel}>
      <div className={styles.panelTitle}>Position</div>
      <div className={styles.panelArea}>
        <div className={styles.panelItem}>
          <div className={styles.panelItemRowCenterArea}>
            <Select
              value={node?.props.style.position || ""}
              onChange={(e) =>
                node?.updateStyle({
                  styleKey: StyleEnum.position,
                  styleValue: e,
                })
              }
              options={options.position}
            />
          </div>
        </div>
        {(node?.props.style.position === "fixed" ||
          node?.props.style.position === "absolute") && (
          <div className={styles.panelItem}>
            <div className={styles.panelItemColumnArea}>
              <Input
                label="top:"
                value={node?.props.style.top || ""}
                onChange={(e) =>
                  node?.updateStyle({
                    styleKey: StyleEnum.top,
                    styleValue: e,
                  })
                }
              />
              <Input
                label="bottom:"
                value={node?.props.style.bottom || ""}
                onChange={(e) =>
                  node?.updateStyle({
                    styleKey: StyleEnum.bottom,
                    styleValue: e,
                  })
                }
              />
              <Input
                label="left:"
                value={node?.props.style.left || ""}
                onChange={(e) =>
                  node?.updateStyle({
                    styleKey: StyleEnum.left,
                    styleValue: e,
                  })
                }
              />
              <Input
                label="right:"
                value={node?.props.style.right || ""}
                onChange={(e) =>
                  node?.updateStyle({
                    styleKey: StyleEnum.right,
                    styleValue: e,
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default PositionPanel;
