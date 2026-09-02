interface AssetsBinding {
  fetch(request: Request): Promise<Response>;
}

interface Env {
  ASSETS: AssetsBinding;
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404 || request.method !== "GET") {
      return response;
    }

    const url = new URL(request.url);

    if (url.pathname.includes(".")) {
      return response;
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = `${url.pathname.replace(/\/$/, "")}/index.html`;

    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};

export default worker;
