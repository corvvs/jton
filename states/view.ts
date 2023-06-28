import { JsonRowItem } from '@/libs/jetson';
import { atom, useAtom } from 'jotai';
import _ from 'lodash';
import { useVisibleItems, useJSON } from './json';

export type ToggleState = { [index: number]: boolean };

export const toggleAtom = atom<ToggleState>({});

export function useToggleSingle() {
  const [toggleState, setToggleState] = useAtom(toggleAtom);

  const toggleItem = (item: JsonRowItem, isClosed: boolean) => {
    setToggleState((prev) => {
      const next = _.cloneDeep(prev);
      if (isClosed) {
        next[item.index] = isClosed;
      } else {
        delete next[item.index];
      }
      return next;
    });
  };

  return {
    toggleState,
    toggleItem,
  };
}


export function useToggleMass() {
  const [toggleState, setToggleState] = useAtom(toggleAtom);
  const { flatJsons } = useJSON();
  const visibles = useVisibleItems();

  const openAll = () => {
    if (!visibles) { return; }
    if (visibles.filteredItems.length === flatJsons?.items.length) {
      setToggleState((prev) => {
        const next = _.cloneDeep(prev);
        for (const item of flatJsons.items) {
          delete next[item.index];
        }
        return next;
      });
    } else {
      setToggleState({});
    }
  };

  const closeAll = () => {
    if (!visibles) { return; }
    setToggleState((prev) => {
      const next = _.cloneDeep(prev);
      for (const item of visibles.filteredItems) {
        if (item.rowItems.length === 0) { continue; }
        const isTogglable = item.right.type === "array" || item.right.type === "map";
        if (isTogglable) {
          next[item.index] = true;
        }
      }
      return next;
    });
  };

  const clearToggleState = () => openAll();

  return {
    toggleState,
    openAll,
    closeAll,
    clearToggleState,
  };
}
