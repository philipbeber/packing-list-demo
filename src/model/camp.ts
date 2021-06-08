import { Draft } from "@reduxjs/toolkit";
import { CampOperations } from "./campOperations";
import { Item } from "./item";
import { List } from "./list";

export class Camp {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly lists: List[] = []
  ) {}
}

export function applyOperationToCamp(
  camp: Draft<Camp>,
  operation: CampOperations
) {
  switch (operation.type) {
    case "CREATE_CAMP_LIST": {
      camp.lists.push(new List(operation.listId, operation.name));
      return;
    }
    case "CREATE_CAMP_ITEM": {
      const list = camp.lists.find((l) => l.id === operation.listId);
      if (list) {
        list.items.push(new Item(operation.itemId, operation.name));
      }
      return;
    }
    case "CHANGE_CAMP_ITEM_STATE": {
      const pl = operation;
      return transformItems(camp, pl.listId, pl.itemIds, (item) => {
        if (item.state !== pl.state) {
          item.state = pl.state;
        }
      });
    }
    case "CHANGE_CAMP_ITEM_DELETED": {
      const pl = operation;
      return transformItems(camp, pl.listId, pl.itemIds, (item) => {
        if (item.deleted !== pl.deleted) {
          item.deleted = pl.deleted;;;
        }
      });
    }
    default: {
      throw Error("Unknown operation " + JSON.stringify(operation));
    }
  }
}

function transformItems(
  camp: Camp,
  listId: string,
  itemIds: string[],
  transform: (item: Item) => void
) {
  const list = camp?.lists.find((l) => l.id === listId);
  if (!list) {
    return;
  }
  list.items.forEach((item) => {
    if (itemIds.indexOf(item.id) >= 0) {
      transform(item);
    }
  });
}
