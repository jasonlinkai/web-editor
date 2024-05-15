import {
  types as t,
  Instance,
  SnapshotIn,
  SnapshotOut,
  getSnapshot,
  detach,
} from "mobx-state-tree";
import { AstNodeModel } from "./AstNodeModel";
import type { AstNodeModelType } from "./AstNodeModel";
import { v4 as uuid } from "uuid";
import { ContainerNodeType, SelfClosingNodeType, TextNodeType } from "../WebEditor/types";
import { getRandomColor } from "../WebEditor/utils";

export const EditorModel = t
  .model("EditorModel", {
    selectedAstNode: t.maybe(t.safeReference(AstNodeModel)),
    dragingAstNode: t.maybe(t.safeReference(AstNodeModel)),
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
          if (node.isTextNode) {
            node.setContent(node.content || "");
          }
        } else {
          if (node.uuid !== self.selectedAstNode.uuid) {
            self.selectedAstNode.setStyle({});
            if (node.isTextNode) {
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
          if (self.selectedAstNode.isTextNode) {
            self.selectedAstNode.setContent(self.selectedAstNode.content || "");
          }
          self.selectedAstNode = undefined;
        }
      }
    },
    setDragingAstNode(node: AstNodeModelType | undefined) {
      self.dragingAstNode = node;
    },
    deleteNode(node: AstNodeModelType) {
      detach(node);
    },
    newContainerNode() {
      return AstNodeModel.create({
        uuid: uuid(),
        parent: undefined,
        type: ContainerNodeType.div,
        props: {
          style: {
            width: '300px',
            height: '300px',
            backgroundColor: getRandomColor(),
          }
        }
      });
    },
    newImageNode() {
      return AstNodeModel.create({
        uuid: uuid(),
        parent: undefined,
        type: SelfClosingNodeType.img,
        props: {
          style: {
            width: '100px',
            height: '100px',
            backgroundColor: getRandomColor(),
          }
        }
      });
    },
    newTextNode() {
      return AstNodeModel.create({
        uuid: uuid(),
        parent: undefined,
        type: TextNodeType.span,
        content: 'please enter text'
      });
    },
  }));

export type EditorModelType = Instance<typeof EditorModel>;
export type EditorModelSnapshotInType = SnapshotIn<typeof EditorModel>;
export type EditorModelSnapshotOutType = SnapshotOut<typeof EditorModel>;
