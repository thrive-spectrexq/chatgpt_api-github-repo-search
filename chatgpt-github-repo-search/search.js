import ittyOpenAPI from './vendor/@cloudflare/itty-router-openapi@0.1.3.js';

export class GetSearch extends ittyOpenAPI.OpenAPIRoute {
  static schema = {
    tags: ['Search'],
    summary: 'Search repositories by a query parameter',
    parameters: {
      q: ittyOpenAPI.Query(String, {
        description: 'The query to search for',
        default: 'cloudflare workers'
      })
    },
    responses: {
      200: {
        schema: {
          repos: [
            {
              name: 'itty-router-openapi',
              description:
                'OpenAPI 3 schema generator and validator for Cloudflare Workers',
              stars: '80',
              url: 'https://github.com/cloudflare/itty-router-openapi'
            }
          ]
        }
      }
    }
  };

  async handle(request, env, ctx, data) {
    const url = 'https://api.github.com/search/repositories?q=' + data.q;

    const resp = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'RepoAI - Cloudflare Workers ChatGPT Plugin Example'
      }
    });

    if (!resp.ok) {
      return new Response(await resp.text(), { status: 400 });
    }

    const json = await resp.json();

    const repos = json.items.map(item => ({
      name: item.name,
      description: item.description,
      stars: item.stargazers_count,
      url: item.html_url
    }));

    return {
      repos: repos
    };
  }
}
