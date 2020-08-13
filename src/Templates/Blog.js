import React from "react";

import { Link } from 'react-router-dom'

import { Container, Col, Row, Card } from "reactstrap";

const Blog = ({ data }) => {
  const { title, content } = data._POST;
  let posts = [];
  data._POSTS.forEach((post) => {
    posts.push(
      <Col>
        <Row className="shadow p-3 mb-5 bg-white rounded no-gutters border position-relative">
          <Col sm={12} md={6} lg={4}>
            <img src={post.thumbnail} className="w-100 h-auto rounded shadow" />
          </Col>
          <Col className="p-4 position-static">
            <Row>
              <Col>
                <h3 className="mb-0">{post.title}</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>{post.date}</p>
              </Col>
            </Row>
            <Row>
              <Col dangerouslySetInnerHTML={{ __html: post.content }}></Col>
            </Row>
            <Row>
              <Col className="position-static">
                <Link to={post.link} className="stretched-link">Read more ...</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    );
  });
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: data.title,
        }}
      ></div>
      <div
        dangerouslySetInnerHTML={{
          __html: data.content,
        }}
      ></div>
      <Container fluid>
        <Row>{posts}</Row>
      </Container>
    </>
  );
};

export default Blog;
