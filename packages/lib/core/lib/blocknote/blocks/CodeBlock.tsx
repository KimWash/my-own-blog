import { createReactBlockSpec } from "@blocknote/react";
import { defaultProps } from "@blocknote/core";
import { CODE_LANGUAGES, highlightCode } from "../prismLanguages";

export const codeBlock = createReactBlockSpec(
  {
    type: "codeBlock",
    propSchema: {
      ...defaultProps,
      language: { default: "text", values: CODE_LANGUAGES as unknown as string[] },
      code: { default: "" },
    },
    content: "none",
  },
  {
    render: (props) => {
      const { block, editor } = props;
      const { code, language } = block.props;
      const editable = editor.isEditable;

      if (!editable) {
        return (
          <pre className="bn-code-block" data-language={language}>
            <code
              dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
            />
          </pre>
        );
      }

      return (
        <div className="bn-code-block bn-code-block-editable" data-language={language}>
          <select
            className="bn-code-block-language"
            value={language}
            onChange={(e) =>
              editor.updateBlock(block, {
                type: "codeBlock",
                props: { ...block.props, language: e.target.value },
              })
            }
            contentEditable={false}
          >
            {CODE_LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <textarea
            className="bn-code-block-textarea"
            spellCheck={false}
            value={code}
            onChange={(e) =>
              editor.updateBlock(block, {
                type: "codeBlock",
                props: { ...block.props, code: e.target.value },
              })
            }
          />
        </div>
      );
    },
    toExternalHTML: (props) => (
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: highlightCode(props.block.props.code, props.block.props.language),
          }}
        />
      </pre>
    ),
  }
);
