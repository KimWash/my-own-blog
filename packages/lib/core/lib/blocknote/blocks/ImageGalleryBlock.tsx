import { createReactBlockSpec } from "@blocknote/react";
import { defaultProps } from "@blocknote/core";

export type GalleryImage = { url: string; mediaId?: number };

function parseImages(json: string): GalleryImage[] {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export const imageGalleryBlock = createReactBlockSpec(
  {
    type: "imageGallery",
    propSchema: {
      ...defaultProps,
      imagesJson: { default: "[]" },
      layout: { default: "row", values: ["row", "grid"] },
      columns: { default: 3 },
    },
    content: "none",
  },
  {
    render: (props) => {
      const { block, editor } = props;
      const images = parseImages(block.props.imagesJson);
      const { layout, columns } = block.props;
      const editable = editor.isEditable;

      const style =
        layout === "grid"
          ? {
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: "8px",
            }
          : { display: "flex", flexDirection: "row" as const, gap: "8px" };

      const updateImages = (next: GalleryImage[]) =>
        editor.updateBlock(block, {
          type: "imageGallery",
          props: { ...block.props, imagesJson: JSON.stringify(next) },
        });

      const addImages = async (files: FileList) => {
        const uploaded: GalleryImage[] = [];
        for (const file of Array.from(files)) {
          const url = await editor.uploadFile?.(file);
          if (url) uploaded.push({ url });
        }
        updateImages([...images, ...uploaded]);
      };

      return (
        <div className="bn-image-gallery" contentEditable={false}>
          {editable && (
            <div className="bn-image-gallery-toolbar">
              <select
                value={layout}
                onChange={(e) =>
                  editor.updateBlock(block, {
                    type: "imageGallery",
                    props: { ...block.props, layout: e.target.value },
                  })
                }
              >
                <option value="row">가로 배치</option>
                <option value="grid">그리드</option>
              </select>
              {layout === "grid" && (
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={columns}
                  onChange={(e) =>
                    editor.updateBlock(block, {
                      type: "imageGallery",
                      props: { ...block.props, columns: Number(e.target.value) },
                    })
                  }
                />
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => e.target.files && addImages(e.target.files)}
              />
            </div>
          )}
          <div style={style}>
            {images.map((image, index) => (
              <div key={image.url + index} className="bn-image-gallery-item">
                <img src={image.url} alt="" style={{ width: "100%", display: "block" }} />
                {editable && (
                  <button
                    type="button"
                    onClick={() => updateImages(images.filter((_, i) => i !== index))}
                  >
                    삭제
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    },
    toExternalHTML: (props) => {
      const images = parseImages(props.block.props.imagesJson);
      return (
        <div>
          {images.map((image, i) => (
            <img key={image.url + i} src={image.url} alt="" />
          ))}
        </div>
      );
    },
  }
);
