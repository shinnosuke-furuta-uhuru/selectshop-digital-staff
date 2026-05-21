export async function onRequest(context) {
  const { request, next } = context;
  const authorization = request.headers.get("Authorization");

  if (authorization) {
    // Basic xxxxxx の形式からBase64文字列を取り出してデコード
    const b64 = authorization.split(" ")[1];
    const decoded = atob(b64);
    const [user, pass] = decoded.split(":");

    // ユーザー名: bshop / パスワード: next で認証クリア
    if (user === "bshop" && pass === "next") {
      return await next();
    }
  }

  // 認証が通っていない場合はブラウザのネイティブダイアログを要求する
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="B-SHOP SELECTION DEMO"',
    },
  });
}