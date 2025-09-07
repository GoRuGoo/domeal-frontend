import { Flex, Heading } from "@chakra-ui/react";
import LoginButton from "./loginButton";

export default function Login() {
  return (
    <Flex align="center" justify="center" height="100vh" flexDirection="column">
      <Heading as="h1" size="xl" mb={6}>
        ログインまたは新規登録
      </Heading>
      <LoginButton />
    </Flex>
  );
}
