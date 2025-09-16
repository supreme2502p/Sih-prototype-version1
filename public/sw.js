const CACHE_NAME = "dbt-pwa-v1"
const STATIC_CACHE = "dbt-static-v1"
const DYNAMIC_CACHE = "dbt-dynamic-v1"

// Files to cache immediately
const STATIC_FILES = ["/", "/check", "/tutorial", "/notifications", "/manifest.json", "/icon-192.jpg", "/icon-512.jpg"]

// API endpoints that can work offline
const API_CACHE_PATTERNS = ["/api/mock-data", "/api/health"]

// Install event - cache static files
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker...")

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("[SW] Caching static files")
        return cache.addAll(STATIC_FILES)
      })
      .then(() => {
        console.log("[SW] Static files cached successfully")
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error("[SW] Failed to cache static files:", error)
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker...")

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log("[SW] Deleting old cache:", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        console.log("[SW] Service worker activated")
        return self.clients.claim()
      }),
  )
})

// Fetch event - serve cached content when offline
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle API requests
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(handleApiRequest(request))
    return
  }

  // Handle navigation requests
  if (request.mode === "navigate") {
    event.respondWith(handleNavigationRequest(request))
    return
  }

  // Handle other requests (CSS, JS, images, etc.)
  event.respondWith(handleResourceRequest(request))
})

// Handle API requests with cache-first strategy for specific endpoints
async function handleApiRequest(request) {
  const url = new URL(request.url)

  // Check if this API endpoint should be cached
  const shouldCache = API_CACHE_PATTERNS.some((pattern) => url.pathname.includes(pattern))

  if (shouldCache) {
    try {
      // Try cache first
      const cachedResponse = await caches.match(request)
      if (cachedResponse) {
        console.log("[SW] Serving API from cache:", url.pathname)
        return cachedResponse
      }

      // If not in cache, fetch and cache
      const response = await fetch(request)
      if (response.ok) {
        const cache = await caches.open(DYNAMIC_CACHE)
        cache.put(request, response.clone())
        console.log("[SW] API response cached:", url.pathname)
      }
      return response
    } catch (error) {
      console.log("[SW] API request failed, serving offline response:", error)
      return new Response(
        JSON.stringify({
          success: false,
          error: "Offline - Please check your internet connection",
          offline: true,
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  }

  // For other API requests, try network first
  try {
    return await fetch(request)
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Service unavailable - Please try again when online",
        offline: true,
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

// Handle navigation requests with cache-first strategy
async function handleNavigationRequest(request) {
  try {
    // Try network first for navigation
    const response = await fetch(request)

    // Cache successful responses
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, response.clone())
    }

    return response
  } catch (error) {
    console.log("[SW] Navigation request failed, serving from cache")

    // Try to serve from cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // If specific page not cached, serve the main page
    const mainPage = await caches.match("/")
    if (mainPage) {
      return mainPage
    }

    // Last resort - offline page
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Offline - DBT Account Checker</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { 
              font-family: system-ui, sans-serif; 
              text-align: center; 
              padding: 2rem;
              background: #f9fafb;
            }
            .container {
              max-width: 400px;
              margin: 0 auto;
              background: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .icon { font-size: 3rem; margin-bottom: 1rem; }
            h1 { color: #0891b2; margin-bottom: 1rem; }
            p { color: #6b7280; line-height: 1.5; }
            button {
              background: #0891b2;
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 6px;
              cursor: pointer;
              margin-top: 1rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon">📱</div>
            <h1>You're Offline</h1>
            <p>The DBT Account Checker is available offline! Some features may be limited without an internet connection.</p>
            <button onclick="window.location.reload()">Try Again</button>
          </div>
        </body>
      </html>
      `,
      {
        headers: { "Content-Type": "text/html" },
      },
    )
  }
}

// Handle resource requests (CSS, JS, images) with cache-first strategy
async function handleResourceRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // If not in cache, fetch and cache
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    // If it's an image, return a placeholder
    if (request.destination === "image") {
      return new Response(
        '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#f3f4f6"/><text x="100" y="100" text-anchor="middle" fill="#9ca3af">Offline</text></svg>',
        { headers: { "Content-Type": "image/svg+xml" } },
      )
    }

    throw error
  }
}

// Background sync for when connection is restored
self.addEventListener("sync", (event) => {
  console.log("[SW] Background sync triggered:", event.tag)

  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  console.log("[SW] Performing background sync...")
  // Here you could sync any pending data when connection is restored
  // For now, we'll just log that sync is available
}

// Push notification handling (for future use)
self.addEventListener("push", (event) => {
  console.log("[SW] Push notification received")

  const options = {
    body: "Your DBT account status has been updated",
    icon: "/icon-192.jpg",
    badge: "/icon-192.jpg",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  }

  event.waitUntil(self.registration.showNotification("DBT Account Checker", options))
})
