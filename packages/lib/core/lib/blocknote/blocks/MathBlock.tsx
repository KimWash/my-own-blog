import { createReactBlockSpec } from "@blocknote/react";
import { defaultProps } from "@blocknote/core";
import katex from "katex";
import "katex/dist/katex.min.css";

function renderKatex(code: string): string {
  try {
    return katex.renderToString(code, { throwOnError: false, displayMode: true });
  } catch (e) {
    return code;
  }
}

export const mathBlock = createReactBlockSpec(
  {
    type: "math",
    propSchema: {
      ...defaultProps,
      code: { default: "" },
    },
    content: "none",
  },
  {
    render: (props) => {
      const { block, editor } = props;
      const { code } = block.props;
      const editable = editor.isEditable;

      if (!editable) {
        return (
          <div
            className="bn-math-block"
            dangerouslySetInnerHTML={{ __html: renderKatex(code) }}
          />
        );
      }

      return (
        <div className="bn-math-block bn-math-block-editable">
          <textarea
            className="bn-math-block-textarea"
            placeholder="LaTeX source, e.g. E = mc^2"
            spellCheck={false}
            value={code}
            onChange={(e) =>
              editor.updateBlock(block, {
                type: "math",
                props: { ...block.props, code: e.target.value },
              })
            }
          />
          <div
            className="bn-math-block-preview"
            dangerouslySetInnerHTML={{ __html: renderKatex(code) }}
          />
        </div>
      );
    },
    toExternalHTML: (props) => (
      <div dangerouslySetInnerHTML={{ __html: renderKatex(props.block.props.code) }} />
    ),
  }
);
