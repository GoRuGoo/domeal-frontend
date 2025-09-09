import { useCallback, useEffect, useRef, useState } from "react";

export type RoleAction = "assign" | "get_state" | "complete";

export interface RoleActionMessage {
  action: RoleAction;
  user_id: number;
  role?: string;
}

export interface RoleMember {
  user_id: number;
  icon_url: string;
}

export interface RoleStateMessage {
  type: "role_update";
  roles: Record<string, RoleMember[]>;
  group_id: number;
}

export const useRoleWebSocket = (groupId: number, userId: number) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [roleState, setRoleState] = useState<RoleStateMessage | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  // 役割割当を送信
  const assignRole = useCallback(
    (role: string) => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
      const msg: RoleActionMessage = {
        action: "assign",
        user_id: userId,
        role,
      };
      wsRef.current.send(JSON.stringify(msg));
    },
    [userId],
  );

  // 完了通知を送信
  const completeRoles = useCallback(() => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    const msg: RoleActionMessage = { action: "complete", user_id: userId };
    wsRef.current.send(JSON.stringify(msg));
  }, [userId]);

  // WebSocket接続開始
  useEffect(() => {
    if (!groupId) return;

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(
      `${protocol}://192.168.1.20/ws/role-division?group_id=${groupId}`,
    );
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      ws.send(JSON.stringify({ action: "get_state", user_id: userId }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "role_update") {
        setRoleState(data);
      } else if (data.type === "roles_persisted") {
        alert(data.message);
      } else if (data.type === "error") {
        console.error("WebSocket error:", data.message);
      }
    };

    ws.onclose = () => {
      setConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [groupId, userId]);

  return {
    roleState,
    connected,
    assignRole,
    completeRoles,
  };
};
