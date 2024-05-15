import styles from "./Renderer.module.scss";
import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { AstNodeModelType } from "../../mobx/AstNodeModel";
import { useStores } from "../../mobx/useMobxStateTreeStores";
import RenderNode from "./components/RenderNode";
import { ContainerNodeType, SelfClosingNodeType, TextNodeType } from "../types";

const Renderer: React.FC = observer(() => {
  const { ast, editor } = useStores();
  const { setSelectedAstNode, dragingAstNode, setDragingAstNode, newContainerNode, newImageNode, newTextNode } = editor;

  const handleOnClick: (ev: React.MouseEvent, node: AstNodeModelType) => void =
    useCallback(
      (e, node) => {
        e.stopPropagation();
        setSelectedAstNode(node);
      },
      [setSelectedAstNode]
    );

  const handleOnDragStart: (
    ev: React.DragEvent,
    node: AstNodeModelType
  ) => void = useCallback(
    (ev, node) => {
      ev.stopPropagation();
      ev.dataTransfer.effectAllowed = "move";
      ev.dataTransfer.setData(
        "application/json",
        JSON.stringify({
          type: "move node",
          data: "",
        })
      );
      setDragingAstNode(node);
    },
    [setDragingAstNode]
  );

  const handleOnDragOver: (
    ev: React.DragEvent,
    node: AstNodeModelType
  ) => void = useCallback((ev, node) => {
    ev.preventDefault();
    ev.stopPropagation();
    ev.dataTransfer.dropEffect = "move";
    node.setIsDragOvered(true);
  }, []);

  const handleOnDragLeave: (
    ev: React.DragEvent,
    node: AstNodeModelType
  ) => void = useCallback((ev, node) => {
    ev.preventDefault();
    ev.stopPropagation();
    node.setIsDragOvered(false);
  }, []);

  const handleOnDrop: (ev: React.DragEvent, node: AstNodeModelType) => void =
    useCallback(
      (ev, node) => {
        ev.stopPropagation();
        const jsonData = ev.dataTransfer.getData("application/json");
        const { type, data } = JSON.parse(jsonData);
        let newNode;
        if (type === "move node") {
          if (dragingAstNode) {
            newNode = dragingAstNode.parent.moveChild(dragingAstNode, node);
            setDragingAstNode(undefined);
          }
        } else if (type === "add new node") {
          if (data.nodeType === ContainerNodeType.div) {
            newNode = newContainerNode();
          } else if (data.nodeType === TextNodeType.span) {
            newNode = newTextNode();
          } else if (data.nodeType === SelfClosingNodeType.img) {
            newNode = newImageNode();
          }
          node.addChild(newNode)
        }
        setSelectedAstNode(newNode);
      },
      [dragingAstNode, setDragingAstNode, newContainerNode, newImageNode, newTextNode, setSelectedAstNode]
    );
  return (
    <div className={styles.renderer}>
      <RenderNode
        ast={ast}
        handleOnClick={handleOnClick}
        handleOnDragStart={handleOnDragStart}
        handleOnDragOver={handleOnDragOver}
        handleOnDragLeave={handleOnDragLeave}
        handleOnDrop={handleOnDrop}
      />
    </div>
  );
});

export default Renderer;
