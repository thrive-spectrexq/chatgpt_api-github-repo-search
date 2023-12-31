/* eslint-disable */
'use strict';
exports.Router = ({ base: e = '', routes: r = [] } = {}) => ({
  __proto__: new Proxy(
    {},
    {
      get:
        (a, o, t) =>
        (a, ...p) =>
          r.push([
            o.toUpperCase(),
            RegExp(
              `^${(e + a)
                .replace(/(\/?)\*/g, '($1.*)?')
                .replace(/(\/$)|((?<=\/)\/)/, '')
                .replace(/(:(\w+)\+)/, '(?<$2>.*)')
                .replace(/:(\w+)(\?)?(\.)?/g, '$2(?<$1>[^/]+)$2$3')
                .replace(/\.(?=[\w(])/, '\\.')
                .replace(/\)\.\?\(([^\[]+)\[\^/g, '?)\\.?($1(?<=\\.)[^\\.')}/*$`
            ),
            p
          ]) && t
    }
  ),
  routes: r,
  async handle(e, ...a) {
    let o,
      t,
      p = new URL(e.url),
      l = (e.query = {});
    for (let [e, r] of p.searchParams)
      l[e] = void 0 === l[e] ? r : [l[e], r].flat();
    for (let [l, s, c] of r)
      if ((l === e.method || 'ALL' === l) && (t = p.pathname.match(s))) {
        e.params = t.groups || {};
        for (let r of c)
          if (void 0 !== (o = await r(e.proxy || e, ...a))) return o;
      }
  }
});
