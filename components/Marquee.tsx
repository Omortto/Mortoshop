import { Container, Text } from "@chakra-ui/react";
import React from "react";
import Marquee from "react-fast-marquee";

function MyMarquee() {
  return (
    <Container p={2} bg="gray.800" color="gray.50" maxW="100%">
      <Marquee speed={50} gradient={false} pauseOnHover={true}>
        <Text fontSize="sm" textTransform="uppercase" fontWeight={200}>
          I don't know what to say I don't know what to say I don't know what to
          say I don't know what to say I don't know what to say I don't know
          what to say I don't know what to say
        </Text>
      </Marquee>
    </Container>
  );
}

export default MyMarquee;
