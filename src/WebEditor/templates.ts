import { ContainerElementType, TextElementType } from "./types";
import { EventNames } from "./event";
export const templateDefault = {
  uuid: "5c5094a8-96a0-4467-aea4-5dec09b80582",
  parent: undefined,
  type: ContainerElementType.div,
  props: {
    className: "",
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      paddingTop: "1rem",
      paddingRight: "1rem",
      paddingBottom: "1rem",
      paddingLeft: "1rem",
    },
  },
  events: {},
  children: [
    {
      uuid: "561773be-c7c9-4458-9cfb-c3db5972e5e9",
      parent: "5c5094a8-96a0-4467-aea4-5dec09b80582",
      type: TextElementType.h1,
      props: {
        className: "",
        style: {
          color: "black",
        },
      },
      events: {},
      children: [],
      content: 'Default Template',
    },
  ],
};

export const template1 = {
  uuid: "5c5094a8-96a0-4467-aea4-5dec09b80582",
  parent: undefined,
  type: ContainerElementType.div,
  props: {
    className: "container",
    style: {
      width: "100%",
      height: "100%",
      backgroundColor: "yellow",
    },
  },
  events: {
    onClick: {
      type: EventNames.NAVIGATE,
      payload: { path: "/about!" },
    },
  },
  children: [
    {
      uuid: "561773be-c7c9-4458-9cfb-c3db5972e5e9",
      parent: "5c5094a8-96a0-4467-aea4-5dec09b80582",
      type: ContainerElementType.div,
      props: {
        className: "",
        style: {
          width: "300px",
          height: "300px",
          backgroundColor: "blue",
        },
      },
      events: {},
      children: [],
    },
    {
      uuid: "a6ccca86-655b-4907-98f9-9aeee1b51f9f",
      parent: "5c5094a8-96a0-4467-aea4-5dec09b80582",
      type: TextElementType.button,
      props: {
        style: {
          color: "blue",
          width: "100px",
        },
      },
      events: {
        onClick: {
          type: EventNames.NAVIGATE,
          payload: { path: "/test!" },
        },
      },
      children: [],
      content: 'test',
    },
  ],
};
