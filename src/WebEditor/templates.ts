import { ContainerNodeType, TextNodeType } from "./types";

export const templateDefault = {
  uuid: "5c5094a8-96a0-4467-aea4-5dec09b80582",
  parent: undefined,
  type: ContainerNodeType.div,
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
      type: TextNodeType.h1,
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

