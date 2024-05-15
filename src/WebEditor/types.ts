export enum ContainerNodeType {
  div = "div",
}

export enum TextNodeType {
  span = "span",
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  button = "button",
}

export enum SelfClosingNodeType {
  img = "img",
  video = "video",
}

export type ElementType =
  | ContainerNodeType
  | TextNodeType
  | SelfClosingNodeType;

export enum StyleEnum {
  width = "width",
  height = "height",
  display = "display",
  flexDirection = "flexDirection",
  justifyContent = "justifyContent",
  alignItems = "alignItems",
  color = "color",
  backgroundColor = "backgroundColor",
  position = "position",
  top = "top",
  right = "right",
  bottom = "bottom",
  left = "left",
  paddingTop = "paddingTop",
  paddingRight = "paddingRight",
  paddingBottom = "paddingBottom",
  paddingLeft = "paddingLeft",
  marginTop = "marginTop",
  marginRight = "marginRight",
  marginBottom = "marginBottom",
  marginLeft = "marginLeft",
}
