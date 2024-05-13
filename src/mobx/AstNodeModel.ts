import {
  types as t,
  IAnyModelType,
  Instance,
  SnapshotIn,
  SnapshotOut,
  detach,
} from "mobx-state-tree";
import { Event, EventNames } from "../WebEditor/event";
import { ElementType } from "../WebEditor/types";
import { StyleEnum } from "../WebEditor/types";

const AstNodeModelPropsStyle = t.model("AstNodeModelPropsStyle", {
  width: t.maybe(t.string),
  height: t.maybe(t.string),
  display: t.maybe(t.string),
  justifyContent: t.maybe(t.string),
  alignItems: t.maybe(t.string),
  color: t.maybe(t.string),
  backgroundColor: t.maybe(t.string),
  position: t.maybe(t.string),
  top: t.maybe(t.string),
  right: t.maybe(t.string),
  bottom: t.maybe(t.string),
  left: t.maybe(t.string),
  paddingTop: t.maybe(t.string),
  paddingRight: t.maybe(t.string),
  paddingBottom: t.maybe(t.string),
  paddingLeft: t.maybe(t.string),
  marginTop: t.maybe(t.string),
  marginRight: t.maybe(t.string),
  marginBottom: t.maybe(t.string),
  marginLeft: t.maybe(t.string),
});

export type AstNodeModelPropsStyleType = Instance<
  typeof AstNodeModelPropsStyle
>;
export type AstNodeModelPropsStyleSnapshotInType = SnapshotIn<
  typeof AstNodeModelPropsStyle
>;
export type AstNodeModelPropsStyleSnapshotOutType = SnapshotOut<
  typeof AstNodeModelPropsStyle
>;

const AstNodeModelProps = t.model("AstNodeModelProps", {
  className: t.optional(t.string, ""),
  style: t.optional(AstNodeModelPropsStyle, {}),
});

export const AstNodeModel = t
  .model("AstNodeModel", {
    uuid: t.identifier,
    parent: t.maybe(t.reference(t.late((): IAnyModelType => AstNodeModel))),
    type: t.enumeration([...Object.values(ElementType)]),
    events: t.optional(
      t.frozen<{
        onClick?: Event<EventNames>;
      }>({}),
      {}
    ),
    props: t.optional(AstNodeModelProps, {}),
    children: t.optional(
      t.array(t.late((): IAnyModelType => AstNodeModel)),
      []
    ),
    content: t.optional(t.string, ''),
  })
  .volatile<{
    isSelected: boolean;
    isDragOvered: boolean;
    editingStyle: Partial<SnapshotOut<AstNodeModelPropsStyleType>>;
    editingContent: string;
  }>(() => ({
    isSelected: false,
    isDragOvered: false,
    editingStyle: {},
    editingContent: "",
  }))
  .views((self) => ({
    get isRootNode() {
      return self.parent === undefined;
    },
    get isPureTextNode() {
      return self.type === ElementType["pure-text"];
    },
    get isChanged() {
      if (self.content !== self.editingContent) {
        console.log('content...');
        return true;
      }
      if (
        JSON.stringify(self.props.style) !== JSON.stringify(self.editingStyle)
      ) {
        console.log('style...');
        return true;
      }
      return false;
    },
  }))
  .actions((self) => ({
    setEditingContent(content: string) {
      self.editingContent = content;
    },
    setParent(uuid: string) {
      self.parent = uuid;
    },
    setIsSelected(v: boolean) {
      self.isSelected = v;
    },
    setIsDragOvered(v: boolean) {
      self.isDragOvered = v;
    },
    save() {
      if (self.isChanged) {
        self.props.style = AstNodeModelPropsStyle.create(self.editingStyle);
        if (self.isPureTextNode) {
          self.content = self.editingContent;
        }
      }
    },
    setEditingStyle(
      editingStyle: Partial<SnapshotOut<AstNodeModelPropsStyleType>>
    ) {
      self.editingStyle = editingStyle;
    },
    updateEditingStyle({
      styleKey,
      styleValue,
    }: {
      styleKey: StyleEnum;
      styleValue: string;
    }) {
      self.editingStyle = {
        ...self.editingStyle,
        [styleKey]: styleValue,
      };
    },
    addChild(child: any) {
      child.setParent(self.uuid);
      self.children.push(child);
      return child;
    },
    removeChild(child: any, drop: any) {
      detach(child);
      drop.addChild(child);
    },
  }));

export type AstNodeModelType = Instance<typeof AstNodeModel>;
export type AstNodeModelSnapshotInType = SnapshotIn<typeof AstNodeModel>;
export type AstNodeModelSnapshotOutType = SnapshotOut<typeof AstNodeModel>;
