"use client";
import { Card } from "@nextui-org/react";
import React from "react";

export default function NewsList() {
  return (
    <>
      <Card>
        <Card.Image src="/assets/images/travel.jpeg" alt="image" />
        <Card.Header className="text-2xl font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing
        </Card.Header>
        <Card.Body>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, enim
          in laborum deserunt fugiat tempora.
        </Card.Body>
      </Card>
      <Card>
        <Card.Image src="/assets/images/travel2.jpeg" alt="image" />
        <Card.Header className="text-2xl font-semibold">
          Consectetur adipisicing elit. Dicta, veniam.
        </Card.Header>
        <Card.Body>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, enim
          in laborum deserunt fugiat tempora.
        </Card.Body>
      </Card>
      <Card>
        <Card.Image src="/assets/images/travel3.jpeg" alt="image" />
        <Card.Header className="text-2xl font-semibold">
          Lorem ipsum dpisicing elit. Dicta, veniam.
        </Card.Header>
        <Card.Body>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, enim
          in laborum deserunt fugiat tempora.
        </Card.Body>
      </Card>
    </>
  );
}
