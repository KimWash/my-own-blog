// This is my Editorjs component, better if make a seperate component and use it

import React, { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "@/lib/editor/config";
import { File } from "@my-own-blog/db";
type EditorProps = {
  data?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
  addImage: (file: File) => void;
};

function Editor({ data, onChange, holder, addImage }: EditorProps) {
  //add a reference to editor
  const ref = useRef<EditorJS>();
  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        placeholder: "Start writting here..",
        tools: EDITOR_TOOLS(addImage),
        data,
        async onChange(api, event) {
          const content = await api.saver.save();
          // console.log(content, "sdfb");
          onChange(content);
        },
      });
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <div
        id={holder}
        style={{
          width: "100%",
          minHeight: 500,
          borderRadius: " 7px",
          background: "fff",
        }}
      />
    </>
  );
}

export default Editor;
