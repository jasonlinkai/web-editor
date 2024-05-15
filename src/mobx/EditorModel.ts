import {
  types as t,
  Instance,
  SnapshotIn,
  SnapshotOut,
  getSnapshot,
} from "mobx-state-tree";
import { AstNodeModel } from "./AstNodeModel";
import type { AstNodeModelType } from "./AstNodeModel";

export const EditorModel = t
  .model("EditorModel", {
    selectedAstNode: t.maybe(t.reference(AstNodeModel)),
    dragingAstNode: t.maybe(t.reference(AstNodeModel)),
  })
  .volatile<{ isLeftDrawerOpen: boolean; isRightDrawerOpen: boolean }>(() => ({
    isLeftDrawerOpen: true,
    isRightDrawerOpen: true,
  }))
  .actions((self) => ({
    setIsLeftDrawerOpen(open: boolean) {
      self.isLeftDrawerOpen = open;
    },
    setIsRightDrawerOpen(open: boolean) {
      self.isRightDrawerOpen = open;
    },
    setSelectedAstNode(node: AstNodeModelType | undefined) {
      if (node) {
        if (!self.selectedAstNode) {
          self.selectedAstNode = node;
          node.setStyle(node.props.style);
          if (node.isTextElement) {
            node.setContent(node.content || "");
          }
        } else {
          if (node.uuid !== self.selectedAstNode.uuid) {
            self.selectedAstNode.setStyle({});
            if (node.isTextElement) {
              node.setContent(node.content || "");
            }
            self.selectedAstNode = node;
            node.setStyle(getSnapshot(node.props.style));
          }
        }
      } else {
        if (!self.selectedAstNode) {
          self.selectedAstNode = undefined;
        } else {
          self.selectedAstNode.setStyle({});
          if (self.selectedAstNode.isTextElement) {
            self.selectedAstNode.setContent(
              self.selectedAstNode.content || ""
            );
          }
          self.selectedAstNode = undefined;
        }
      }
    },
    setDragingAstNode(node: AstNodeModelType | undefined) {
      self.dragingAstNode = node;
    },
  }));

export type EditorModelType = Instance<typeof EditorModel>;
export type EditorModelSnapshotInType = SnapshotIn<typeof EditorModel>;
export type EditorModelSnapshotOutType = SnapshotOut<typeof EditorModel>;
