"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import { AiNowSectionFrame } from "./AiNowSectionFrame";
import { AiNowImage } from "./AiNowImage";
import { AiNowDisclosure } from "./AiNowDisclosure";
import { AIDOCS_MODEL_PROOF } from "./aidocs-model-proof";

type Provider = {
  readonly lab: string;
  readonly mark: string | null;
  readonly wordmark: string;
  readonly tone: string;
};

const providers: readonly Provider[] = [
  { lab: "File", mark: null, wordmark: "File", tone: "openai" },
  { lab: "Field", mark: null, wordmark: "Field", tone: "anthropic" },
  { lab: "Review", mark: null, wordmark: "Review", tone: "google" },
  { lab: "Output", mark: null, wordmark: "Output", tone: "xai" },
  { lab: "Sample", mark: null, wordmark: "Sample", tone: "mistral" },
  { lab: "Confidence", mark: null, wordmark: "Confidence", tone: "deepseek" },
  { lab: "Accountant", mark: null, wordmark: "Accountant", tone: "meta" },
  { lab: "Import", mark: null, wordmark: "Import", tone: "qwen" },
  { lab: "Scope", mark: null, wordmark: "Scope", tone: "cohere" },
  { lab: "Approval", mark: null, wordmark: "Approval", tone: "zai" },
  { lab: "Boundary", mark: null, wordmark: "Boundary", tone: "kimi" },
];

const AIDOCS_PROVIDER_FUNCTIONS = {
  ka: { File: "ფაილი", Field: "ველი", Review: "შემოწმება", Output: "შედეგი", Sample: "ნიმუში", Confidence: "სანდოობა", Accountant: "ბუღალტერი", Import: "იმპორტი", Scope: "ფარგლები", Approval: "დადასტურება", Boundary: "ზღვარი" },
  en: { File: "File", Field: "Field", Review: "Review", Output: "Output", Sample: "Sample", Confidence: "Confidence", Accountant: "Accountant", Import: "Import", Scope: "Scope", Approval: "Approval", Boundary: "Boundary" },
  ru: { File: "Файл", Field: "Поле", Review: "Проверка", Output: "Результат", Sample: "Образец", Confidence: "Уверенность", Accountant: "Бухгалтер", Import: "Импорт", Scope: "Объём", Approval: "Подтверждение", Boundary: "Граница" },
} as const;

const legacyReviewNotes = {
  ka: {
    eyebrow: "როგორ ვარჩევთ AI-ს",
    title: "ყველა საქმეს ერთი AI არ უხდება.",
    description: "მოდელს ვარჩევთ იმის მიხედვით, რას აკეთებს სისტემა.",
    radar: "ტექნოლოგიები, რომლებსაც ვიყენებთ",
    moreTechnologies: "სხვა ტექნოლოგიები",
    jevKicker: "გადაწყვეტილების ფენა",
    jevTitle: "Jev by TypeSafe",
    jevDescription: "Jev გვეხმარება შემდეგი მოქმედების არჩევაში.",
    trustLabel: "უსაფრთხოება, წვდომა და ხელმისაწვდომობა",
    brand: {
      established: "EST. 2025 · თბილისი",
      title: "BUILT FOR GEORGIAN BUSINESS",
      location: "თბილისი / ევროპული ინფრასტრუქტურა",
      language: "ქართული ენა. რეალური პროცესები.",
    },
    trust: [
      {
        value: "File",
        label: "DOCUMENT WORKFLOW REVIEW",
        detail: "Document fields are reviewed before output is agreed",
        image: "/images/model-trust/aidocs-document-v1.png",
      },
      {
        value: "ევროპა, გერმანია",
        label: "ფაილის ფარგლები",
        detail: "თუ პროექტისთვის ასე შევთანხმდებით.",
        image: "/images/model-trust/aidocs-fields-v1.png",
      },
      {
        value: "Review",
        label: "შემოწმების კონტროლი",
        detail: "დაცვა პროექტის კონფიგურაციაზეა დამოკიდებული.",
        image: "/images/model-trust/aidocs-review-v1.png",
      },
      {
        value: "Approval",
        label: "ადამიანის დადასტურება",
        detail: "ჩვენი გუნდი მუშაობს ღამითაც და უქმე დღეებშიც.",
        image: "/images/model-trust/aidocs-approval-workflow-v1.png",
      },
    ],
  },
  en: {
    eyebrow: "How we choose AI",
    title: "Your business does not need the same AI for every job.",
    description: "We choose each model for the work the system needs to do.",
    radar: "Technologies we use",
    moreTechnologies: "More technologies",
    jevKicker: "Decision layer",
    jevTitle: "Jev by TypeSafe",
    jevDescription: "Jev helps select the system's next action.",
    trustLabel: "Security, access and availability",
    brand: {
      established: "EST. 2025 · Tbilisi",
      title: "BUILT FOR GEORGIAN BUSINESS",
      location: "Tbilisi / European infrastructure",
      language: "Georgian language. Real workflows.",
    },
    trust: [
      {
        value: "File",
        label: "DOCUMENT WORKFLOW REVIEW",
        detail: "Document fields are reviewed before output is agreed",
        image: "/images/model-trust/aidocs-document-v1.png",
      },
      {
        value: "Europe, Germany",
        label: "Document scope",
        detail: "Applied within the agreed project scope.",
        image: "/images/model-trust/aidocs-fields-v1.png",
      },
      {
        value: "Review",
        label: "Review control",
        detail: "Configured per project scope.",
        image: "/images/model-trust/aidocs-review-v1.png",
      },
      {
        value: "Approval",
        label: "Human approval",
        detail: "Our team works nights, weekends and holidays.",
        image: "/images/model-trust/aidocs-approval-workflow-v1.png",
      },
    ],
  },
  ru: {
    eyebrow: "Как мы выбираем AI",
    title: "Вашему бизнесу не нужен один и тот же AI для всех задач.",
    description: "Выбираем модель под работу, которую выполняет система.",
    radar: "Технологии, которые мы используем",
    moreTechnologies: "Другие технологии",
    jevKicker: "Слой принятия решений",
    jevTitle: "Jev by TypeSafe",
    jevDescription: "Jev помогает выбрать следующее действие системы.",
    trustLabel: "Безопасность, доступ и доступность",
    brand: {
      established: "EST. 2025 · Тбилиси",
      title: "СОЗДАНО ДЛЯ ГРУЗИНСКОГО БИЗНЕСА",
      location: "Тбилиси / европейская инфраструктура",
      language: "Грузинский язык. Реальные процессы.",
    },
    trust: [
      {
        value: "Файл",
        label: "ПРОВЕРКА ПРОЦЕССА ДОКУМЕНТА",
        detail: "Поля документа проверяются до согласования результата",
        image: "/images/model-trust/aidocs-document-v1.png",
      },
      {
        value: "Европа, Германия",
        label: "Границы документа",
        detail: "В рамках согласованного проекта.",
        image: "/images/model-trust/aidocs-fields-v1.png",
      },
      {
        value: "Проверка",
        label: "Контроль проверки",
        detail: "Настраивается в рамках проекта.",
        image: "/images/model-trust/aidocs-review-v1.png",
      },
      {
        value: "Подтверждение",
        label: "Подтверждение человеком",
        detail: "Наша команда работает ночью, в выходные и праздники.",
        image: "/images/model-trust/aidocs-approval-workflow-v1.png",
      },
    ],
  },
} as const;

void legacyReviewNotes;

function getCopy(locale: string) {
  const contentLocale = locale === "ka" || locale === "ru" ? locale : "en";
  return AIDOCS_MODEL_PROOF[contentLocale];
}

export function AiNowModelProof() {
  const locale = useLocale();
  const copy = getCopy(locale);
  const functions = AIDOCS_PROVIDER_FUNCTIONS[locale === "ka" || locale === "ru" ? locale : "en"];
  const modelNames = useMemo(() => (provider: Provider) => functions[provider.lab as keyof typeof functions] ?? provider.wordmark, [functions]);

  const renderProvider = (provider: Provider) => (
    <div className={`ainow-model-stage__provider ainow-model-stage__provider--${provider.tone}`} key={provider.lab} title={`${provider.wordmark}: ${modelNames(provider)}`}>
      <span className="ainow-model-stage__provider-mark" aria-hidden="true">
        {provider.mark ? (
          <AiNowImage
            src={provider.mark}
            alt=""
            width={18}
            height={18}
            frameClassName="inline-flex size-[18px]"
            className="size-full object-contain"
            unoptimized
          />
        ) : (
          <span className="ainow-model-stage__wordmark">{provider.wordmark.slice(0, 1)}</span>
        )}
      </span>
      <span className="ainow-model-stage__provider-copy">
        <span className="ainow-model-stage__provider-lab">{provider.wordmark}</span>
        <span className="ainow-model-stage__provider-model">{modelNames(provider)}</span>
      </span>
    </div>
  );

  return (
    <AiNowSectionFrame
      id="model-architecture"
      hasLaser={false}
      showTicks={false}
      containerClassName="px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
    >
      <section className="ainow-model-stage" aria-labelledby="ainow-model-stage-title">
        <div className="ainow-model-stage__intro">
          <div className="ainow-model-stage__eyebrow">
            <span className="ainow-model-stage__status" aria-hidden="true" />
            <span>{copy.eyebrow}</span>
          </div>
          <h2 id="ainow-model-stage-title">{copy.title}</h2>
          <p>{copy.description}</p>
        </div>

        <div
          className="ainow-model-stage__decision ainow-model-stage__visual-card"
        >
          <AiNowImage
            className="ainow-model-stage__decision-image"
            src="/images/model-trust/aidocs-decision-path-v1.png"
            alt=""
            fill
            frameClassName="absolute inset-0"
            sizes="(max-width: 767px) 100vw, 40vw"
          />
          <div className="ainow-model-stage__decision-scrim" aria-hidden="true" />
          <div className="ainow-model-stage__decision-content">
            <div className="ainow-model-stage__decision-copy">
              <span>{copy.jevKicker}</span>
              <strong>{copy.jevTitle}</strong>
              <p>{copy.jevDescription}</p>
            </div>
          </div>
        </div>

        <div
          className="ainow-model-stage__catalog ainow-model-stage__visual-card"
          aria-label={copy.radar}
        >
          <AiNowImage
            className="ainow-model-stage__catalog-image"
            src="/graphics-3d/products/aidocs-fields-workflow-v1.png"
            alt=""
            fill
            frameClassName="absolute inset-0"
            sizes="(max-width: 767px) 100vw, 58vw"
          />
          <div className="ainow-model-stage__catalog-scrim" aria-hidden="true" />
          <div className="ainow-model-stage__catalog-content">
            <div className="ainow-model-stage__catalog-heading">
              <span>{copy.radar}</span>
            </div>
            <div className="ainow-model-stage__providers" data-model-provider-group="primary">
              {providers.slice(0, 4).map(renderProvider)}
            </div>
            <AiNowDisclosure
              title={copy.moreTechnologies}
              className="mt-2 border-t border-slate-200/60 [&>button]:min-h-10 [&>button]:py-2 [&>button]:text-xs dark:border-white/10"
            >
              <div className="ainow-model-stage__providers pb-1" data-model-provider-group="additional">
                {providers.slice(4).map(renderProvider)}
              </div>
            </AiNowDisclosure>
          </div>
        </div>

        <dl className="ainow-model-stage__trust" aria-label={copy.trustLabel} tabIndex={0}>
          {copy.trust.map((item, index) => (
            <div className={`ainow-model-stage__trust-item${index === 3 ? " ainow-model-stage__trust-item--always-on" : ""}`} key={item.value}>
              <AiNowImage
                className="ainow-model-stage__trust-image"
                src={item.image}
                alt=""
                fill
                frameClassName="absolute inset-0"
                sizes="(max-width: 767px) 82vw, (max-width: 1040px) 25vw, 30vw"
              />
              <div className="ainow-model-stage__trust-copy">
                <dt>{item.value}</dt>
                <dd>
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <section className="ainow-model-stage__brand ainow-model-stage__visual-card" aria-label={copy.brand.title}>
          <AiNowImage
            className="ainow-model-stage__brand-image"
            src="/images/model-trust/aidocs-approval-workflow-v1.png"
            alt=""
            fill
            frameClassName="absolute inset-0"
            sizes="(max-width: 767px) 100vw, 100vw"
          />
          <div className="ainow-model-stage__brand-scrim" aria-hidden="true" />
          <div className="ainow-model-stage__brand-copy">
            <span>{copy.brand.established}</span>
            <h3>{copy.brand.title}</h3>
            <p>{copy.brand.language}</p>
            <small>{copy.brand.location}</small>
          </div>
        </section>
      </section>
    </AiNowSectionFrame>
  );
}
