"use client";

import { Footer } from "@/app/components/footer";
import { useUserStore } from "@/app/type";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Receipt() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const segments = pathname.split("/").filter(Boolean);
  const groupId = segments[1];
  const userId = searchParams.get("user_id");
  const myRole = searchParams.get("role");
  console.log(userId, myRole);

  const setUser = useUserStore((s) => s.setUser);
  const user = useUserStore((s) => s.user);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // const [isCameraActive, setIsCameraActive] = useState<boolean>(true);
  // const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // const handleCapture = () => {
  //   const video = videoRef.current;
  //   if (video) {
  //     const canvas = document.createElement("canvas");
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;
  //     const context = canvas.getContext("2d");

  //     if (context) {
  //       // canvasにvideoの現在のフレームを描画
  //       context.drawImage(video, 0, 0, canvas.width, canvas.height);

  //       // 描画した画像をデータURLとして取得
  //       const imageDataURL = canvas.toDataURL("image/png");
  //       setCapturedImage(imageDataURL); // 状態に画像を保存
  //       setIsCameraActive(false); // カメラを停止
  //     }
  //   }
  // };

  // const handleRetake = () => {
  //   setCapturedImage(null);
  //   setIsCameraActive(true);
  // };

  const handleConfirm = async () => {
    // if (!capturedImage) return;
    try {
      setIsUploading(true);
      // const blob = await (await fetch(capturedImage)).blob();
      const response = await fetch("/receipt.png");
      const blob = await response.blob();
      const signedRes = await fetch("/rest/issue-signed-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ group_id: String(groupId) }), // 必要に応じてパラメータ調整
      });

      if (!signedRes.ok) {
        throw new Error("署名付きURLの発行に失敗しました");
      }

      const {
        upload_url: UploadURL,
        file_key: FileKey,
        receipt_id: ReceiptID,
      } = await signedRes.json();

      const uploadRes = await fetch(UploadURL, {
        method: "PUT",
        body: blob,
        headers: { "Content-Type": "image/png" },
      });

      if (!uploadRes.ok) {
        throw new Error("S3へのアップロードに失敗しました");
      }

      console.log("アップロード成功:", { FileKey, ReceiptID });

      const ocrRes = await fetch("/rest/confirm-upload-and-start-ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ receipt_id: Number(ReceiptID) }),
      });

      if (!ocrRes.ok) {
        throw new Error("OCRに失敗しました");
      }

      const { message, status } = await ocrRes.json();
      console.log("message : status", message, status);

      setUser(user!);
      router.push(`/room/${groupId}/settlement`);
    } catch (error) {
      console.error("アップロード処理に失敗:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // useEffect(() => {
  //   if (myRole !== "shopping") return;
  //   const constraints: MediaStreamConstraints = {
  //     audio: false,
  //     video: {
  //       width: { min: 1280, ideal: 1920, max: 2560 },
  //       height: { min: 720, ideal: 1080, max: 1440 },
  //       frameRate: {
  //         max: 30,
  //       },
  //       // スマホでは以下のコメント外す
  //       facingMode: {
  //         exact: "environment",
  //       },
  //     },
  //   };

  //   const openCamera = async () => {
  //     if (isCameraActive && videoRef.current) {
  //       try {
  //         if (!navigator.mediaDevices?.getUserMedia) {
  //           console.error("このブラウザはカメラに対応していません");
  //           return;
  //         }
  //         const stream = await navigator.mediaDevices.getUserMedia(constraints);
  //         streamRef.current = stream;
  //         videoRef.current.srcObject = stream;
  //       } catch (error) {
  //         console.error("Failed to catch a camera: ", error);
  //       }
  //     }
  //   };
  //   openCamera();

  //   return () => {
  //     if (streamRef.current) {
  //       streamRef.current.getTracks().forEach((track) => track.stop());
  //     }
  //   };
  // }, [isCameraActive, myRole]);

  useEffect(() => {
    const url = `/rest/subscribe-flow?group_id=${groupId}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      if (event.data === "move_to_choice_items") {
        router.push(`/room/${groupId}/settlement`);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SEE error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [groupId, router]);

  return (
    <Flex
      direction="column"
      align="center"
      justify="space-between"
      minH="100vh"
      fontFamily="sans-serif"
      pb="100px"
      position="relative"
    >
      <Box as="header" w="100%" p={4} left="20px" position="relative">
        <Heading as="h1" size="lg" fontWeight="bold">
          {myRole === "shopping" ? "レシート登録" : "役割選択"}
        </Heading>
      </Box>

      <Flex
        direction="column"
        align="center"
        justify="center"
        flexGrow={1}
        w="100%"
        p={4}
      >
        {myRole === "shopping" ? (
          <Flex
            direction="column"
            align="center"
            justify="start"
            flexGrow={1}
            w="100%"
            p={4}
            gap={4}
          >
            <Box
              border="2px dashed"
              borderColor="#ECA517FF"
              p={2}
              borderRadius="md"
              w={{ base: "90%", sm: "80%", md: "60%" }}
              maxW="md"
              position="relative"
              overflow="hidden"
              _after={{
                content: '""',
                display: "block",
                paddingBottom: "130%",
              }}
            >
              <Image
                src="/receipt.png"
                alt="固定レシート画像"
                style={{
                  width: "calc(100% - 16px)",
                  height: "calc(100% - 16px)",
                  objectFit: "cover",
                  position: "absolute",
                  top: "8px",
                  left: "8px",
                }}
              />
            </Box>

            <Button
              bg="#ECA517FF"
              color="white"
              _hover={{ bg: "orange.500" }}
              borderRadius="lg"
              py={6}
              px={10}
              onClick={handleConfirm}
              disabled={isUploading}
            >
              進む
            </Button>

            {/* {capturedImage ? (
                <Image
                  src={capturedImage}
                  alt="Captured receipt"
                  style={{
                    width: "calc(100% - 16px)",
                    height: "calc(100% - 16px)",
                    objectFit: "cover",
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                  }}
                />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={{
                    width: "calc(100% - 24px)",
                    height: "calc(100% - 24px)",
                    objectFit: "cover",
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                  }}
                />
              )}
            </Box>

            {isCameraActive ? (
              <Button
                bg="#ECA517FF"
                borderRadius="full"
                boxSize="60px"
                aria-label="Take Photo"
                onClick={handleCapture}
              />
            ) : (
              <Box
                bg="white"
                p={4}
                w={{ base: "90%", sm: "80%", md: "60%" }}
                borderRadius="xl"
                boxShadow="lg"
                border="2px solid"
                mt={4}
                textAlign="center"
                borderColor="#ECA517FF"
              >
                <Text mb={4} fontSize="lg" fontWeight="normal">
                  この内容で登録しますか？
                </Text>

                <Flex gap={4} justifyContent="center">
                  <Button
                    bg="#DEE1E6FF"
                    color="black"
                    _hover={{ bg: "gray.400" }}
                    borderRadius="lg"
                    py={6}
                    px={10}
                    aria-label="Retake"
                    disabled={isUploading}
                    onClick={handleRetake}
                  >
                    戻る
                  </Button>
                  <Button
                    bg="#ECA517FF"
                    color="white"
                    _hover={{ bg: "orange.500" }}
                    borderRadius="lg"
                    py={6}
                    px={10}
                    aria-label="Confirm"
                    disabled={isUploading}
                    onClick={handleConfirm}
                  >
                    進む
                  </Button>
                </Flex>
              </Box>
            )} */}
          </Flex>
        ) : (
          <Box
            bg="#ECA517FF"
            color="white"
            p={10}
            borderRadius="xl"
            boxShadow="lg"
            width="60vh"
            height="70vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Text fontSize="2xl" fontWeight="bold">
              {myRole === "cooking" ? "調理" : "片付け"}
            </Text>
          </Box>
        )}
      </Flex>

      {isUploading && myRole === "shopping" && (
        <Box
          position="fixed"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="rgba(0, 0, 0, 0.4)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={9999}
        >
          <Spinner size="xl" color="#ECA517FF" />
        </Box>
      )}

      <Footer user={user!} setUser={setUser} />
    </Flex>
  );
}
