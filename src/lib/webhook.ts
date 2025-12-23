// GoHighLevel Webhook Integration

interface WebhookPayload {
  formName: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  message?: string;
  services?: string[];
  preferredContact?: string;
  source?: string;
  [key: string]: unknown;
}

export async function sendToWebhook(payload: WebhookPayload): Promise<boolean> {
  const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("GoHighLevel webhook URL not configured");
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
        website: "fireflieslandscapelighting.com",
      }),
    });

    if (!response.ok) {
      console.error("Webhook error:", response.status, response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Webhook submission failed:", error);
    return false;
  }
}
