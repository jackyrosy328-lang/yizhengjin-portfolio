/**
 * 本地版 API 拦截层（由 build-local.js 自动生成，请勿手改）
 *
 * 本地版没有后端，直接返回预置数据，因此：
 *   - 工作坊可以完整跑完五步流程
 *   - 用电沙盘走纯前端规则引擎（原本也不需要后端）
 */
(function () {
  var realFetch = typeof window.fetch === 'function' ? window.fetch.bind(window) : null;

  function jsonResponse(obj, status) {
    return new Response(JSON.stringify(obj), {
      status: status || 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  function parseBody(init) {
    if (!init || !init.body) return {};
    if (typeof init.body === 'string') {
      try { return JSON.parse(init.body); } catch (e) { return {}; }
    }
    return {};
  }

  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    var data = window.__LOCAL_DATA__;

    // GET /api/status → 不接大模型
    if (url.indexOf('/api/status') !== -1) {
      return Promise.resolve(jsonResponse({ deepseekConfigured: false, model: 'local-static' }));
    }

    // POST /api/agent/<role> → 预置 Agent 输出
    var agentMatch = url.match(/\/api\/agent\/([^/?#]+)/);
    if (agentMatch) {
      var role = agentMatch[1];
      var agentPayload = parseBody(init);
      var result = data.getAgentFallback(role, agentPayload.proposition || '未命名命题');
      return Promise.resolve(jsonResponse(Object.assign({ source: 'local' }, result)));
    }

    // POST /api/sandbox-plans → 预置三套方案
    if (url.indexOf('/api/sandbox-plans') !== -1) {
      var sandboxPayload = parseBody(init);
      return Promise.resolve(jsonResponse({
        plans: data.getSandboxFallback(sandboxPayload),
        source: 'local',
      }));
    }

    // 其它请求交回真实 fetch（本地文件场景下会失败，由调用方兜底）
    if (realFetch) return realFetch(input, init);
    return Promise.reject(new Error('No fetch available'));
  };
})();
