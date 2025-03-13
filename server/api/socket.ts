import { WebSocketServer } from "ws";

export default eventHandler((event) => {
    const { node } = event;

    if (!node.req.url?.endsWith("/api/socket")) return;

    const wss = new WebSocketServer({ noServer: true });

    node.res.writeHead(101, {
        Upgrade: "websocket",
        Connection: "Upgrade",
    });

    wss.handleUpgrade(node.req, node.req.socket, Buffer.alloc(0), (ws) => {
        console.log("✅ Клиент подключен");

        ws.on("message", (message) => {
            console.log("📩 Сообщение от клиента:", message.toString());
            ws.send(`Ответ сервера: ${message}`);
        });

        ws.on("close", () => console.log("❌ Клиент отключился"));
    });
});
