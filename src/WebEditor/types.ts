export enum ContainerElementType {
  div = "div",
}

export enum TextElementType {
  span = "span",
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  button = "button",
}

export enum SelfClosingElementType {
  img = "img",
  video = "video",
}

export type ElementType =
  | ContainerElementType
  | TextElementType
  | SelfClosingElementType;

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
