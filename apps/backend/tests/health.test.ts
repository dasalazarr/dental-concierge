import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../src/index";

describe("Backend MVP", () => {
  it("returns health payload", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.service).toBe("dental-concierge-backend");
    expect(typeof response.body.version).toBe("string");
    expect(typeof response.body.timestamp).toBe("string");
  });

  it("verifies whatsapp webhook", async () => {
    const response = await request(app)
      .get("/webhook")
      .query({
        "hub.mode": "subscribe",
        "hub.verify_token": "dev-verify-token",
        "hub.challenge": "abc123"
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe("abc123");
  });

  it("classifies urgency and triggers handoff", async () => {
    const response = await request(app).post("/webhook").send({
      entry: [
        {
          changes: [
            {
              value: {
                messages: [
                  {
                    from: "573000000000",
                    text: { body: "Tengo urgencia y mucho dolor" }
                  }
                ]
              }
            }
          ]
        }
      ]
    });

    expect(response.status).toBe(200);
    expect(response.body.ack).toBe(true);
    expect(response.body.intent).toBe("urgencia");
    expect(response.body.handoff).toBe(true);
  });
});
