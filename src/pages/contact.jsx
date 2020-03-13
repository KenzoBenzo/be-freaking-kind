import React from "react";
import {
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  FormControl
} from "@chakra-ui/core";
import { Hero } from "../components/hero";
import SEO from "../components/SEO";

const ContactPage = () => {
  return (
    <>
      <SEO pageTitle='Contact' />
      <Hero text='Contact.' />
      <form
        name='contact'
        data-netlify='true'
        method='post'
        data-netlify-honeypot='bot-field'>
        <input type='hidden' name='bot-field' />
        <input type='hidden' name='form-name' value='contact' />
        <Box maxW='500px' mx='auto'>
          <FormControl>
            <FormLabel htmlFor='name'>Your Name</FormLabel>
            <Input
              type='name'
              name='name'
              aria-describedby='name-helper-text'
              mb={4}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='email'>Email address</FormLabel>
            <Input
              type='email'
              name='email'
              aria-describedby='email-helper-text'
              mb={4}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Message</FormLabel>
            <Textarea
              type='message'
              name='message'
              resize='none'
              placeholder='Type your message here...'
              mb={4}
            />
          </FormControl>
          <Button fontWeight={600} variantColor='red' type='submit' isFullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default ContactPage;
