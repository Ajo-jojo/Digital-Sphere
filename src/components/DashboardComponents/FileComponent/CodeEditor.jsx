// import React, { useState } from 'react';

// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// import './CodeEditor.css';

// const CodeEditor = ({ fileName, data, setData }) => {
//   // const [data, setData] = useState(`\n`);

//   const codes = {
//     html: 'xml',
//     php: 'php',
//     js: 'javascript',
//     jsx: 'jsx',
//     txt: 'textile',
//     xml: 'xml',
//     css: 'css',
//     c: 'clike',
//     cpp: 'clike',
//     java: 'java',
//     cs: 'clike',
//     py: 'python',
//     json: 'javascript',
//   };

//   const handleChange = (e) => {
//     setData(e.target.value);
//   };

//   // const handleKeyDown = (evt) => {
//   //     // let value = content,

//   //     let value = data;

//   //     selStartPos = evt.currentTarget.selectionStart;

//   //     console.log(evt.currentTarget);

//   //     if (evt.key === "Tab"){
//   //         value = value.substring(0, selStartPos) + "   " + value.substring(selStartPos, value.length);
//   //         evt.currentTarget.selectionStart = selStartPos + 3;
//   //         evt.currentTarget.selectionEnd = selStartPos + 4;
//   //         evt.preventDefault();

//   //         setData(value);
//   //     }

//   const handleKeyDown = (evt) => {
//     let value = data;
//     let startPos = evt.currentTarget.selectionStart; // Use startPos instead of selStartPos

//     console.log(evt.currentTarget);

//     if (evt.key === 'Tab') {
//       value = value.substring(0, startPos) + '   ' + value.substring(startPos, value.length);
//       evt.currentTarget.selectionStart = startPos + 3;
//       evt.currentTarget.selectionEnd = startPos + 4;
//       evt.preventDefault();

//       setData(value);
//       setSelStartPos(startPos + 3); // Update selStartPos
//     }
//   };

//   return (
//     <div className="row px-5 mt-3">
//       <div className="col-md-12 mx-auto code-edit-container p-3">
//         <textarea
//           className="code-input w-100"
//           value={data}
//           onKeyDown={handleKeyDown}
//           onChange={handleChange}
//         />
//         <pre className="code-output">
//           <SyntaxHighlighter
//             language={codes[fileName.split('.')[1]]}
//             showLineNumbers
//             style={duotoneLight}
//             wrapLines
//             startingLineNumber={1}
//           >
//             {data}
//           </SyntaxHighlighter>
//         </pre>
//       </div>
//     </div>
//   );
// };

// export default CodeEditor;

import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './CodeEditor.css';

// const CodeEditor = ({ fileName, data, setData }) => {
const CodeEditor = ({ fileName, data, onChange }) => {
  const codes = {
    html: 'xml',
    php: 'php',
    js: 'javascript',
    jsx: 'jsx',
    txt: 'textile',
    xml: 'xml',
    css: 'css',
    c: 'clike',
    cpp: 'clike',
    java: 'java',
    cs: 'clike',
    py: 'python',
    json: 'javascript',
  };

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (evt) => {
    let value = data;
    let startPos = evt.currentTarget.selectionStart;

    if (evt.key === 'Tab') {
      value = value.substring(0, startPos) + '   ' + value.substring(startPos);
      evt.currentTarget.selectionStart = startPos + 3;
      evt.currentTarget.selectionEnd = startPos + 3;
      evt.preventDefault();
      setData(value);
    }
  };

  const languageKey = fileName?.split?.('.')[1]?.toLowerCase();
  const language = codes[languageKey] || 'text';

  return (
    <div className="row px-5 mt-3">
      <div className="col-md-12 mx-auto code-edit-container p-3">
        <textarea
          className="code-input w-100"
          value={data}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        <pre className="code-output">
          <SyntaxHighlighter
            language={language}
            showLineNumbers
            style={duotoneLight}
            wrapLines
            startingLineNumber={1}
          >
            {typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
          </SyntaxHighlighter>
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;
