try {
  importScripts("./yukios-cont.sw.js");
} catch (e) {
  console.error("Failed to load YukiOS browser service worker runtime:", e);
  throw e;
}

const { route, shouldRoute } = $scramjetController;

addEventListener("fetch", (event) => {
  if (shouldRoute(event)) {
    event.respondWith(route(event));
  }
});
