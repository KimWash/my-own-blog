import MenuService from "@my-own-blog/core/service/MenuService";
import { NextResponse } from "next/server";


export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
    const menus  = await MenuService.getMenus();
  return NextResponse.json(menus);
}
