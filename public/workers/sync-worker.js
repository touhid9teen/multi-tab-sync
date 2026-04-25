/**
 * Shared Worker: The Centralized Browser Hub
 * This script runs in a single background thread shared by all tabs.
 */

let connectionCount = 0;
const ports = new Set();

self.onconnect = (event) => {
  const port = event.ports[0];
  ports.add(port);
  connectionCount++;

  // Broadcast the updated count to all tabs
  broadcast({ type: 'COUNT_UPDATE', payload: connectionCount });

  port.onmessage = (event) => {
    const { type, payload } = event.data;
    
    if (type === 'DISCONNECT') {
      ports.delete(port);
      connectionCount--;
      broadcast({ type: 'COUNT_UPDATE', payload: connectionCount });
      return;
    }

    console.log(`[SHARED_WORKER] Received: ${type}`, payload);

    // Broadcast the message to all connected ports (tabs)
    broadcast({ type, payload, timestamp: Date.now() });
  };

  port.start();
};

function broadcast(message) {
  ports.forEach((p) => {
    try {
      p.postMessage(message);
    } catch (e) {
      ports.delete(p);
      connectionCount--;
    }
  });
}
