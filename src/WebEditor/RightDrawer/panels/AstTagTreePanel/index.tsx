import panelStyles from "../Panel.module.scss";
import styles from "./AstTagTreePanel.module.scss";
import { observer } from "mobx-react-lite";
import clsx from "clsx";
import { AstNodeModelType } from "../../../../mobx/AstNodeModel";
import { useStores } from "../../../../mobx/useMobxStateTreeStores";

const AstTagTree = observer(
  ({ node, level = 0 }: { node: AstNodeModelType; level?: number }) => {
    const { editor } = useStores();
    const { selectedAstNode, setSelectedAstNode } = editor;
    const { isContainerNode, isTextNode, isSelfClosingNode } = node;
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
        <span
          className={clsx([
            styles.astTreePanelItemStartTag,
            {
              [styles.astTreePanelItemStartTagSelected]:
                selectedAstNode?.uuid === node.uuid,
            },
          ])}
        >{`<${node.type}${isSelfClosingNode ? " /" : ""}>`}</span>

        {isContainerNode && (
          <>
            {node.children.map((child: AstNodeModelType) => {
              return (
                <AstTagTree
                  key={`ast-tree-panel-item-child-${child.uuid}`}
                  node={child}
                  level={level + 1}
                />
              );
            })}
          </>
        )}

        {isTextNode && (
          <span style={{ marginLeft: 10 }}>{node.content}</span>
        )}

        {!isSelfClosingNode && (
          <span
            className={clsx([
              styles.astTreePanelItemEndTag,
              {
                [styles.astTreePanelItemEndTagSelected]:
                  selectedAstNode?.uuid === node.uuid,
              },
            ])}
          >{`</${node.type}>`}</span>
        )}
      </div>
    );
  }
);

export const astTagTreePanelHeight = 200;

const AstTagTreePanel = observer(() => {
  const { ast } = useStores();
  return (
    <div className={panelStyles.panel}>
      <div className={panelStyles.panelTitle}>Tree</div>
      <div
        className={styles.astTreePanelArea}
        style={{
          height: `${astTagTreePanelHeight}px`,
          minHeight: `${astTagTreePanelHeight}px`,
        }}
      >
        {ast && <AstTagTree node={ast} />}
      </div>
    </div>
  );
});

export default AstTagTreePanel;
