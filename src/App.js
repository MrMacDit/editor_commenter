import React, { useState } from "react";
import ReactQuill from "react-quill";
import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css"; // import styles
import "./App.css";

function App() {
  const [editorHtml, setEditorHtml] = useState("");
  const [outputrenderedValue, setrenderedValue] = useState([]);

  const renderData = () => {
    let rawParsedData = parse(editorHtml);
    let parsedData = editorHtml === "" ? "" : rawParsedData.props.children;

    // Getting date data
    let date = new Date();
    let convertedDate = date.toLocaleString();
    console.log(convertedDate);

    let allData = {
      comment: parsedData,
      date: convertedDate,
    };

    setrenderedValue((prevRenderValue) => [...prevRenderValue, allData]);
    setEditorHtml("");
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["link", "image", "video"],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
      [{ color: [] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "indent",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "clean",
    "color",
  ];

  return (
    <div className="editor_main">
      <div className="editor">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          onChange={setEditorHtml}
        />
        <button onClick={renderData}>Enter</button>
      </div>
      {/* This line should be in a component of itself. But to save some coding time, Let me hard code it here.
      Will be adjusted in a short while */}
      <div className="div_wrapper">
        {outputrenderedValue.map((entry, index) => (
          <div key={index} className="comment_styling">
            <div className="date_styling">{entry.date}</div>
            <div className="context_styling">{entry.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
