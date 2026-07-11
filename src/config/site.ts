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
  brandHex: "#4338ca",

  /** Three hexes the hero grainient shader interpolates: soft, brand, accent. */
  shader: ["#c7d2fe", "#4338ca", "#6366f1"] as [string, string, string],

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
      "A document-to-ledger service for Georgian accounting firms: bank statement PDFs, foreign supplier invoices, customs paperwork and photographed receipts become a file that imports into ORIS, Balance or 1C. It is not an OCR product for domestic tax invoices, because rs.ge already makes those structured data and selling OCR for them would be selling a solved problem.",
    serviceType: "Document extraction into a posted ledger row, for Georgian accounting firms",
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
      "Your domestic tax invoices are already structured data inside rs.ge. Do not pay us for those. The page carries a sorter that tells you which of your documents you should not be buying from us.",
      "There is no published Georgian-language document-extraction accuracy benchmark from any vendor on earth, so we quote no accuracy figure. We measure it on your documents in a paid pilot, and that measured number is the one we both work from.",
      "We do not do handwriting.",
      "We produce a draft entry and your accountant signs it. We say so in the contract and we do not accept tax liability.",
    ],
    commitment:
      "We measure accuracy on your own documents before you pay anything. First 3 accounting firms get the pilot free and keep their own number.",
    summary:
      "aiDOCS turns the documents that rs.ge does not contain into posted ledger rows for Georgian accounting firms: bank statement PDFs from BOG and TBC, foreign supplier invoices on imports, customs paperwork, and photographed fiscal receipts. It is deliberately not an OCR product for domestic tax invoices, because Georgia already made those structured data through mandatory electronic invoicing, and the site says so on its own sales page. It quotes no accuracy percentage, because no vendor anywhere publishes a Georgian benchmark, and offers instead to measure the number on the customer's own documents. Built by the aiNOW agency in Tbilisi.",
  },
} as const;

export type SiteConfig = typeof SITE;
