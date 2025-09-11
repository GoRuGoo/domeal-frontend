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
  }

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

  return {
    items,
    completed,
    connected,
    chooseItem,
    removeItem,
    completeSelection,
  };
};
