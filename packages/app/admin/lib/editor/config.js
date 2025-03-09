import Code from '@calumk/editorjs-codecup';
import ImageTool from '@editorjs/image';
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import fetchExtended from "@my-own-blog/core/lib/fetchExtended";
import EXIF from 'exif-js'

/**
 * 
 * @param {File} file 
 * @returns 
 */
export const loadImage = (file) => new Promise((res) => {
  const reader = new FileReader();
                
  reader.onload = function(e) {
      const image = new Image();
      image.onload = function() {
          EXIF.getData(image, function() {
              const exifData = EXIF.getAllTags(this);
              res(exifData)
          });
      };
      image.src = e.target.result;
  };
  
  reader.readAsDataURL(file);
})

export const EDITOR_TOOLS = (onAddImage) => ({
  code: Code,
  paragraph: { class: Paragraph, inlineToolbar: true },
  header: Header,
  list: List,
  quote: Quote,
  table: Table,
  inlineCode: InlineCode,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        /**
         * Upload file to the server and return an uploaded image data
         * @param {File} file - file selected from the device or pasted by drag-n-drop
         * @return {Promise.<{success, file: {url}}>}
         */
        async uploadByFile(file) {
          try {
            const exif = await loadImage(file)
            const { body: presignResult } = await fetchExtended(`/api/media?filename=${file.name}`, {method: 'POST', body: {exif}});

            await fetch(presignResult.preSignedUrl, {
              method: "PUT",
              body: file,
            });
            onAddImage(presignResult.file)
            return {
              success: 1,
              file: {
                url: `/api/media/${presignResult.file.mediaId}/HIGH`
              }
            };
          } catch (e) {
            console.log(e);
            return {
              success: 0,
            };
          }
        }, uploadByUrl(url) {
          // URL을 그대로 반환
          return Promise.resolve({
            success: 1,
            file: {
              url: url,
            }
          });
        }


      }
    }
  }
});
