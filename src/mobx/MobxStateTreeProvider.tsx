import React from "react";

// import { connectReduxDevtools } from "mst-middlewares";

import { IStore, RootStore } from "./RootStore";
import { testTemplate } from "../WebEditor/templates";
import { onSnapshot } from "mobx-state-tree";

const store = RootStore.create({
  ast: (testTemplate as any),
});

export const StoreContext = React.createContext<IStore>(store);

if (process.env.NODE_ENV === "development") {
  /* tslint:disable-next-line */
  // connectReduxDevtools(require("remotedev"), store);
}

export const SNAPSHOT_KEYS = {
  ROOT_STORE: "ROOT_STORE",
};

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
