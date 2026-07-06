import EXIF from "exif-js";

export const loadImage = (file: File): Promise<Record<string, unknown>> =>
  new Promise((res) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const image = new Image();
      image.onload = function () {
        EXIF.getData(image as unknown as string, function (this: unknown) {
          const exifData = EXIF.getAllTags(this);
          res(exifData);
        });
      };
      image.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
