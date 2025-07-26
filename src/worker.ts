// Cloudflare Workers entry point for serving the React app
export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle API routes if any (can be extended later)
    if (url.pathname.startsWith('/api/')) {
      return new Response('API endpoint', { status: 200 });
    }
    
    // Serve static assets
    try {
      // Try to get the asset from the assets bucket
      const asset = await env.ASSETS.fetch(request);
      
      // If asset is found, return it
      if (asset.status !== 404) {
        return asset;
      }
    } catch (error) {
      console.error('Error fetching asset:', error);
    }
    
    // For SPA routing - serve index.html for all other routes
    try {
      const indexRequest = new Request(new URL('/index.html', request.url), request);
      const indexAsset = await env.ASSETS.fetch(indexRequest);
      
      if (indexAsset.status === 200) {
        // Return index.html with proper headers for SPA
        return new Response(indexAsset.body, {
          ...indexAsset,
          headers: {
            ...indexAsset.headers,
            'Content-Type': 'text/html',
            'Cache-Control': 'no-cache',
          },
        });
      }
    } catch (error) {
      console.error('Error fetching index.html:', error);
    }
    
    // Fallback response
    return new Response('Not Found', { status: 404 });
  },
} satisfies ExportedHandler<{ ASSETS: Fetcher }>;
