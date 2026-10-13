export type CoverDimensions = { width: number; height: number }

const COVER_DIMENSIONS: Record<string, CoverDimensions> = {
    "/images/aidocs/blog/bank-statement-extraction-for-reconciliation-preparation-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/document-file-type-validation-before-automation-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/document-intake-policy-accounting-team-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/document-output-schema-versioning-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/document-processing-handoff-outsourced-accounting-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/document-processing-pilot-scorecard-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/duplicate-invoice-version-control-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/excel-workbook-fidelity-document-automation-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/field-normalization-raw-source-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/flag-a-supplier-bank-account-change-on-an-invoice-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/handle-a-password-protected-pdf-invoice-in-document-automation-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/human-review-stop-rules-document-processing-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/map-extracted-fields-to-chart-of-accounts-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/multipage-document-batch-boundaries-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/pdf-a-archive-or-processing-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/privacy-safe-sample-preparation-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/risk-based-document-quality-sampling-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/scan-photo-quality-acceptance-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aidocs/blog/source-to-ledger-lineage-document-automation-glass-v1.png": { width: 1536, height: 1024 },
    "/images/blog-covers/choose-invoice-ocr-service-georgia.png": { width: 1672, height: 941 },
}

export function getCoverDimensions(coverPath: string): CoverDimensions | undefined {
    return Object.hasOwn(COVER_DIMENSIONS, coverPath) ? COVER_DIMENSIONS[coverPath] : undefined
}
