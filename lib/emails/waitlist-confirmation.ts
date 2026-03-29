export function waitlistConfirmationHtml({ name, email }: { name?: string; email: string }) {
  const firstName = name ? name.split(" ")[0] : "there";
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
<title>You&apos;re on the ProXiFi Waitlist</title></head>
<body style="margin:0;padding:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e4e4e7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#18181b;border:1px solid #27272a;border-radius:16px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1c1400,#0a0a0a);padding:40px 40px 32px;border-bottom:1px solid #27272a;">
          <p style="margin:0;font-size:22px;font-weight:800;color:#f59e0b;letter-spacing:-0.5px;">ProXiFi</p>
          <p style="margin:8px 0 0;font-size:13px;color:#71717a;text-transform:uppercase;letter-spacing:1px;">Mobile Proxy Infrastructure</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px;">
          <h1 style="margin:0 0 16px;font-size:26px;font-weight:800;color:#ffffff;line-height:1.2;">You&apos;re on the list, ${firstName}! 🎉</h1>
          <p style="margin:0 0 20px;font-size:15px;color:#a1a1aa;line-height:1.6;">
            Thanks for joining the ProXiFi waitlist. You&apos;re now in line for early access to our mobile proxy platform — managed proxies, IP rotation, full API access, and the Proxy Manager software.
          </p>
          <p style="margin:0 0 28px;font-size:15px;color:#a1a1aa;line-height:1.6;">
            We&apos;ll email you at <strong style="color:#f59e0b;">${email}</strong> when your spot opens up. Early access members get priority onboarding and early-bird pricing.
          </p>
          <!-- What to expect -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;border:1px solid #27272a;border-radius:12px;margin-bottom:28px;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#71717a;">What&apos;s coming</p>
              <p style="margin:0 0 8px;font-size:14px;color:#d4d4d8;">✓ &nbsp;Shared &amp; dedicated mobile proxies from $55/mo</p>
              <p style="margin:0 0 8px;font-size:14px;color:#d4d4d8;">✓ &nbsp;HTTP &amp; SOCKS5 with on-demand IP rotation</p>
              <p style="margin:0 0 8px;font-size:14px;color:#d4d4d8;">✓ &nbsp;Full REST API for automation integration</p>
              <p style="margin:0 0 0;font-size:14px;color:#d4d4d8;">✓ &nbsp;Proxy Manager software — run your own proxy farm</p>
            </td></tr>
          </table>
          <a href="https://proxifi.net" style="display:inline-block;background:#d97706;color:#ffffff;font-size:14px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;">
            Visit ProXiFi →
          </a>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:24px 40px;border-top:1px solid #27272a;">
          <p style="margin:0;font-size:12px;color:#52525b;">You received this because you signed up for the ProXiFi waitlist. <a href="https://proxifi.net" style="color:#71717a;">proxifi.net</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function waitlistConfirmationText({ name, email }: { name?: string; email: string }) {
  const firstName = name ? name.split(" ")[0] : "there";
  return `Hey ${firstName}, you're on the ProXiFi waitlist!\n\nWe'll email you at ${email} when your early access spot opens up.\n\nWhat's coming:\n- Shared & dedicated mobile proxies from $55/mo\n- HTTP & SOCKS5 with on-demand IP rotation\n- Full REST API\n- Proxy Manager software\n\nVisit https://proxifi.net\n\nProXiFi Team`;
}
