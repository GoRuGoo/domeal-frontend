"use client";

import { Input, InputGroup } from "@chakra-ui/react";
import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Group } from "../type";

interface SearchInputProps {
  groups: Group[];
  onUpdate: (filterd: Group[]) => void;
}

export function SearchInput({ groups, onUpdate }: SearchInputProps) {
  const [name, setName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setName(input);

    const filtered = input
      ? groups.filter((group) =>
          group.name.toLowerCase().includes(input.toLowerCase()),
        )
      : groups; // 空文字なら全件表示

    onUpdate(filtered);
  };

  return (
    <InputGroup
      startElement={<HiMagnifyingGlass />}
      width="calc(100% - 40px)"
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
        fontSize="18px"
        lineHeight="28px"
        fontWeight="400"
        border="none"
        outline="none"
        _focus={{
          boxShadow: "none",
          border: "none",
        }}
        value={name}
        onChange={handleChange}
      />
    </InputGroup>
  );
}
