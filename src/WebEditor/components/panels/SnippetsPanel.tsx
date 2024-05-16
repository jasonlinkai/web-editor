import styles from "./Panel.module.scss";
import { observer } from "mobx-react-lite";
import ActionButton from "../ActionButton";
import { useState } from "react";
import clsx from "clsx";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import RenderNode from "../../Renderer/components/RenderNode";
import { useStores } from "../../../mobx/useMobxStateTreeStores";

const SnippetsPanel = observer(() => {
  const { editor } = useStores();
  const { snippets } = editor;
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>Snippets</div>
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
            {snippets.map((snippet) => {
              return (
                <div
                  key={snippet.uuid}
                  className={styles.panelItemActionRowBox}
                  draggable
                  style={{
                    cursor: "grab",
                  }}
                  onDragStart={(ev) => {
                    ev.dataTransfer.effectAllowed = "move";
                    ev.dataTransfer.setData(
                      "application/json",
                      JSON.stringify({
                        type: "add new node from snippets",
                        data: editor.recursiveClearUuid(JSON.parse(JSON.stringify(snippet))),
                      })
                    );
                  }}
                >
                  <RenderNode ast={snippet} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default SnippetsPanel;
