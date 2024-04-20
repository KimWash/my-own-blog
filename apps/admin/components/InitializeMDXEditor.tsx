"use client";
import CodePreview from "@core/components/CodePreview";
// InitializedMDXEditor.tsx
import type { ChangeEvent, ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  ListsToggle,
  BlockTypeSelect,
  InsertThematicBreak,
  type MDXEditorMethods,
  type MDXEditorProps,
  imagePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  InsertCodeBlock,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  useCodeBlockEditorContext,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        imagePlugin({
          imageUploadHandler: () => {
            return Promise.resolve("https://picsum.photos/200/300");
          },
          imageAutocompleteSuggestions: [
            "https://picsum.photos/200/300",
            "https://picsum.photos/200",
          ],
        }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", css: "CSS" },
        }),
        codeBlockPlugin({
          defaultCodeBlockLanguage: "js",
          codeBlockEditorDescriptors: [
            {
              // always use the editor, no matter the language or the meta of the code block
              match: (language, meta) => true,
              // You can have multiple editors with different priorities, so that there's a "catch-all" editor (with the lowest priority)
              priority: 0,
              // The Editor is a React component
              Editor: (props) => {
                const cb = useCodeBlockEditorContext();
                // stops the proppagation so that the parent lexical editor does not handle certain events.
                return (
                  <div
                    contentEditable
                    onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}
                    onInput={(e: ChangeEvent<HTMLDivElement>) =>{
                      console.log(e.target.innerText)
                      cb.setCode(e.target.innerText)
                    }}
                  >
                    <CodePreview language={props.language}>
                      {props.code}
                    </CodePreview>
                  </div>
                );
              },
            },
          ],
        }),
        
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {" "}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <CodeToggle />
              <CreateLink />
              <InsertImage />
              <InsertTable />
              <InsertThematicBreak />
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    fallback: () => (
                      <>
                        <InsertCodeBlock />
                      </>
                    ),
                  },
                ]}
              />
            </>
          ),
        }),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
