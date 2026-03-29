export type PurchaseProduct =
  | { type: "proxy"; plan: string; price: number }
  | { type: "software"; plan: string; billing: string; price: number }
  | { type: "proxy_manager"; price: number };

export function purchaseConfirmationHtml({
  email,
  name,
  product,
}: {
  email: string;
  name?: string;
  product: PurchaseProduct;
}) {
  const firstName = name ? name.split(" ")[0] : "there";

  let productName = "";
  let productDetail = "";
  let price = "";

  if (product.type === "proxy") {
    const planLabel: Record<string, string> = {
      proxy_starter:  "Starter",
      proxy_growth:   "Growth",
      proxy_standard: "Standard",
      proxy_premium:  "Premium",
    };
    productName = `${planLabel[product.plan] ?? product.plan} Mobile Proxy`;
    productDetail = "Your proxy credentials will appear in your dashboard within minutes.";
    price = `$${product.price}/mo`;
  } else if (product.type === "software") {
    productName = `ProXiFi Software — ${product.plan} (${product.billing})`;
    productDetail = "Your license key and download link will appear in Dashboard → Software.";
    price = `$${product.price}`;
  } else {
    productName = "ProXiFi Proxy Manager";
    productDetail = "Your license key and installer download link are on their way to your inbox separately.";
    price = "$1,500";
  }

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>Purchase Confirmed — ProXiFi</title></head>
<body style="margin:0;padding:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e4e4e7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#18181b;border:1px solid #27272a;border-radius:16px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1c1400,#0a0a0a);padding:40px 40px 32px;border-bottom:1px solid #27272a;">
          <p style="margin:0;font-size:22px;font-weight:800;color:#f59e0b;">ProXiFi</p>
          <p style="margin:8px 0 0;font-size:13px;color:#71717a;text-transform:uppercase;letter-spacing:1px;">Payment Confirmed</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px;">
          <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#ffffff;">Thanks for your purchase, ${firstName}!</h1>
          <p style="margin:0 0 28px;font-size:15px;color:#a1a1aa;line-height:1.6;">Your payment has been confirmed. Here&apos;s a summary of what you ordered.</p>
          <!-- Order summary -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;border:1px solid #27272a;border-radius:12px;margin-bottom:28px;">
            <tr><td style="padding:20px 24px;border-bottom:1px solid #27272a;">
              <p style="margin:0;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#71717a;">Order Details</p>
            </td></tr>
            <tr><td style="padding:16px 24px;border-bottom:1px solid #27272a;">
              <table width="100%"><tr>
                <td style="font-size:14px;color:#d4d4d8;">${productName}</td>
                <td align="right" style="font-size:14px;font-weight:700;color:#f59e0b;">${price}</td>
              </tr></table>
            </td></tr>
            <tr><td style="padding:16px 24px;">
              <p style="margin:0;font-size:13px;color:#71717a;">${productDetail}</p>
            </td></tr>
          </table>
          <a href="https://proxifi.net/Dashboard" style="display:inline-block;background:#d97706;color:#ffffff;font-size:14px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;">Go to Dashboard →</a>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:24px 40px;border-top:1px solid #27272a;">
          <p style="margin:0;font-size:12px;color:#52525b;">Questions? Email us at <a href="mailto:support@proxifi.net" style="color:#71717a;">support@proxifi.net</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function purchaseConfirmationText({
  name,
  product,
}: {
  name?: string;
  product: PurchaseProduct;
}) {
  const firstName = name ? name.split(" ")[0] : "there";
  const productName =
    product.type === "proxy_manager"
      ? "ProXiFi Proxy Manager ($1,500)"
      : product.type === "proxy"
      ? `${product.plan} Mobile Proxy ($${product.price}/mo)`
      : `ProXiFi Software — ${product.plan} ${product.billing} ($${product.price})`;
  return `Thanks ${firstName}, your purchase is confirmed!\n\n${productName}\n\nGo to your dashboard: https://proxifi.net/Dashboard\n\nQuestions? support@proxifi.net\n\nProXiFi Team`;
}
