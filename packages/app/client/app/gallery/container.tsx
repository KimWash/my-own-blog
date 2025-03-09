"use client";

import fetchExtended from "@my-own-blog/core/lib/fetchExtended";
import { GalleryItem, Media } from "@my-own-blog/db";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import EXIF from "exif-js";

type GalleryItemWithMedia = GalleryItem & { media: Media };
type SelectedGalleryItem = {
  src: string;
  width: number;
  height: number;
  description: string;
};

export default function GalleryContainer() {
  const galleryItems = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      return (await fetchExtended<GalleryItemWithMedia[]>("/api/gallery")).body;
    },
  });

  const [selectedGalleryItem, setSelectedGalleryItem] =
    useState<SelectedGalleryItem>();
  const closeOverlay = () => setSelectedGalleryItem(undefined);
  return (
    <div>
      {!galleryItems.isLoading && galleryItems.data !== undefined && (
        <Gallery
          enableImageSelection={false}
          onClick={(_, item) => {
            setSelectedGalleryItem(item);
          }}
          images={galleryItems.data?.map((galleryItem) => ({
            src: `/api/media/${galleryItem.mediaId}/HIGH`,
            width: galleryItem.media.width ?? 0,
            height: galleryItem.media.height ?? 0,
            description: galleryItem.description,
          }))}
        />
      )}
      {/* 오버레이 */}
      {selectedGalleryItem && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          {/* 닫기 버튼 */}
          <button
            onClick={closeOverlay}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            {/* <X size={24} /> */}X
          </button>

          <div className="max-w-6xl mx-auto p-4">
            {/* 이미지 */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <Image
                  src={selectedGalleryItem.src}
                  alt={selectedGalleryItem.description}
                  width={selectedGalleryItem.width}
                  height={selectedGalleryItem.height}
                  className="w-full h-auto max-h-[70vh] object-contain"
                  onLoad={(event) => {
                    var allMetaData = EXIF.getAllTags(event.currentTarget);
                    console.log(allMetaData)
                    var allMetaDataSpan =
                      document.getElementById("allMetaDataSpan");
                  }}
                />
              </div>

              {/* 메타데이터 */}
              <div className="w-full md:w-72 text-white">
                <p className="text-gray-300 mb-6">
                  {selectedGalleryItem.description}
                </p>

                <div className="space-y-4">
                  {/* <div>
                    <h3 className="text-sm font-semibold text-gray-400">촬영 일자</h3>
                    <p>{selectedGalleryItem.dateTaken}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400">위치</h3>
                    <p>{selectedGalleryItem.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400">카메라</h3>
                    <p>{selectedGalleryItem.camera}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400">카메라 설정</h3>
                    <p>{selectedGalleryItem.settings}</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
