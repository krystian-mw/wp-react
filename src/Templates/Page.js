import React from "react";

const Page = ({ data }) => {
  const { title, content } = data._POST;
  return (
    <>
      <h1>{title}</h1>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></div>
    </>
  );
};

export default Page;
