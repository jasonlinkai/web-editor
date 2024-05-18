import { types as t, Instance } from "mobx-state-tree";
import { PageModel, PageModelType } from "./PageModel";

export const RootStore = t
  .model("RootStore", {
    pages: t.optional(t.array(PageModel), []),
    selectedPage: t.maybe(t.safeReference(PageModel)),
  })
  .actions((self) => {
    const setSelectedPage = (page: PageModelType) => {
      self.selectedPage = page;
    };
    return {
      setSelectedPage,
    };
  });

export interface IStore extends Instance<typeof RootStore> {}
