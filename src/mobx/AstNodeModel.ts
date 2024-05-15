import {
  types as t,
  IAnyModelType,
  Instance,
  SnapshotIn,
  SnapshotOut,
  detach,
} from "mobx-state-tree";
import { Event, EventNames } from "../WebEditor/event";
import {
  ContainerNodeType,
  SelfClosingNodeType,
  TextNodeType,
} from "../WebEditor/types";
import { StyleEnum } from "../WebEditor/types";

const AstNodeModelPropsStyle = t.model("AstNodeModelPropsStyle", {
  width: t.maybe(t.string),
  height: t.maybe(t.string),
  display: t.maybe(t.string),
  flexDirection: t.maybe(t.string),
  justifyContent: t.maybe(t.string),
  alignItems: t.maybe(t.string),
  color: t.maybe(t.string),
  fontSize: t.maybe(t.string),
  fontWeight: t.maybe(t.string),
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
    type: t.enumeration([
      ...Object.values(ContainerNodeType),
      ...Object.values(TextNodeType),
      ...Object.values(SelfClosingNodeType),
    ]),
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
    content: t.optional(t.string, ""),
  })
  .volatile<{
    isSelected: boolean;
    isDragOvered: boolean;
  }>(() => ({
    isSelected: false,
    isDragOvered: false,
  }))
  .views((self) => ({
    get isSelfCanBeDeleted() {
      return !!self.parent;
    },
    get isRootNode() {
      return self.parent === undefined;
    },
    get isContainerNode() {
      return Object.values(ContainerNodeType).includes(
        self.type as ContainerNodeType
      );
    },
    get isTextNode() {
      return Object.values(TextNodeType).includes(
        self.type as TextNodeType
      );
    },
    get isSelfClosingNode() {
      return Object.values(SelfClosingNodeType).includes(
        self.type as SelfClosingNodeType
      );
    },
  }))
  .actions((self) => ({
    setContent(content: string) {
      self.content = content;
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
    setStyle(style: Partial<SnapshotOut<AstNodeModelPropsStyleType>>) {
      self.props.style = {
        ...self.props.style,
        ...style,
      };
    },
    updateStyle({
      styleKey,
      styleValue,
    }: {
      styleKey: StyleEnum;
      styleValue: string;
    }) {
      self.props.style = {
        ...self.props.style,
        [styleKey]: styleValue,
      };
    },
    addChild(child: any) {
      child.setParent(self.uuid);
      self.children.push(child);
      return child;
    },
    deletChild(child: any) {
      detach(child);
    },
    moveChild(child: any, drop: any) {
      detach(child);
      drop.addChild(child);
    },
  }));

export type AstNodeModelType = Instance<typeof AstNodeModel>;
export type AstNodeModelSnapshotInType = SnapshotIn<typeof AstNodeModel>;
export type AstNodeModelSnapshotOutType = SnapshotOut<typeof AstNodeModel>;
