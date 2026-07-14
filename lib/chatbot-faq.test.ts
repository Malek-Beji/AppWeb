import { describe, it, expect } from "vitest";
import { matchFaq, FAQ } from "./chatbot-faq";

describe("matchFaq", () => {
  it("matches on an exact suggestion question", () => {
    for (const entry of FAQ) {
      expect(matchFaq(entry.question)?.id).toBe(entry.id);
    }
  });

  it("matches case-insensitively and ignores accents", () => {
    expect(matchFaq("QUELS SONT VOS TARIFS")?.id).toBe("tarifs");
    expect(matchFaq("comment vous CONTACTER ?")?.id).toBe("contact");
  });

  it("matches on partial free-text phrasing", () => {
    expect(matchFaq("vous proposez des sites e-commerce ?")?.id).toBe("services");
    expect(matchFaq("je veux voir vos projets")?.id).toBe("portfolio");
  });

  it("returns null for unrelated input", () => {
    expect(matchFaq("xyzabc123")).toBeNull();
  });

  it("returns null for empty input", () => {
    expect(matchFaq("")).toBeNull();
  });
});
