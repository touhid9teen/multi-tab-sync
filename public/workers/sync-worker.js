/**
 * Shared Worker: The Centralized Browser Hub
 * This script runs in a single background thread shared by all tabs.
 */

const ports = new Set();

self.onconnect = (event) => {
  const port = event.ports[0];
  ports.add(port);

  port.onmessage = (event) => {
    const { type, payload } = event.data;
    
    console.log(`[SHARED_WORKER] Received: ${type}`, payload);

    // Broadcast the message to all connected ports (tabs) except the sender
    // though in many cases we broadcast to all to simplify state management
    ports.forEach((p) => {
      // Check if port is still active (though Set doesn't handle this automatically)
      try {
        p.postMessage({ type, payload, timestamp: Date.now() });
      } catch (e) {
        ports.delete(p);
      }
    });
  };

  port.start();
};
