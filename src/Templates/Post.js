import React from "react";

const Post = ({ data }) => {
  const { title, content, thumbnail, date, author } = data._POST;
  return (
    <>
      <h1>{title}</h1>
      <img src={thumbnail} />
      <p>{author}</p>
      <p>{date}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></div>
    </>
  );
};

export default Post;
