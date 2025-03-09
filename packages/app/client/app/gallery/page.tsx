import { Gallery } from "react-grid-gallery";
import GalleryContainer from "./container";
import getDehydratedQuery from "@my-own-blog/core/lib/query/getDehydratedQuery";

import fetchExtended from "@my-own-blog/core/lib/fetchExtended";
import { Media } from "@my-own-blog/db";
import { Hydration } from "@my-own-blog/core/lib/query/Hydration";

export default async function GalleryPage() {
  const galleryQuery = await getDehydratedQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      return (await fetchExtended<Media[]>("/api/gallery")).body;
    },
  });

  return (
    <Hydration queries={[galleryQuery]}>
      <GalleryContainer />
    </Hydration>
  );
}
