import { Input, InputGroup } from "@chakra-ui/react";
import { HiMagnifyingGlass } from "react-icons/hi2";

export function SearchInput() {
  return (
    <InputGroup
      startElement={<HiMagnifyingGlass />}
      width="350px"
      height="52px"
      left="20px"
      marginTop="20px"
      borderRadius="8px"
      background="#F3F4F6FF"
    >
      <Input
        placeholder="メニューを検索"
        paddingLeft="52px"
        paddingRight="20px"
        fontFamily="Poppins"
        fontSize="18px"
        lineHeight="28px"
        fontWeight="400"
        border="none"
        outline="none"
        _focus={{
          boxShadow: "none",
          border: "none",
        }}
      />
    </InputGroup>
  );
}
