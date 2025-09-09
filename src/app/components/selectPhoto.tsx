"use client";

import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";

interface SelectPhotoProps {
  query: string;
  onSelect: (s: string) => void;
  onClose: (e: boolean) => void;
}

type UnsplashPhoto = {
  id: string;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    id: string;
    name: string;
    links: {
      html: string;
    };
  };
};

export function SelectPhoto({ query, onClose, onSelect }: SelectPhotoProps) {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = () => {
    if (!selected) return;
    onSelect(selected!);
    onClose(false);
  };

  useEffect(() => {
    const searchPhotos = async () => {
      if (!query) return;
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=5&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
      );
      const data = await res.json();
      setPhotos(data.results);
    };

    searchPhotos();
  }, [query]);

  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      width="80vw"
      height="70vh"
      bg="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      zIndex={1000}
      boxShadow="lg"
      borderRadius="md"
    >
      <Box position="relative" mb={4}>
        <Text fontSize="lg" fontWeight="bold" textAlign="center" mt={4}>
          {query}
        </Text>
        <Button
          size="sm"
          position="fixed"
          top={0}
          right={0}
          m={4}
          backgroundColor="transparent"
          color="black"
          onClick={() => onClose(false)}
        >
          <LiaTimesSolid />
        </Button>
      </Box>

      <Box
        flex="1"
        overflowY="auto"
        display="flex"
        flexWrap="wrap"
        gap={2}
        p={2}
        justifyContent="center"
      >
        {photos &&
          photos.map((photo) => (
            <Image
              key={photo.id}
              src={photo.urls.small}
              alt={photo.alt_description || ""}
              boxSize="150px"
              objectFit="cover"
              border={
                selected === photo.urls.small ? "3px solid #EFB034FF" : ""
              }
              cursor="pointer"
              onClick={() => setSelected(photo.urls.small)}
            />
          ))}
      </Box>

      <Button
        position="fixed"
        bottom="3%"
        right="5%"
        borderRadius="full"
        backgroundColor="#EFB034FF"
        width="50px"
        height="50px"
        onClick={handleSelect}
      >
        決定
      </Button>
    </Box>
  );
}
