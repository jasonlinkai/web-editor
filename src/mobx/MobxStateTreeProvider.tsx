import React from "react";

// import { connectReduxDevtools } from "mst-middlewares";

import { IStore, RootStore } from "./RootStore";
import { onSnapshot } from "mobx-state-tree";
import { pages } from "../pages/WebEditor/templates";
import { v4 } from "uuid";

console.log(v4());

export const SNAPSHOT_KEYS = {
  ROOT_STORE: "ROOT_STORE",
};

const memorizedRootStoreSnapshot = localStorage.getItem(
  SNAPSHOT_KEYS.ROOT_STORE
);

const store = RootStore.create(
  memorizedRootStoreSnapshot
    ? JSON.parse(memorizedRootStoreSnapshot)
    : {
        pages: [pages.default],
      }
);

export const StoreContext = React.createContext<IStore>(store);

if (process.env.NODE_ENV === "development") {
  /* tslint:disable-next-line */
  // connectReduxDevtools(require("remotedev"), store);
}

onSnapshot(store, (snapshot) => {
  localStorage.setItem(SNAPSHOT_KEYS.ROOT_STORE, JSON.stringify(snapshot));
});

export const MobxStateTreeStoreProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
