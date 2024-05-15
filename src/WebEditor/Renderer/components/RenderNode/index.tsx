import styles from "./RenderNode.module.scss";
import clsx from "clsx";
import React, { SyntheticEvent } from "react";
import { observer } from "mobx-react-lite";
import { AstNodeModelType } from "../../../../mobx/AstNodeModel";
import { useStores } from "../../../../mobx/useMobxStateTreeStores";

interface RenderNodeProps {
  ast: AstNodeModelType | undefined;
  handleOnClick: (ev: React.MouseEvent, node: AstNodeModelType) => void;
  handleOnDragStart: (ev: React.DragEvent, node: AstNodeModelType) => void;
  handleOnDragOver: (ev: React.DragEvent, node: AstNodeModelType) => void;
  handleOnDragLeave: (ev: React.DragEvent, node: AstNodeModelType) => void;
  handleOnDrop: (ev: React.DragEvent, node: AstNodeModelType) => void;
}

const RenderNode: React.FC<RenderNodeProps> = observer(({ ast, ...p }) => {
  const { editor } = useStores();
  const {
    handleOnClick,
    handleOnDragStart,
    handleOnDragOver,
    handleOnDragLeave,
    handleOnDrop,
  } = p;
  if (!ast) return null;

  const isSelectedNode = ast.uuid === editor.selectedAstNode?.uuid;
  const draggable = !ast.isRootNode && isSelectedNode;
  const dropable =  ast.isContainerNode && ast.uuid !== editor.dragingAstNode?.uuid;
  // Base case: If the node is a text node, render it as is

  const node: AstNodeModelType = ast;
  // Otherwise, it's an element node
  const { type, props, children } = node;

  // register event for web-editor
  const editorEventListeners: {
    [key: string]: React.EventHandler<SyntheticEvent> | undefined;
  } = {};
  editorEventListeners.onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleOnClick(e, node);
  };
  if (draggable) {
    editorEventListeners.onDragStart = (e: React.DragEvent) => {
      handleOnDragStart(e, node);
    };
  }
  if (dropable) {
    editorEventListeners.onDragOver = (e: React.DragEvent) => {
      handleOnDragOver(e, node);
      node.setIsDragOvered(true);
    };
    editorEventListeners.onDragLeave = (e: React.DragEvent) => {
      handleOnDragLeave(e, node);
      node.setIsDragOvered(false);
    };
  
    editorEventListeners.onDrop = (e: React.DragEvent) => {
      handleOnDrop(e, node);
      node.setIsDragOvered(false);
    };
  }

  let renderChildren;
  if (node.isContainerNode) {
    renderChildren = Array.isArray(children) ? children : [children];
    renderChildren = renderChildren.map((child) => {
      return <RenderNode key={child.uuid} ast={child} {...p} />;
    });
  } else if (node.isTextNode) {
    renderChildren = node.content;
  } else if (node.isSelfClosingNode) {
    renderChildren = null;
  }

  return React.createElement(
    type,
    {
      ...props,
      ...editorEventListeners,
      draggable,
      style: {
        ...props.style,
      },
      className: clsx([
        props.className,
        {
          [styles.selectedNode]: isSelectedNode,
          [styles.dragOverElement]: node.isDragOvered,
        },
      ]),
    },
    renderChildren,
  );
});

export default RenderNode;
