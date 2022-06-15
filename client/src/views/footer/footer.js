import React from "react";
import {
Box,
Container,
Row,
Column,
FooterLink,
Heading,
} from "./FooterStyles";

const Footer = () => {
    return (
      
      <Container>
        <Row>
        <Column>
          <Heading>About Us</Heading>
        </Column>
        <Column>
          <Heading>Services</Heading>
        </Column>
        <Column>
          <Heading>Contact Us</Heading>
        </Column>
        <Column>
          <Heading>Social Media</Heading>
        </Column>
        </Row>
      </Container>
      
    );
};
export default Footer;
