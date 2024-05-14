import styles from "./StyleEditor.module.scss";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../mobx/useMobxStateTreeStores";
import { AstNodeModelType } from "../../../mobx/AstNodeModel";
import { StyleEnum } from "../../types";
import FormItem from "../../components/FormItem";
import Select from "../../components/Select";
import Input from "../../components/Input";

const styleKeys: StyleEnum[] = [...Object.values(StyleEnum)];

const NormalText = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className={styles.styleEditorFormItem}>
      <label className={styles.styleEditorFormItemLabel}>{label}</label>
      <span className={styles.styleEditorFormItemText}>{value}</span>
    </div>
  );
};

const renderConfigs = {
  [StyleEnum.width]: {
    styleKey: StyleEnum.width,
    props: {},
    Component: Input,
  },
  [StyleEnum.height]: {
    styleKey: StyleEnum.height,
    props: {},
    Component: Input,
  },
  [StyleEnum.display]: {
    styleKey: StyleEnum.display,
    props: {},
    Component: Input,
  },
  [StyleEnum.justifyContent]: {
    styleKey: StyleEnum.justifyContent,
    props: {},
    Component: Input,
  },
  [StyleEnum.alignItems]: {
    styleKey: StyleEnum.alignItems,
    props: {},
    Component: Input,
  },
  [StyleEnum.color]: {
    styleKey: StyleEnum.color,
    props: {},
    Component: Input,
  },
  [StyleEnum.backgroundColor]: {
    styleKey: StyleEnum.backgroundColor,
    props: {},
    Component: Input,
  },
  [StyleEnum.position]: {
    styleKey: StyleEnum.position,
    props: {
      options: [
        { label: "static", value: "static" },
        { label: "relative", value: "relative" },
        { label: "absolute", value: "absolute" },
        { label: "fixed", value: "fixed" },
        { label: "sticky", value: "sticky" },
      ],
    },
    Component: Select,
  },
  [StyleEnum.top]: {
    styleKey: StyleEnum.top,
    props: {},
    Component: Input,
  },
  [StyleEnum.right]: {
    styleKey: StyleEnum.right,
    props: {},
    Component: Input,
  },
  [StyleEnum.bottom]: {
    styleKey: StyleEnum.bottom,
    props: {},
    Component: Input,
  },
  [StyleEnum.left]: {
    styleKey: StyleEnum.left,
    props: {},
    Component: Input,
  },
  [StyleEnum.paddingTop]: {
    styleKey: StyleEnum.paddingTop,
    props: {},
    Component: Input,
  },
  [StyleEnum.paddingRight]: {
    styleKey: StyleEnum.paddingRight,
    props: {},
    Component: Input,
  },
  [StyleEnum.paddingBottom]: {
    styleKey: StyleEnum.paddingBottom,
    props: {},
    Component: Input,
  },
  [StyleEnum.paddingLeft]: {
    styleKey: StyleEnum.paddingLeft,
    props: {},
    Component: Input,
  },
  [StyleEnum.marginTop]: {
    styleKey: StyleEnum.marginTop,
    props: {},
    Component: Input,
  },
  [StyleEnum.marginRight]: {
    styleKey: StyleEnum.marginRight,
    props: {},
    Component: Input,
  },
  [StyleEnum.marginBottom]: {
    styleKey: StyleEnum.marginBottom,
    props: {},
    Component: Input,
  },
  [StyleEnum.marginLeft]: {
    styleKey: StyleEnum.marginLeft,
    props: {},
    Component: Input,
  },
};

const StyleEditor = observer(() => {
  const { editor } = useStores();
  const { selectedAstNode } = editor;
  const node = selectedAstNode as AstNodeModelType;

  return (
    <div className={styles.styleEditor}>
      <div className={styles.styleEditorTitle}>Layout</div>
      {!node ? (
        <div>select node first</div>
      ) : (
        <div className={styles.styleEditorForm}>
          <FormItem>
            <NormalText label={"uuid"} value={node.uuid} />
          </FormItem>
          <FormItem>
            <NormalText label={"parent"} value={node?.parent?.uuid || ""} />
          </FormItem>
          {node.isPureTextNode ? (
            <FormItem>
              <Input
                label="content"
                value={node.content || ""}
                onChange={(v) => {
                  node.setContent(v);
                }}
              ></Input>
            </FormItem>
          ) : (
            <>
              {styleKeys.map((styleKey) => {
                const { Component, props } = renderConfigs[styleKey];
                return (
                  <FormItem>
                    <Component
                      key={styleKey}
                      label={styleKey}
                      value={`${node.props.style[styleKey] || ""}`}
                      onChange={(v) => {
                        node.updateStyle({ styleKey, styleValue: v });
                      }}
                      {...props}
                    />
                  </FormItem>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
});

export default StyleEditor;
