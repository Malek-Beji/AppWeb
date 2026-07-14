import { describe, it, expect } from "vitest";
import { slugify, isValidUrl, isValidImageValue } from "./project-validation";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("TileO Dubai")).toBe("tileo-dubai");
  });

  it("strips accents", () => {
    expect(slugify("Chirurgie Esthétique à Tunis")).toBe(
      "chirurgie-esthetique-a-tunis"
    );
  });

  it("collapses punctuation into single hyphens and trims edges", () => {
    expect(slugify("  Karma -- Fitout!! ")).toBe("karma-fitout");
  });

  it("handles empty input", () => {
    expect(slugify("")).toBe("");
  });
});

describe("isValidUrl", () => {
  it("accepts http and https URLs", () => {
    expect(isValidUrl("https://example.com")).toBe(true);
    expect(isValidUrl("http://example.com")).toBe(true);
  });

  it("rejects non-http(s) protocols", () => {
    expect(isValidUrl("javascript:alert(1)")).toBe(false);
    expect(isValidUrl("ftp://example.com")).toBe(false);
  });

  it("rejects garbage input", () => {
    expect(isValidUrl("test")).toBe(false);
    expect(isValidUrl("")).toBe(false);
  });
});

describe("isValidImageValue", () => {
  it("accepts site-relative paths", () => {
    expect(isValidImageValue("/portfolio/tileo.PNG")).toBe(true);
  });

  it("accepts http(s) URLs", () => {
    expect(isValidImageValue("https://example.com/image.jpg")).toBe(true);
  });

  it("rejects bare words that are neither a path nor a URL", () => {
    expect(isValidImageValue("test")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(isValidImageValue("")).toBe(false);
  });
});
