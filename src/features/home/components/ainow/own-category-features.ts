type Locale = "ka" | "en" | "ru";
type Feature = { name: string; description: string };

const copy: Record<Locale, Record<string, Feature>> = {
  ka: {
    aichats: { name: "დოკუმენტის მიღება", description: "დაალაგეთ, რა მასალა შედის პირველ შემოწმებაში." },
    aicall: { name: "საჭირო ველები", description: "განსაზღვრეთ, რომელი ველები უნდა იყოს შევსებული." },
    aicontent: { name: "ტექსტის ამოღება", description: "ტექსტი დოკუმენტიდან ცალკე სამუშაო მასალად გამოიყოფა." },
    aiads: { name: "სტრუქტურირებული ველები", description: "ამოღებული მონაცემები შეთანხმებულ ველებად ლაგდება." },
    aimusic: { name: "წყაროს შედარება", description: "შედარება ეყრდნობა თქვენს მიერ მოწოდებულ წყაროს." },
    aistaff: { name: "შემოწმების პასუხისმგებელი", description: "განსაზღვრეთ, ვინ ამოწმებს დოკუმენტის შედეგს." },
    aibrain: { name: "მტკიცებულების შემოწმება", description: "ფაქტი და ვარაუდი ცალ-ცალკე აღინიშნება." },
    aioffice: { name: "დამტკიცების ნაბიჯი", description: "საჭირო დამტკიცება ადამიანურ პროცესში რჩება." },
    aidocs: { name: "დოკუმენტის ისტორია", description: "ვერსია და შემოწმების შედეგი სამუშაო ისტორიაში იწერება." },
    aiweb: { name: "შედეგის ფორმატი", description: "შედეგი შეთანხმებულ დოკუმენტის ფორმატში მზადდება." },
    aiapp: { name: "ფარგლების ზღვარი", description: "დოკუმენტის ტიპი და შემოწმების ფარგლები წინასწარ იწერება." },
    vibecoding: { name: "ადამიანთან ჩაბარება", description: "საბოლოო მასალა ადამიანურ გადახედვასა და ჩაბარებას გადის." },
  },
  en: {
    aichats: { name: "Document intake", description: "Define which material enters the first review." },
    aicall: { name: "Required fields", description: "Set the fields that must be present." },
    aicontent: { name: "Text extraction", description: "Separate document text into working material." },
    aiads: { name: "Structured fields", description: "Place extracted data into agreed fields." },
    aimusic: { name: "Source comparison", description: "Compare against the source material you provide." },
    aistaff: { name: "Review owner", description: "Define who checks the document result." },
    aibrain: { name: "Evidence check", description: "Keep facts and assumptions visibly separate." },
    aioffice: { name: "Approval step", description: "Required approval remains a human process." },
    aidocs: { name: "Document history", description: "Record version and review results in the work history." },
    aiweb: { name: "Output format", description: "Prepare the result in the agreed document format." },
    aiapp: { name: "Scope boundary", description: "Define document type and review scope before work." },
    vibecoding: { name: "Human handover", description: "The final material goes through human review and handover." },
  },
  ru: {
    aichats: { name: "Приём документов", description: "Определите, какие материалы входят в первую проверку." },
    aicall: { name: "Обязательные поля", description: "Укажите поля, которые должны быть заполнены." },
    aicontent: { name: "Извлечение текста", description: "Выделите текст документа в рабочий материал." },
    aiads: { name: "Структурированные поля", description: "Разложите извлечённые данные по согласованным полям." },
    aimusic: { name: "Сравнение источника", description: "Сравнение проводится с предоставленным вами источником." },
    aistaff: { name: "Ответственный за проверку", description: "Определите, кто проверяет результат документа." },
    aibrain: { name: "Проверка фактов", description: "Разделяйте факты и предположения." },
    aioffice: { name: "Шаг согласования", description: "Необходимое согласование остаётся за человеком." },
    aidocs: { name: "История документа", description: "Версия и результат проверки записываются в историю." },
    aiweb: { name: "Формат результата", description: "Результат готовится в согласованном формате документа." },
    aiapp: { name: "Граница объёма", description: "Тип документа и объём проверки определяются заранее." },
    vibecoding: { name: "Передача человеку", description: "Итоговый материал проходит проверку и передачу человеку." },
  },
};

export function getOwnCategoryFeatures(locale: string): Record<string, Feature> {
  return copy[locale === "ka" || locale === "ru" ? locale : "en"];
}
