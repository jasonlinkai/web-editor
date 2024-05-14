import styles from "./Panel.module.scss";
import { observer } from "mobx-react-lite";
import Input from "../../components/Input";
import { useStores } from "../../../mobx/useMobxStateTreeStores";
import { StyleEnum } from "../../types";

const LayoutPanel = observer(() => {
  const { editor } = useStores();
  const node = editor.selectedAstNode;
  return (
    <div className={styles.panel}>
      <div className={styles.panelTitle}>Layout</div>
      <div className={styles.panelArea}>
        <div className={styles.panelItem}>
          <label className={styles.panelItemLabel}>padding</label>
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
          <label className={styles.panelItemLabel}>margin</label>
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
