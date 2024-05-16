import {
  types as t,
  Instance,
  SnapshotIn,
  SnapshotOut,
  getSnapshot,
  detach,
} from "mobx-state-tree";
import { AstNodeModel } from "./AstNodeModel";
import type {
  AstNodeModelSnapshotInType,
  AstNodeModelType,
} from "./AstNodeModel";
import { v4 as uuid } from "uuid";
import {
  ContainerNodeType,
  SelfClosingNodeType,
  TextNodeType,
} from "../WebEditor/types";
import { getRandomColor } from "../WebEditor/utils";

const SnippetEnhencedModel = t
  .model("SnippetEnhencedModel", {
    alias: t.optional(t.string, ""),
  })
  .actions((self) => {
    const setAlias = (alias: string) => {
      self.alias = alias;
    };
    return { setAlias };
  });

export type SnippetEnhencedModelType = Instance<typeof SnippetEnhencedModel>;
export type SnippetEnhencedModelSnapshotInType = SnapshotIn<
  typeof SnippetEnhencedModel
>;
export type SnippetEnhencedModelSnapshotOutType = SnapshotOut<
  typeof SnippetEnhencedModel
>;

const SnippetAstNodeModel = t
  .compose(AstNodeModel, SnippetEnhencedModel)
  .actions((self) => {
    const afterCreate = () => {
      if (!self.alias) {
        self.alias = self.uuid;
      }
    };
    return {
      afterCreate,
    };
  });

export type SnippetAstNodeModelType = Instance<typeof SnippetAstNodeModel>;
export type SnippetAstNodeModelSnapshotInType = SnapshotIn<
  typeof SnippetAstNodeModel
>;
export type SnippetAstNodeModelSnapshotOutType = SnapshotOut<
  typeof SnippetAstNodeModel
>;

export const EditorModel = t
  .model("EditorModel", {
    selectedAstNode: t.maybe(t.safeReference(AstNodeModel)),
    dragingAstNode: t.maybe(t.safeReference(AstNodeModel)),
    snippets: t.optional(t.array(SnippetAstNodeModel), []),
  })
  .volatile<{ isLeftDrawerOpen: boolean; isRightDrawerOpen: boolean }>(() => ({
    isLeftDrawerOpen: true,
    isRightDrawerOpen: true,
  }))
  .actions((self) => {
    const recursiveClearUuid = (
      ast: AstNodeModelSnapshotInType,
      parentUuid?: string
    ) => {
      ast.uuid = uuid();
      ast.parent = parentUuid;
      if (ast.children) {
        ast.children.forEach((child) => {
          recursiveClearUuid(child, ast.uuid);
        });
      }
      return ast;
    };
    return {
      recursiveClearUuid,
    };
  })
  .actions((self) => ({
    deleteSnippet(snippet: SnippetAstNodeModelType) {
      detach(snippet);
    },
    pushToSnippets(snippet: AstNodeModelType) {
      const snapshot = getSnapshot(snippet);
      const clearedSnapshot = self.recursiveClearUuid(
        JSON.parse(JSON.stringify(snapshot)),
        undefined
      );
      const newSnippetAstNode = SnippetAstNodeModel.create(clearedSnapshot);
      console.log(getSnapshot(newSnippetAstNode));
      self.snippets.push(clearedSnapshot);
    },
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
            width: "300px",
            height: "300px",
            backgroundColor: getRandomColor(),
          },
        },
      });
    },
    newImageNode() {
      const id = uuid();
      return AstNodeModel.create({
        uuid: id,
        parent: undefined,
        type: SelfClosingNodeType.img,
        props: {
          style: {
            width: "100px",
            height: "100px",
            backgroundColor: getRandomColor(),
          },
          attributes: {
            src: "",
            alt: id,
          },
        },
      });
    },
    newTextNode() {
      return AstNodeModel.create({
        uuid: uuid(),
        parent: undefined,
        type: TextNodeType.span,
        props: {
          style: {
            display: "block",
          },
        },
        content: "please enter text",
      });
    },
  }));

export type EditorModelType = Instance<typeof EditorModel>;
export type EditorModelSnapshotInType = SnapshotIn<typeof EditorModel>;
export type EditorModelSnapshotOutType = SnapshotOut<typeof EditorModel>;
