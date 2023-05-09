"use client";
import { Card } from "@nextui-org/react";
import React from "react";

export default function NewsList() {
  return (
    <>
      <Card>
        <Card.Image src="/assets/images/travel.jpeg" alt="image" />
        <Card.Header className="text-2xl font-semibold">
          Alone, or with mates and families, plan a trip and get your visa in few hours. 
        </Card.Header>
        <Card.Body>
         Travelling will not have the same taste anymore. welcome to the carry and go visa platform
        </Card.Body>
      </Card>
      <Card>
        <Card.Image src="/assets/images/travel2.jpeg" alt="image" />
        <Card.Header className="text-2xl font-semibold">
        Whatever the destination. Check if an e-visa is applicable and get your own visa today.
        </Card.Header>
        <Card.Body>
        No more long queues at the embassies. No more huge amounts of paperwork at the embassies. Save time with Swift Visa
        </Card.Body>
      </Card>
      <Card>
        <Card.Image src="/assets/images/travel3.jpeg" alt="image" />
        <Card.Header className="text-2xl font-semibold">
          Swift visa offers you a stress-free visa process.
        </Card.Header>
        <Card.Body>
          Free, accurate and helpful
        </Card.Body>
      </Card>
    </>
  );
}
