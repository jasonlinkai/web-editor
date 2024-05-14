import styles from "./AstTagTreePanel.module.scss";
import { observer } from "mobx-react-lite";
import clsx from "clsx";
import { AstNodeModelType } from "../../../mobx/AstNodeModel";
import { useStores } from "../../../mobx/useMobxStateTreeStores";

const AstTagTree = observer(
  ({ node, level = 0 }: { node: AstNodeModelType; level?: number }) => {
    const { editor } = useStores();
    const { selectedAstNode, setSelectedAstNode } = editor;
    const { isPureTextNode } = node;
    const marginLeft = `${10 * level}px`;
    return (
      <div
        key={`ast-tree-panel-item-${node.uuid}`}
        className={styles.astTreePanelItem}
        style={{ marginLeft }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedAstNode(node);
        }}
      >
        {isPureTextNode ? (
          <span
            className={clsx([
              styles.astTreePanelItemContent,
              {
                [styles.astTreePanelItemContentSelected]:
                  selectedAstNode?.uuid === node.uuid,
              },
            ])}
          >
            {node.content}
          </span>
        ) : (
          <>
            <span
              className={clsx([
                styles.astTreePanelItemStartTag,
                {
                  [styles.astTreePanelItemStartTagSelected]:
                    selectedAstNode?.uuid === node.uuid,
                },
              ])}
            >{`<${node.type}>`}</span>

            {node.children.map((child: AstNodeModelType) => {
              return (
                <AstTagTree
                  key={`ast-tree-panel-item-child-${child.uuid}`}
                  node={child}
                  level={level + 1}
                />
              );
            })}

            <span
              className={clsx([
                styles.astTreePanelItemEndTag,
                {
                  [styles.astTreePanelItemEndTagSelected]:
                    selectedAstNode?.uuid === node.uuid,
                },
              ])}
            >{`</${node.type}>`}</span>
          </>
        )}
      </div>
    );
  }
);

const AstTagTreePanel = observer(() => {
  const { editor } = useStores();
  return (
    <div className={styles.astTreePanel}>
      <div className={styles.astTreePanelTitle}>Tree</div>
      {editor.selectedAstNode && (
        <div className={styles.astTreePanelArea}>
          <AstTagTree node={editor.selectedAstNode} />
        </div>
      )}
    </div>
  );
});

export default AstTagTreePanel;
