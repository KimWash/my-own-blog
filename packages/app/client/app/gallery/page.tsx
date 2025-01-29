'use client';

import { Gallery } from "react-grid-gallery";

export default function GalleryPage() {
  return (
    <div>
      <Gallery images={[{
        src: "/api/media/77/HIGH",
        width: 200,
        height: 200
      }]} />
    </div>
  );
}
