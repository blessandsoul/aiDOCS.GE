import type { ClosingFormCopy, ContactPreferenceCopy } from "@/features/contact/content/closing-form-copy";

const channels: Record<"ka" | "en" | "ru", readonly ContactPreferenceCopy[]> = {
  ka: [
    { value: "whatsapp", label: "WhatsApp-ზე მომწერეთ", phoneLabel: "WhatsApp-ის ნომერი", hint: "WhatsApp-ზე მოგწერთ — ცალკე არ დაგირეკავთ.", success: "WhatsApp-ზე მოგწერთ.", validationAction: "WhatsApp-ზე მოგწეროთ" },
    { value: "sms", label: "SMS-ით მომწერეთ", phoneLabel: "ნომერი SMS-ისთვის", hint: "SMS-ით მოგწერთ — ცალკე არ დაგირეკავთ.", success: "SMS-ით მოგწერთ.", validationAction: "SMS-ით მოგწეროთ" },
    { value: "call", label: "ზარი მირჩევნია", phoneLabel: "ნომერი ზარისთვის", hint: "მითითებულ ნომერზე დაგირეკავთ.", success: "მითითებულ ნომერზე დაგირეკავთ.", validationAction: "დაგირეკოთ" },
  ],
  en: [
    { value: "whatsapp", label: "Message me on WhatsApp", phoneLabel: "WhatsApp number", hint: "We will write to you on WhatsApp, not call you separately.", success: "We will write to you on WhatsApp.", validationAction: "message you on WhatsApp" },
    { value: "sms", label: "Message me by SMS", phoneLabel: "Number for SMS", hint: "We will send an SMS and will not call you separately.", success: "We will send you an SMS.", validationAction: "send you an SMS" },
    { value: "call", label: "A call works best", phoneLabel: "Number for a call", hint: "We will call the number you provide.", success: "We will call the number you provide.", validationAction: "call you" },
  ],
  ru: [
    { value: "whatsapp", label: "Напишите мне в WhatsApp", phoneLabel: "Номер WhatsApp", hint: "Напишем в WhatsApp, без отдельного звонка.", success: "Напишем вам в WhatsApp.", validationAction: "написать вам в WhatsApp" },
    { value: "sms", label: "Напишите мне по SMS", phoneLabel: "Номер для SMS", hint: "Отправим SMS, без отдельного звонка.", success: "Отправим вам SMS.", validationAction: "отправить вам SMS" },
    { value: "call", label: "Удобнее звонок", phoneLabel: "Номер для звонка", hint: "Позвоним на указанный номер.", success: "Позвоним на указанный номер.", validationAction: "позвонить вам" },
  ],
};

const copy: Record<"ka" | "en" | "ru", ClosingFormCopy> = {
  ka: { companyLabel: "ბიზნესი ან საბუღალტრო გუნდი", companyPlaceholder: "მაგ. საბუღალტრო ფირმა", phonePlaceholder: "მაგ. 555 12 34 56", contactPreferenceLabel: "როგორ გირჩევნიათ, დაგიკავშირდეთ?", contactPreferences: channels.ka, productLabel: "პროდუქტი", productPlaceholder: "aiDOCS", selectedPlanLabel: "შერჩეული გეგმა", removePlan: "მოხსნა", taskLabel: "დოკუმენტის პროცესი", taskPlaceholder: "მაგ. უცხოელი მომწოდებლის ინვოისებიდან თანხა და თარიღი უნდა ამოვიღოთ.", companyError: "მოგვწერეთ ბიზნესის ან საბუღალტრო გუნდის სახელი.", phoneErrorPrefix: "მიუთითეთ მოქმედი ნომერი, რომ", taskError: "მოკლედ აღწერეთ ერთი დოკუმენტის პროცესი.", taskTooLongError: "გთხოვთ, აღწერა შეამოკლოთ.", briefTitle: "დოკუმენტის მოკლე აღწერა დავამატეთ", briefBody: "დატოვეთ ნომერი — ამ კონტექსტსაც გადავცემთ გუნდს.", submit: "ნიმუშის აღწერა", submitting: "იგზავნება...", email: "მისწერეთ ელფოსტით", submitError: "მოთხოვნა ვერ გაიგზავნა. გადაამოწმეთ ინტერნეტი და სცადეთ ხელახლა." },
  en: { companyLabel: "Business or accounting team", companyPlaceholder: "e.g. accounting firm", phonePlaceholder: "e.g. 555 12 34 56", contactPreferenceLabel: "How would you prefer us to contact you?", contactPreferences: channels.en, productLabel: "Product", productPlaceholder: "aiDOCS", selectedPlanLabel: "Selected plan", removePlan: "Remove", taskLabel: "Document workflow", taskPlaceholder: "e.g. Extract supplier, amount and date from foreign invoices.", companyError: "Tell us the business or accounting team name.", phoneErrorPrefix: "Enter a valid number so we can", taskError: "Briefly describe one document workflow.", taskTooLongError: "Please shorten the workflow description.", briefTitle: "Your document brief was added", briefBody: "Leave your number and we will pass this context to the team.", submit: "Describe the sample", submitting: "Sending...", email: "Email aiDOCS", submitError: "The request could not be sent. Check your connection and try again." },
  ru: { companyLabel: "Бизнес или бухгалтерская команда", companyPlaceholder: "например, бухгалтерская фирма", phonePlaceholder: "например, 555 12 34 56", contactPreferenceLabel: "Как вам удобнее получить ответ?", contactPreferences: channels.ru, productLabel: "Продукт", productPlaceholder: "aiDOCS", selectedPlanLabel: "Выбранный план", removePlan: "Убрать", taskLabel: "Документный процесс", taskPlaceholder: "например, извлекать поставщика, сумму и дату из иностранных инвойсов.", companyError: "Укажите название бизнеса или бухгалтерской команды.", phoneErrorPrefix: "Укажите действующий номер, чтобы мы могли", taskError: "Коротко опишите один документный процесс.", taskTooLongError: "Сократите описание процесса.", briefTitle: "Описание документа добавлено", briefBody: "Оставьте номер — мы передадим команде этот контекст.", submit: "Описать образец", submitting: "Отправка...", email: "Написать aiDOCS", submitError: "Не удалось отправить заявку. Проверьте интернет и попробуйте ещё раз." },
};

export function getAiDocsClosingFormCopy(locale: string): ClosingFormCopy {
  return copy[locale === "ka" || locale === "ru" ? locale : "en"];
}
