
import { MenuItem } from "@my-own-blog/core/types/Menu";
import db from "@my-own-blog/db";

export default class MenuService {
  static async getMenus() {
    const categories = await db.category.findMany({
      include: { parent: true },
    });
    const rootMenus = categories
      .filter((cat) => cat.parent_id == null)
      .map(
        (m) =>
          ({
            id: m.id,
            name: m.name,
            type: m.type,
            url: `${m.type}/category/${m.id}`,
            children: [],
          } as MenuItem)
      );
    const groupedCategories = categories
      .filter((cat) => cat.parent_id != null)
      .reduce((acc, curr) => {
        return acc.map((item) =>
          item.id === curr.parent_id
            ? {
                ...item,
                children: [
                  ...item.children,
                  {
                    id: curr.id,
                    name: curr.name,
                    type: curr.type,
                    url: `${curr.type}/category/${curr.parent?.id}/${curr.id}`,
                    children: [],
                  },
                ],
              }
            : item
        );
      }, rootMenus);
      // console.log(groupedCategories)
    return groupedCategories;
  }
}
