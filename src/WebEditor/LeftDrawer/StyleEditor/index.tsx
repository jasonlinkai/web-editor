import styles from "./StyleEditor.module.scss";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../mobx/useMobxStateTreeStores";
import { AstNodeModelType } from "../../../mobx/AstNodeModel";
import { StyleEnum } from "../../types";
import FormItem from "../../components/FormItem";
import Select from "../../components/Select";
import Input from "../../components/Input";
import options from "../../components/Select/options";

const styleKeys: StyleEnum[] = [...Object.values(StyleEnum)];

const renderConfigs = {
  [StyleEnum.width]: {
    styleKey: StyleEnum.width,
    props: {},
    Component: Input,
    isPanelReady: true,
  },
  [StyleEnum.height]: {
    styleKey: StyleEnum.height,
    props: {},
    Component: Input,
    isPanelReady: true,
  },
  [StyleEnum.display]: {
    styleKey: StyleEnum.display,
    props: {
      options: options.display,
    },
    Component: Select,
    isPanelReady: true,
  },
  [StyleEnum.justifyContent]: {
    styleKey: StyleEnum.justifyContent,
    props: {},
    Component: Input,
    isPanelReady: true,
  },
  [StyleEnum.alignItems]: {
    styleKey: StyleEnum.alignItems,
    props: {},
    Component: Input,
    isPanelReady: true,
  },
  [StyleEnum.color]: {
    styleKey: StyleEnum.color,
    props: {},
    Component: Input,
    isPanelReady: false,
  },
  [StyleEnum.backgroundColor]: {
    styleKey: StyleEnum.backgroundColor,
    props: {},
    Component: Input,
    isPanelReady: false,
  },
  [StyleEnum.position]: {
    styleKey: StyleEnum.position,
    props: {
      options: options.position,
    },
    Component: Select,
    isPanelReady: true,
  },
  [StyleEnum.top]: {
    styleKey: StyleEnum.top,
    props: {},
    Component: Input,
    isPanelReady: true,
  },
  [StyleEnum.right]: {
    styleKey: StyleEnum.right,
    props: {},
    Component: Input,
    isPanelReady: true,
  },
  [StyleEnum.bottom]: {
    styleKey: StyleEnum.bottom,
    props: {},
    Component: Input,
    isPanelReady: true,
  },
  [StyleEnum.left]: {
    styleKey: StyleEnum.left,
    props: {},
    Component: Input,
    isPanelReady: true,
  },
  [StyleEnum.paddingTop]: {
    styleKey: StyleEnum.paddingTop,
    props: {},
    Component: Input,
    isPanelReady: true,
  },
  [StyleEnum.paddingRight]: {
    styleKey: StyleEnum.paddingRight,
    props: {},
    Component: Input,
    isPanelReady: true,
  },
  [StyleEnum.paddingBottom]: {
    styleKey: StyleEnum.paddingBottom,
    props: {},
    Component: Input,
    isPanelReady: true,
  },
  [StyleEnum.paddingLeft]: {
    styleKey: StyleEnum.paddingLeft,
    props: {},
    Component: Input,
    isPanelReady: true,
  },
  [StyleEnum.marginTop]: {
    styleKey: StyleEnum.marginTop,
    props: {},
    Component: Input,
    isPanelReady: true,
  },
  [StyleEnum.marginRight]: {
    styleKey: StyleEnum.marginRight,
    props: {},
    Component: Input,
    isPanelReady: true,
  },
  [StyleEnum.marginBottom]: {
    styleKey: StyleEnum.marginBottom,
    props: {},
    Component: Input,
    isPanelReady: true,
  },
  [StyleEnum.marginLeft]: {
    styleKey: StyleEnum.marginLeft,
    props: {},
    Component: Input,
    isPanelReady: true,
  },
};

const StyleEditor = observer(() => {
  const { editor } = useStores();
  const { selectedAstNode } = editor;
  const node = selectedAstNode as AstNodeModelType;

  return (
    <div className={styles.styleEditor}>
      <div className={styles.styleEditorTitle}>Common</div>
      {!node ? (
        <div>select node first</div>
      ) : (
        <div className={styles.styleEditorForm}>
          {styleKeys.map((styleKey) => {
            const config = renderConfigs[styleKey];
            if (!config) return null;
            const { Component, props, isPanelReady } = config;
            if (isPanelReady) return null;
            return (
              <FormItem key={styleKey}>
                <Component
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
          {node.isTextElement && (
            <FormItem>
              <Input
                label="content"
                value={node.content || ""}
                onChange={(v) => {
                  node.setContent(v);
                }}
              ></Input>
            </FormItem>
          )}
        </div>
      )}
    </div>
  );
});

export default StyleEditor;
