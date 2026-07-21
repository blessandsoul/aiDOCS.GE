/**
 * THE ONE FILE THAT DIFFERS PER LANDING.
 *
 * Everything else in this repo is shared with the other aiNOW product landings and is kept in
 * sync from `landing-template/` by `python scripts/landings.py sync`. If you find yourself
 * editing a shared file to make THIS site different, stop: the difference belongs here, or in
 * src/messages/*.json, or in this site's own widgets under src/features/showcase/.
 *
 * Per-site, never synced: src/config/site.ts, src/app/brand.css, src/messages/*.json,
 * src/features/showcase/**, src/features/home/components/LandingShowcase.tsx,
 * .impeccable/config.json, public/**.
 */

export const SITE = {
  /** Machine key. Lands on <html data-product> and is the deploy smoke-test hook. */
  key: "aidocs",

  domain: "aidocs.ge",
  baseUrl: "https://aidocs.ge",

  /** Rendered as <prefix><mark> by the nav, hero, footer and wordmark band. */
  wordmark: { prefix: "ai", mark: "DOCS" },

  /** The product colour. src/app/brand.css is generated from this; keep them in step. */
  brandHex: "#5b5bf7",

  /** Three hexes the hero grainient shader interpolates: soft, brand, accent. */
  shader: ["#e1deff", "#5b5bf7", "#8b7cff"] as [string, string, string],

  /**
   * i18n.
   *
   * `defaultLocale` is the UNPREFIXED locale (next-intl `localePrefix: "as-needed"`), so it
   * decides the URL shape: the default lives at `/`, the others at `/<locale>`. The Georgian
   * landings use "ka"; the export landings (aiapp, vibecoding) use "en".
   *
   * It is NOT the same question as "is this locale Georgian". That stays a literal
   * `locale === "ka"` check wherever it appears, because it drives the Georgian font and the OG
   * locale tag, and Georgian is still an offered locale even on an EN-default site. Do not
   * find-replace one for the other.
   */
  defaultLocale: "ka",
  locales: ["ka", "en", "ru"],

  /** PWA manifest. Not locale-aware (Next metadata routes are build-time). English. */
  manifest: {
    name: "aiDOCS",
    short: "aiDOCS",
    description: "Documents into posted ledger rows, for Georgian accounting firms.",
    background: "#fbfcfc",
    theme: "#4338ca",
  },
  /**
   * The machine-readable half of the page.
   *
   * StructuredData.tsx turns this into the JSON-LD entity graph and /llms.txt turns it
   * into prose. Between them they decide whether ChatGPT, Perplexity and Gemini can
   * recommend this domain, or whether they have to guess and therefore stay quiet.
   *
   * `boundary` names the sibling product that owns the adjacent job, so our own six
   * domains stop competing for the same query and a model can route a question
   * correctly. `limits` states what we cannot do, which looks like a mistake and is the
   * opposite: an assistant will not stake an answer on a page that claims to do
   * everything, and it will happily cite one that draws its own edges.
   */
  seo: {
    disambiguating:
      "A document-to-ledger service for Georgian accounting firms: bank statement PDFs, foreign supplier invoices, customs paperwork and photographed receipts become a review-ready file for ORIS, Balance or 1C.",
    serviceType: "Document extraction into reviewed ledger drafts for Georgian accounting firms",
    audienceName:
      "Georgian accounting firms and outsourced bookkeepers, plus customs brokers and freight forwarders",
    areaServed: "GE",
    knowsAbout: [
      "Intelligent document processing",
      "OCR",
      "Bank statement parsing",
      "Invoice extraction",
      "Customs declarations",
      "rs.ge",
      "ORIS accounting",
      "Balance.ge",
      "1C",
      "Straight-through processing",
    ],
    features: [
      "Bank statement PDFs from BOG and TBC turned into ledger rows",
      "Foreign supplier invoices on imports, extracted and mapped to your chart of accounts",
      "Photographed fiscal receipts for expense claims",
      "Customs and import paperwork",
      "A file that imports into ORIS, Balance or 1C, not a JSON dump",
      "Low-confidence fields go to a human before anything is posted",
    ],
    boundary:
      "aiDOCS is one productized job: a document becomes a posted ledger row. Automating the rest of the office, the orders and approvals and reports, is aiOFFICE.ge.",
    limits: [
      "Domestic tax invoices already available as structured data in rs.ge are outside the standard aiDOCS scope.",
      "aiNOW publishes no general accuracy percentage. aiNOW measures selected sample documents and reports the result for those files.",
      "aiDOCS does not include handwriting recognition.",
      "aiDOCS produces a draft entry. The client's accountant reviews and approves it before posting.",
    ],
    commitment:
      "aiNOW measures extraction quality on the client's own sample documents and reports which fields still need human review before production use.",
    summary:
      "aiDOCS extracts selected fields from bank statements, foreign supplier invoices, customs paperwork and photographed receipts for Georgian accounting teams. It prepares a review-ready file for ORIS, Balance or 1C, marks uncertain fields and keeps final posting under the client's accountant.",
  },
} as const;

export type SiteConfig = typeof SITE;
