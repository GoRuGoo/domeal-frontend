import { useEffect, useRef, useState } from "react";

type ItemWithUsers = {
  id: number;
  name: string;
  selected_users: { user_id: number; icon_url: string }[];
};

type ItemSelectionMessage = {
  type: "item_selection_update";
  group_id: number;
  items: ItemWithUsers[];
};

export const useItemWebSocket = (groupId: number) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [items, setItems] = useState<ItemWithUsers[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const imageCache = useRef<Map<string, string>>(new Map());
  const [itemImages, setItemImages] = useState<Record<string, string>>({});

  const chooseItem = (receiptId: number, itemId: number) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(
      JSON.stringify({
        action: "choose",
        receipt_id: receiptId,
        item_id: itemId,
      }),
    );
  };

  const removeItem = (receiptId: number, itemId: number) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(
      JSON.stringify({
        action: "remove",
        receipt_id: receiptId,
        item_id: itemId,
      }),
    );
  };

  const completeSelection = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(
      JSON.stringify({
        action: "complete",
      }),
    );
  };

  useEffect(() => {
    if (!groupId) return;

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(
      `${protocol}://localhost/ws/select-item?group_id=${groupId}`,
    );
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      ws.send(JSON.stringify({ action: "get_items" }));
    };

    ws.onmessage = (event) => {
      const data: ItemSelectionMessage = JSON.parse(event.data);
      if (data.type === "item_selection_update") {
        setItems((prev) => {
          if (prev.length === 0) return data.items;
          const itemsMap = new Map(data.items.map((item) => [item.id, item]));
          return prev.map((item) => {
            const updated = itemsMap.get(item.id);
            return updated
              ? { ...item, selected_users: updated.selected_users }
              : item;
          });
        });
      } else if (data.type === "items_selection_completed") {
        setCompleted(true);
      }
    };

    ws.onclose = () => {
      setConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [groupId]);

  useEffect(() => {
    const fetchImage = async (query: string) => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_CUSTOM_SEARCH_API;
        const cx = process.env.NEXT_PUBLIC_CX_KEY;
        if (!apiKey || !cx) return;
        const res = await fetch(
          `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cx}&searchType=image&num=10&key=${apiKey}`,
        );
        const data = await res.json();
        const url = data.items[0].link || "";
        console.log(url);
        if (url) {
          imageCache.current.set(query, url);
          setItemImages((prev) => ({ ...prev, [query]: url }));
        }
      } catch (error) {
        console.error("Unsplash fetch error:", error);
      }
    };

    items.forEach((item) => {
      if (!imageCache.current.has(item.name)) {
        fetchImage(item.name);
      }
    });
  }, [items]);

  return {
    items,
    itemImages,
    completed,
    connected,
    chooseItem,
    removeItem,
    completeSelection,
  };
};
