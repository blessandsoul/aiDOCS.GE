# aidocs.ge, text review

**For the translator.** Edit the **KA** and **RU** columns only. Leave the KEY column alone.

Rules that will break the site if you ignore them:

- **No long dash and no middle dash.** Not one, anywhere. Use a comma, a period, a colon,
  parentheses, or a plain hyphen. A validator blocks the file otherwise.
- **Keep every placeholder exactly as it is.** `{year}` stays `{year}`. `<brand></brand>` stays
  `<brand></brand>` (it renders the product logo inline, so do not translate it and do not
  delete it).
- **Georgian is Mkhedruli**, never Mtavruli and never uppercase.
- **Never put a Cyrillic letter inside a Georgian word.** They look alike and it corrupts search.
- `typewriterWords` is a comma-separated list with **no space after the comma**, and
  `typewriterPrefill` must be **the first word of that list**.
- Keep the length roughly in the same range as the English. These are laid out in fixed boxes,
  and a heading that doubles in length will wrap into three lines.

Where this text lives, if you would rather edit the source directly:
`aidocs.ge_project/src/messages/{ka,en,ru}.json`

---


| KEY | EN | KA | RU |
| --- | --- | --- | --- |
| `seo.contact.title` | Contact aiDOCS | კონტაქტი, aiDOCS | Контакты, aiDOCS |
| `seo.contact.description` | For accounting firms: bank statement PDFs, foreign supplier invoices and photographed receipts, turned into a file that imports into ORIS, Balance or 1C. | საბუღალტრო ფირმებისთვის: ბანკის ამონაწერები PDF-ში, უცხოური მომწოდებლის ინვოისები და გადაღებული ჩეკები, გადაქცეული ფაილად, რომელიც ORIS-ში, Balance-ში ან 1C-ში შედის. | Для бухгалтерских фирм: выписки банка в PDF, инвойсы иностранных поставщиков и сфотографированные чеки, превращённые в файл, который импортируется в ORIS, Balance или 1C. |
| `seo.notFound.title` | 404, page not found | 404, გვერდი ვერ მოიძებნა | 404, страница не найдена |
| `seo.notFound.description` | This page does not exist. Go back to the homepage. | ეს გვერდი არ არსებობს. დაბრუნდით მთავარ გვერდზე. | Эта страница не существует. Вернитесь на главную. |
| `seo.notFound.heading` | Page not found | გვერდი ვერ მოიძებნა | Страница не найдена |
| `seo.notFound.body` | This page does not exist, or it has moved. | ეს გვერდი არ არსებობს ან გადატანილია. | Эта страница не существует или была перемещена. |
| `seo.notFound.backHome` | Back to the homepage | მთავარ გვერდზე | На главную |
| `contact.title` | Contact us | დაგვიკავშირდით | Свяжитесь с нами |
| `contact.subtitle` | Leave your number and we will call you back. | დატოვეთ ნომერი და ჩვენ დაგირეკავთ. | Оставьте номер, и мы вам перезвоним. |
| `contact.phone` | Phone number | ტელეფონის ნომერი | Номер телефона |
| `contact.phonePlaceholder` | +995 5XX XXX XXX | +995 5XX XXX XXX | +995 5XX XXX XXX |
| `contact.submit` | Send | გაგზავნა | Отправить |
| `contact.submitting` | Sending... | იგზავნება... | Отправка... |
| `contact.successTitle` | Received | მიღებულია | Принято |
| `contact.successMessage` | We will call you back shortly. | მალე დაგირეკავთ. | Мы скоро перезвоним вам. |
| `contact.errorMessage` | Something went wrong. Please try again. | დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ თავიდან. | Что-то пошло не так. Пожалуйста, попробуйте ещё раз. |
| `contact.contactInfo` | Contact information | საკონტაქტო ინფორმაცია | Контактная информация |
| `contact.phoneLabel` | Phone | ტელეფონი | Телефон |
| `contact.emailLabel` | Email | ელფოსტა | Почта |
| `contact.officeLabel` | Office | ოფისი | Офис |
| `contact.office` | Tbilisi, Tornike Eristavi St. 3 | თბილისი, თორნიკე ერისთავის ქ. 3 | Тбилиси, ул. Торнике Эриставе 3 |
| `contact.legalLabel` | Registered address | იურიდიული მისამართი | Юридический адрес |
| `contact.legal` | Zemo Plato, III Array, N14, Apt. 87, Tbilisi 0163 | ზემო პლატო, III მასივი, N14, ბინა 87, თბილისი 0163 | Земо Плато, III массив, N14, кв. 87, Тбилиси 0163 |
| `landingNav.showcase` | Watch a receipt become a row | ნახეთ, როგორ იქცევა ჩეკი ჩანაწერად | Как чек становится проводкой |
| `landingNav.process` | How it works | როგორ მუშაობს | Как работает |
| `landingNav.faq` | Questions | კითხვები | Вопросы |
| `landingNav.cta` | Get in touch | დაგვიკავშირდით | Связаться |
| `landingFooter.company` | AI NOW LLC, Tbilisi, Georgia | შპს AI NOW, თბილისი, საქართველო | ООО AI NOW, Тбилиси, Грузия |
| `landingFooter.familyHeading` | aiNOW family | aiNOW-ის პროდუქტები | Семейство aiNOW |
| `landingFooter.companyHeading` | aiDOCS | aiDOCS | aiDOCS |
| `landingFooter.socialHeading` | Social | სოციალური ქსელები | Соцсети |
| `landingFooter.languageHeading` | Language | ენა | Язык |
| `landingFooter.contact` | Contact | კონტაქტი | Контакты |
| `landingFooter.sectionShowcase` | Watch a receipt become a row | ნახეთ, როგორ იქცევა ჩეკი ჩანაწერად | Как чек становится проводкой |
| `landingFooter.sectionWork` | How it works | როგორ მუშაობს | Как работает |
| `landingFooter.sectionFaq` | Questions | კითხვები | Вопросы |
| `landingFooter.ctaHuge` | Send us the month you hate | გამოგვიგზავნეთ თვე, რომელიც გძულთ | Пришлите месяц, который вы ненавидите |
| `landingFooter.copyright` | © {year} aiDOCS, an aiNOW product. All rights reserved. | © {year} aiDOCS, aiNOW-ის პროდუქტი. ყველა უფლება დაცულია. | © {year} aiDOCS, продукт aiNOW. Все права защищены. |
| `product.seo.title` | aiDOCS, the documents rs.ge does not contain, turned into posted ledger rows | aiDOCS, დოკუმენტები, რომლებიც rs.ge-ში არ არის, გადაქცეული საბუღალტრო ჩანაწერებად | aiDOCS, документы, которых нет в rs.ge, превращённые в проводки |
| `product.seo.description` | Bank statement PDFs, foreign supplier invoices, customs paperwork and photographed receipts become a file that imports into ORIS, Balance or 1C. Built for Georgian accounting firms. We quote no accuracy figure: we measure it on your documents. | ბანკის ამონაწერები PDF-ში, უცხოური მომწოდებლის ინვოისები, საბაჟო ქაღალდები და გადაღებული ჩეკები იქცევა ფაილად, რომელიც ORIS-ში, Balance-ში ან 1C-ში შედის. აგებულია ქართული საბუღალტრო ფირმებისთვის. სიზუსტის ციფრს არ ვასახელებთ: მას თქვენს დოკუმენტებზე ვზომავთ. | Выписки банка в PDF, инвойсы иностранных поставщиков, таможенные бумаги и сфотографированные чеки становятся файлом, который импортируется в ORIS, Balance или 1C. Сделано для грузинских бухгалтерских фирм. Мы не называем процент точности: мы замеряем его на ваших документах. |
| `product.hero.lead` | A crumpled photo becomes a | დაჭმუჭნული ფოტო იქცევა | Мятая фотография становится |
| `product.hero.taglinePrefix` | AI that | AI, რომელიც | AI, который |
| `product.hero.taglineWorks` | posts it | აწარმოებს | проводит |
| `product.hero.typewriterWords` | ledger row,posted entry,line in ORIS,line in Balance,line in 1C | ჩანაწერად,გატარებად,ხაზად ORIS-ში,ხაზად Balance-ში,ხაზად 1C-ში | проводкой,записью в журнале,строкой в ORIS,строкой в Balance,строкой в 1C |
| `product.hero.typewriterPrefill` | ledger row | ჩანაწერად | проводкой |
| `product.hero.sloganCreates` | creates | ქმნის | создаёт |
| `product.hero.sloganAds` | advertises | არეკლამებს | рекламирует |
| `product.hero.sloganSells` | sells | ყიდის | продаёт |
| `product.hero.sloganManages` | manages | მართავს | управляет |
| `product.hero.sloganTogether` | together | ერთად | вместе |
| `product.hero.ctaResults` | Watch a receipt become a row | ნახეთ, როგორ იქცევა ჩეკი ჩანაწერად | Посмотреть, как чек становится проводкой |
| `product.hero.ctaCall` | Book a call | დაგვიკავშირდით | Связаться |
| `product.hero.commitment` | We measure accuracy on your own documents before you pay anything. First 3 accounting firms get the pilot free and keep their own number. | სიზუსტეს თქვენსავე დოკუმენტებზე ვზომავთ, სანამ რამეს გადაიხდით. პირველი 3 საბუღალტრო ფირმა პილოტს უფასოდ იღებს და თავისი ციფრი მათთან რჩება. | Точность замеряем на ваших же документах до того, как вы что-то заплатите. Первые 3 бухгалтерские фирмы получают пилот бесплатно, и их цифра остаётся у них. |
| `product.hero.audience` | For accounting firms, bookkeepers and customs brokers | საბუღალტრო ფირმებს, ბუღალტრებსა და საბაჟო ბროკერებს | Для бухгалтерских фирм, бухгалтеров и таможенных брокеров |
| `product.hero.sub` | Bank statement PDFs, foreign supplier invoices, customs paperwork and photographed receipts. The pile somebody still re-types by hand, because rs.ge does not contain it. | ბანკის ამონაწერები PDF-ში, უცხოური მომწოდებლის ინვოისები, საბაჟო ქაღალდები და გადაღებული ჩეკები. გროვა, რომელსაც ვიღაც ისევ ხელით კრეფს, რადგან rs.ge-ში ის არ არის. | Выписки банка в PDF, инвойсы иностранных поставщиков, таможенные бумаги и сфотографированные чеки. Куча, которую кто-то всё ещё перепечатывает руками, потому что в rs.ge её нет. |
| `product.hero.signedBy` | Andrew Altair. I am the one who measures it on your documents. | ენდრიუ ალტაირი. თქვენს დოკუმენტებზე მე გავზომავ. | Эндрю Алтаир. На ваших документах замерять буду я. |
| `product.work.eyebrow` | How it works | როგორ მუშაობს | Как это работает |
| `product.work.headingPre` | Six steps. | ექვსი ნაბიჯი. | Шесть шагов. |
| `product.work.headingAccent` | From the pile you hate to a row your accountant signs. | გროვიდან, რომელიც გძულთ, ჩანაწერამდე, რომელსაც ბუღალტერი აწერს ხელს. | От кучи, которую вы ненавидите, до проводки, которую подписывает бухгалтер. |
| `product.work.s1Title` | Send us a month of the documents you hate | გამოგვიგზავნეთ ერთი თვის დოკუმენტები, რომლებიც გძულთ | Пришлите месяц документов, которые вы ненавидите |
| `product.work.s1Tag` | the real ones | ნამდვილები | настоящих |
| `product.work.s1Desc` | The crumpled ones. The phone photos taken at an angle. The bank statement PDF that is really a scan of a printout. Do not send us the clean ones, they prove nothing. | დაჭმუჭნულები. ტელეფონით ირიბად გადაღებულები. ბანკის ამონაწერი PDF-ში, რომელიც სინამდვილეში ამობეჭდილის სკანია. სუფთები არ გამოგვიგზავნოთ, ისინი არაფერს ამტკიცებენ. | Мятых. Снятых телефоном под углом. Выписку банка в PDF, которая на самом деле скан распечатки. Чистые не присылайте, они ничего не доказывают. |
| `product.work.s2Title` | We measure accuracy on YOUR documents | სიზუსტეს ვზომავთ თქვენსავე დოკუმენტებზე | Замеряем точность на ВАШИХ документах |
| `product.work.s2Tag` | before you pay anything | სანამ რამეს გადაიხდით | до того, как вы заплатите |
| `product.work.s2Desc` | Not a percentage from a brochure. Yours, on your paper, and we show you the failures alongside the successes. Nobody on earth publishes a Georgian benchmark, so we are going to make one, and it will be yours. | არა პროცენტი ბროშურიდან. თქვენი, თქვენსავე ქაღალდზე, და წარმატებების გვერდით წარუმატებლობებსაც გაჩვენებთ. ქართულ ბენჩმარკს მსოფლიოში არავინ აქვეყნებს, ამიტომ ჩვენ შევქმნით და ის თქვენი იქნება. | Не процент из брошюры. Ваш, на вашей бумаге, и рядом с успехами мы покажем провалы. Грузинский бенчмарк не публикует никто в мире, поэтому мы его сделаем, и он будет вашим. |
| `product.work.s3Title` | We map the fields, once | ველებს ერთხელ ვაკავშირებთ | Один раз сопоставляем поля |
| `product.work.s3Tag` | per client company | თითო კლიენტ-კომპანიაზე | на каждую клиентскую компанию |
| `product.work.s3Desc` | Your chart of accounts, your VAT treatment, your supplier names as they are actually spelled in your books rather than as they appear on the invoice. This is the work that makes the rest of it boring. | თქვენი ანგარიშთა გეგმა, თქვენი დღგ-ის მიდგომა, მომწოდებლის სახელები ისე, როგორც თქვენს წიგნებშია დაწერილი და არა ისე, როგორც ინვოისზე წერია. სწორედ ეს სამუშაო ხდის დანარჩენს მოსაწყენს. | Ваш план счетов, ваш подход к НДС, имена поставщиков так, как они реально написаны в ваших книгах, а не так, как напечатаны в инвойсе. Именно эта работа делает всё остальное скучным. |
| `product.work.s4Title` | Documents arrive, fields come out | დოკუმენტები მოდის, ველები გამოდის | Документы приходят, поля выходят |
| `product.work.s4Tag` | email or a folder | ელფოსტით ან საქაღალდით | почтой или папкой |
| `product.work.s4Desc` | You forward it or you drop it in a folder. There is nothing to install and nothing for your bookkeepers to learn. Low-confidence fields are held back for a human, and we tell you which they were. | გადმოაგზავნით ან საქაღალდეში ჩააგდებთ. დასაყენებელი არაფერია და ბუღალტრებს არაფრის სწავლა არ სჭირდებათ. დაბალი ნდობის ველები ადამიანისთვის ჩერდება და გეუბნებით, რომელი იყო. | Вы пересылаете или кладёте в папку. Ставить нечего, и бухгалтерам ничему учиться не надо. Поля с низкой уверенностью придерживаются для человека, и мы говорим, какие именно. |
| `product.work.s5Title` | You get a file that imports | იღებთ ფაილს, რომელიც შედის | Вы получаете файл, который импортируется |
| `product.work.s5Tag` | ORIS, Balance, 1C | ORIS, Balance, 1C | ORIS, Balance, 1C |
| `product.work.s5Desc` | Not a JSON dump and not a CSV you have to re-map every month. A posted row, in the format your system already eats. The row is the product. | არც JSON-ის გროვა და არც CSV, რომელსაც ყოველ თვე თავიდან უნდა მიუთითოთ ველები. გატარებული ჩანაწერი, იმ ფორმატში, რომელსაც თქვენი სისტემა უკვე ჭამს. ჩანაწერი არის პროდუქტი. | Не свалка JSON и не CSV, который каждый месяц заново размечать. Готовая проводка, в формате, который ваша система уже ест. Проводка и есть продукт. |
| `product.work.s6Title` | Your accountant checks and signs | თქვენი ბუღალტერი ამოწმებს და ხელს აწერს | Ваш бухгалтер проверяет и подписывает |
| `product.work.s6Tag` | he signs, not us | ის აწერს ხელს, ჩვენ არა | подписывает он, а не мы |
| `product.work.s6Desc` | We produce a draft entry. He signs it. That is written into the contract, because we are not taking on your tax liability and any vendor who says they will is lying to you about something. | ჩვენ ვამზადებთ ჩანაწერის დრაფტს. ხელს ის აწერს. ეს ხელშეკრულებაშია ჩაწერილი, რადგან თქვენს საგადასახადო პასუხისმგებლობას არ ვიღებთ, ხოლო ვინც გპირდებათ, რომ აიღებს, რაღაცას გატყუებთ. | Мы готовим черновик проводки. Подписывает он. Это записано в договоре, потому что вашу налоговую ответственность мы на себя не берём, а поставщик, который обещает взять, о чём-то вам врёт. |
| `product.faq.headingPre` | Questions, | კითხვები, | Вопросы, |
| `product.faq.headingAccent` | answered straight. | პირდაპირი პასუხებით. | прямые ответы. |
| `product.faq.subtitle` | Beginning with the one that should make you suspicious of us. | დავიწყოთ იმით, რამაც ჩვენდამი ეჭვი უნდა აღგიძრათ. | Начнём с того, что должно вызвать у вас подозрение к нам. |
| `product.faq.q1` | My invoices are already in rs.ge. Why would I pay <brand></brand> anything? | ჩემი ინვოისები უკვე rs.ge-შია. რატომ უნდა გადავუხადო <brand></brand>-ს რამე? | Мои счета-фактуры уже в rs.ge. Зачем мне платить <brand></brand>? |
| `product.faq.a1` | For those, you should not. Georgia made electronic tax invoicing mandatory, so your domestic invoices and waybills are already structured data sitting in rs.ge, and any vendor selling you OCR for them is selling you a solved problem and hoping you have not noticed. The pile that is still manual is everything rs.ge does not contain: bank statement PDFs from BOG and TBC, foreign supplier invoices on imports, customs paperwork, and the photographs of fiscal receipts your clients send you for expense claims. That is the whole product. There is a sorter further down this page that tells you which of your own documents you should not be buying from us. | მათზე არ უნდა გადაიხადოთ. საქართველომ ელექტრონული საგადასახადო ანგარიშ-ფაქტურა სავალდებულო გახადა, ამიტომ თქვენი შიდა ინვოისები და ზედნადებები უკვე სტრუქტურირებული მონაცემია და rs.ge-ში ზის, ხოლო ვინც მათზე OCR-ს გყიდით, გადაწყვეტილ პრობლემას გყიდით და იმედოვნებს, რომ ვერ შეამჩნიეთ. ხელით დარჩენილი გროვა ის ყველაფერია, რაც rs.ge-ში არ არის: BOG-ისა და TBC-ის ბანკის ამონაწერები PDF-ში, იმპორტზე უცხოური მომწოდებლის ინვოისები, საბაჟო ქაღალდები და ფისკალური ჩეკების ფოტოები, რომლებსაც კლიენტები ხარჯების ასანაზღაურებლად გიგზავნიან. სწორედ ეს არის მთელი პროდუქტი. ამ გვერდზე ქვემოთ არის დამხარისხებელი, რომელიც გეტყვით, თქვენივე დოკუმენტებიდან რომელი არ უნდა იყიდოთ ჩვენგან. | За них платить не нужно. Грузия сделала электронную счёт-фактуру обязательной, поэтому ваши внутренние счета и накладные уже лежат структурированными данными в rs.ge, и любой поставщик, продающий вам OCR для них, продаёт решённую задачу и надеется, что вы не заметили. Куча, которая осталась ручной, это всё, чего в rs.ge нет: выписки BOG и TBC в PDF, инвойсы иностранных поставщиков по импорту, таможенные бумаги и фотографии фискальных чеков, которые клиенты присылают вам на возмещение. Это и есть весь продукт. Ниже на этой странице стоит сортировщик, который скажет, какие из ваших документов покупать у нас не надо. |
| `product.faq.q2` | What accuracy do you get? | რა სიზუსტეს აღწევთ? | Какую точность вы даёте? |
| `product.faq.a2` | We do not know, and neither does anyone else, and that is the honest answer. There is no published Georgian-language document-extraction benchmark from any vendor on the planet. The 99% figures everyone quotes are English-document numbers on English invoices, and repeating them at you would be a lie by omission. So we measure it on your documents, before you pay, and that number is the one we both work from afterwards. If it comes back badly, we will tell you and you will have lost nothing. | არ ვიცით და არც არავინ იცის, და ეს პატიოსანი პასუხია. ქართული ენის დოკუმენტების ამოკითხვის გამოქვეყნებული ბენჩმარკი პლანეტაზე არც ერთ მომწოდებელს არ აქვს. 99%-იანი ციფრები, რომლებსაც ყველა ციტირებს, ინგლისურ დოკუმენტებზეა და მათი გამეორება თქვენს წინაშე დუმილით ტყუილი იქნება. ამიტომ ვზომავთ თქვენს დოკუმენტებზე, გადახდამდე, და სწორედ ეს ციფრი გვექნება ორივეს სამუშაო საზომად. თუ ცუდი გამოვა, გეტყვით და თქვენ არაფერს დაკარგავთ. | Мы не знаем, и никто не знает, и это честный ответ. Опубликованного бенчмарка по извлечению данных из грузинских документов нет ни у одного поставщика на планете. Цифры в 99%, которые все цитируют, получены на английских документах, и повторять их вам было бы ложью умолчанием. Поэтому мы замеряем на ваших документах, до оплаты, и дальше работаем именно с этой цифрой. Если она выйдет плохой, мы так и скажем, а вы ничего не потеряете. |
| `product.faq.q3` | Does it read Georgian Mkhedruli, or only English and Russian? | კითხულობს ქართულ მხედრულს თუ მხოლოდ ინგლისურსა და რუსულს? | Он читает грузинский мхедрули или только английский и русский? |
| `product.faq.a3` | Printed Mkhedruli, yes. It is the photographed, angled, creased, thermal-printed receipt that decides whether this works for you, and that is exactly what we want in the pilot pile. | ნაბეჭდ მხედრულს, დიახ. სწორედ გადაღებული, ირიბი, დაჭმუჭნული, თერმოქაღალდზე დაბეჭდილი ჩეკი წყვეტს, გამოგადგებათ თუ არა ეს, და სწორედ ის გვინდა პილოტის გროვაში. | Печатный мхедрули, да. Решает именно сфотографированный, перекошенный, мятый, напечатанный на термобумаге чек, и именно его мы и хотим видеть в пилотной куче. |
| `product.faq.q4` | What about handwriting? | ხელნაწერზე რას იტყვით? | А рукописный текст? |
| `product.faq.a4` | No. Not reliably, not in Georgian, not by us and not by anyone selling you something this year. If your pile is mostly handwritten, we are the wrong purchase and we would rather say that now. | არა. საიმედოდ არა, ქართულად არა, არც ჩვენ და არც ვინმე, ვინც წელს რამეს გყიდით. თუ თქვენი გროვა ძირითადად ხელნაწერია, არასწორი შენაძენი ვართ და გვირჩევნია ეს ახლავე ვთქვათ. | Нет. Не надёжно, не по-грузински, ни у нас, ни у кого-либо, кто продаёт вам что-то в этом году. Если ваша куча в основном рукописная, мы неправильная покупка, и лучше мы скажем это сейчас. |
| `product.faq.q5` | What happens when it gets a number wrong? Who catches it? | რა ხდება, როცა ციფრს არასწორად წაიკითხავს? ვინ დაიჭერს? | Что будет, если он прочитает цифру неверно? Кто это поймает? |
| `product.faq.a5` | The system does, most of the time, because it knows when it is unsure and holds that field back rather than guessing. A human sees the amber ones. The point of the confidence score is not to look clever, it is to make sure a wrong number never quietly becomes a posted row. | სისტემა თავად, უმეტეს შემთხვევაში, რადგან იცის, როდის არაა დარწმუნებული, და იმ ველს გამოცნობის ნაცვლად აჩერებს. ყვითლებს ადამიანი ხედავს. ნდობის ქულის აზრი არაა ჭკვიანურად გამოიყურებოდეს, არამედ ის, რომ არასწორი ციფრი ჩუმად არ იქცეს გატარებულ ჩანაწერად. | Чаще всего сама система, потому что она знает, когда не уверена, и придерживает такое поле вместо того, чтобы угадывать. Жёлтые видит человек. Смысл оценки уверенности не в том, чтобы красиво выглядеть, а в том, чтобы неверная цифра никогда тихо не стала проводкой. |
| `product.faq.q6` | Do you integrate with ORIS, Balance or 1C? | ინტეგრირდებით ORIS-თან, Balance-თან ან 1C-სთან? | Вы интегрируетесь с ORIS, Balance или 1C? |
| `product.faq.a6` | We produce a file those systems import. Whether we can go further and post directly depends on your installation, and we will look at yours before promising anything, because the ones customised by a contractor who has since disappeared are a genre of their own. | ვამზადებთ ფაილს, რომელსაც ეს სისტემები შემოაქვთ. შეგვიძლია თუ არა უფრო შორს წასვლა და პირდაპირ გატარება, თქვენს ინსტალაციაზეა დამოკიდებული, და ჯერ თქვენსას ვნახავთ, სანამ დაგპირდებით, რადგან ისინი, რომლებიც გამქრალმა კონტრაქტორმა გადააკეთა, ცალკე ჟანრია. | Мы отдаём файл, который эти системы импортируют. Можем ли пойти дальше и проводить напрямую, зависит от вашей установки, и мы посмотрим на неё до того, как что-то пообещать: те, что дорабатывал давно исчезнувший подрядчик, это отдельный жанр. |
| `product.faq.q7` | Do I have to change my accounting software? | საბუღალტრო პროგრამა უნდა შევიცვალო? | Мне придётся менять бухгалтерскую программу? |
| `product.faq.a7` | No, and if a vendor tells you that you do, he is selling you his software and calling it document processing. We fit around what you run. | არა, და თუ მომწოდებელი გეუბნებათ, რომ უნდა შეიცვალოთ, ის თავის პროგრამას გყიდით და დოკუმენტების დამუშავებას ეძახის. ჩვენ ვეწყობით იმას, რაც უკვე გიდგათ. | Нет, и если поставщик говорит, что придётся, он продаёт вам свою программу и называет это обработкой документов. Мы подстраиваемся под то, что у вас уже стоит. |
| `product.faq.q8` | What does it cost per document, and what if I only have 300 a month? | რა ღირს ერთი დოკუმენტი და თუ თვეში მხოლოდ 300 მაქვს? | Сколько стоит один документ, и что если у меня их всего 300 в месяц? |
| `product.faq.a8` | It is priced per document per client company, and 300 a month is small enough that you should think carefully about whether this is worth it at all. We will do that arithmetic with you honestly, because a bookkeeping firm with twenty client companies and eight thousand documents is a customer and a firm with three hundred documents is probably not, yet. | ფასდება დოკუმენტზე, თითო კლიენტ-კომპანიაზე, ხოლო თვეში 300 იმდენად მცირეა, რომ სერიოზულად უნდა დაფიქრდეთ, ღირს თუ არა საერთოდ. ამ არითმეტიკას პატიოსნად ერთად გავაკეთებთ, რადგან საბუღალტრო ფირმა ოცი კლიენტ-კომპანიითა და რვა ათასი დოკუმენტით კლიენტია, ხოლო ფირმა სამასი დოკუმენტით, ჯერჯერობით, ალბათ არა. | Цена за документ на каждую клиентскую компанию, а 300 в месяц, это достаточно мало, чтобы серьёзно подумать, нужно ли вам это вообще. Мы честно посчитаем это вместе, потому что бухгалтерская фирма с двадцатью клиентскими компаниями и восемью тысячами документов, это клиент, а фирма с тремя сотнями, пока, скорее всего, нет. |
| `product.faq.q9` | Where are my documents stored? Do they leave Georgia? | სად ინახება ჩემი დოკუმენტები? საქართველოს ტოვებენ? | Где хранятся мои документы? Они покидают Грузию? |
| `product.faq.a9` | We will tell you plainly where they sit and what leaves the country, and we can run the whole thing on your own server if the Personal Data Protection Service is a conversation you would rather have once and never again. This is a normal request from an accounting firm and it should be. | პირდაპირ გეტყვით, სად ზის და რა ტოვებს ქვეყანას, და მთელი სისტემა თქვენსავე სერვერზე შეგვიძლია გავუშვათ, თუ პერსონალურ მონაცემთა დაცვის სამსახური ისეთი საუბარია, რომელიც ერთხელ გინდათ და მერე აღარასოდეს. ეს ნორმალური მოთხოვნაა საბუღალტრო ფირმისგან და ასეც უნდა იყოს. | Мы прямо скажем, где они лежат и что покидает страну, и можем поднять всё на вашем сервере, если Служба защиты персональных данных, это разговор, который вы хотите провести один раз и больше никогда. Это нормальная просьба от бухгалтерской фирмы, и так и должно быть. |
| `product.faq.q10` | Can it read a phone photo, or do I need a scanner? | წაიკითხავს ტელეფონის ფოტოს თუ სკანერი მჭირდება? | Он прочитает фотографию с телефона или нужен сканер? |
| `product.faq.a10` | A phone photo, yes, and that is most of what actually arrives. There is a section further down that shows you the same document as a clean scan, an angled phone photo, a crumpled thermal receipt, and a handwritten note, with the real output for each, including the one where it fails. | ტელეფონის ფოტოს, დიახ, და სწორედ ის მოდის ხოლმე. ქვემოთ არის სექცია, სადაც ერთი და იგივე დოკუმენტი გიჩვენებთ სუფთა სკანად, ირიბ ტელეფონურ ფოტოდ, დაჭმუჭნულ თერმოჩეკად და ხელნაწერ ჩანაწერად, თითოეულის რეალური შედეგით, მათ შორის იმით, სადაც ვერ ვართყვით. | Фотографию с телефона, да, и именно она обычно и приходит. Ниже есть раздел, где один и тот же документ показан как чистый скан, как перекошенное фото с телефона, как мятый термочек и как рукописная записка, с настоящим результатом по каждому, включая тот, где мы не справляемся. |
| `product.faq.q11` | What happens when a supplier changes their invoice layout? | რა ხდება, როცა მომწოდებელი ინვოისის განლაგებას შეიცვლის? | Что будет, когда поставщик поменяет вёрстку инвойса? |
| `product.faq.a11` | It usually keeps working, because it is reading meaning rather than pixel positions. When it does not, we fix the mapping and you are not billed for it, because a layout change is our problem to absorb and not a reason to send you an invoice. | ჩვეულებრივ აგრძელებს მუშაობას, რადგან აზრს კითხულობს და არა პიქსელების პოზიციებს. როცა ვერ აგრძელებს, ჩვენ ვასწორებთ და ამაში ინვოისს არ გიგზავნით, რადგან განლაგების ცვლილება ჩვენი პრობლემაა ასათვისებელი და არა მიზეზი, თქვენ დაგარიცხოთ. | Обычно продолжает работать, потому что читает смысл, а не позиции пикселей. Когда не продолжает, мы правим сопоставление и счёт вам за это не выставляем: смена вёрстки, это наша проблема, а не повод вас доить. |
| `product.faq.q12` | My accountant is already fast. Prove you are faster. | ჩემი ბუღალტერი უკვე სწრაფია. დამიმტკიცეთ, რომ თქვენ უფრო სწრაფი ხართ. | Мой бухгалтер и так быстрый. Докажите, что вы быстрее. |
| `product.faq.a12` | We will not, on this page. Send us a month of his real work, we will run it, and we will show you both his time and ours on the same pile. If he wins, he wins, and you will have learned something useful about your own firm for free. | ამ გვერდზე ამას არ დავამტკიცებთ. გამოგვიგზავნეთ მისი ერთი თვის ნამდვილი სამუშაო, ჩვენ გავუშვებთ და ერთსა და იმავე გროვაზე ორივეს დროს გაჩვენებთ. თუ ის მოიგებს, მოიგო, ხოლო თქვენ საკუთარ ფირმაზე უფასოდ გაიგებთ სასარგებლო რამეს. | На этой странице не будем. Пришлите месяц его настоящей работы, мы прогоним и покажем на одной и той же куче его время и наше. Выиграет он, значит выиграл, а вы бесплатно узнаете кое-что полезное о собственной фирме. |
| `product.faq.q13` | Can it handle customs declarations and import paperwork? | შეუძლია საბაჟო დეკლარაციებისა და საიმპორტო ქაღალდების დამუშავება? | Он справится с таможенными декларациями и импортными бумагами? |
| `product.faq.a13` | Yes, and for a customs broker or a freight forwarder that is usually where the volume and the pain actually are. Georgia is a transit corridor. Declarations, CMRs, packing lists and certificates of origin are a real pile and nobody has automated them here. | დიახ, და საბაჟო ბროკერისთვის ან ექსპედიტორისთვის სწორედ იქაა მოცულობაც და ტკივილიც. საქართველო სატრანზიტო დერეფანია. დეკლარაციები, CMR-ები, ჩალაგების სიები და წარმოშობის სერტიფიკატები ნამდვილი გროვაა და აქ მას არავის გაუავტომატებია. | Да, и для таможенного брокера или экспедитора именно там обычно и объём, и боль. Грузия, это транзитный коридор. Декларации, CMR, упаковочные листы и сертификаты происхождения, это настоящая куча, и здесь её никто не автоматизировал. |
| `product.faq.q14` | If the AI misreads a figure and I underpay VAT, who is responsible? | თუ AI ციფრს არასწორად წაიკითხავს და დღგ-ს ნაკლებად გადავიხდი, ვინ აგებს პასუხს? | Если AI неверно прочитает цифру и я недоплачу НДС, кто отвечает? |
| `product.faq.a14` | Your accountant signs the entry, so your accountant is responsible, and that is written into the contract in plain language. We produce a draft. We check our own accuracy and we hold back what we are unsure of. But a vendor who offers to carry your tax liability is either lying or has not read the law, and either way you should not sign with him. | ჩანაწერს ხელს თქვენი ბუღალტერი აწერს, ამიტომ პასუხს თქვენი ბუღალტერი აგებს, და ეს ხელშეკრულებაში მარტივი ენითაა ჩაწერილი. ჩვენ დრაფტს ვამზადებთ. საკუთარ სიზუსტეს ვამოწმებთ და იმას ვაჩერებთ, რაშიც დარწმუნებული არ ვართ. მაგრამ მომწოდებელი, რომელიც თქვენს საგადასახადო პასუხისმგებლობას იღებს, ან ტყუის, ან კანონი არ წაუკითხავს, და ორივე შემთხვევაში მასთან ხელი არ უნდა მოაწეროთ. | Проводку подписывает ваш бухгалтер, значит отвечает ваш бухгалтер, и это простым языком записано в договоре. Мы готовим черновик. Мы проверяем собственную точность и придерживаем то, в чём не уверены. Но поставщик, который предлагает взять на себя вашу налоговую ответственность, либо врёт, либо не читал закон, и в обоих случаях подписывать с ним не стоит. |
| `product.cta.heading` | Send us the month you hate | გამოგვიგზავნეთ თვე, რომელიც გძულთ | Пришлите месяц, который вы ненавидите |
| `product.cta.subtitle` | Leave your number. We will take a month of your real documents, measure the accuracy on them, and show you the number. First three firms pay nothing for it. | დატოვეთ ნომერი. ავიღებთ თქვენი ნამდვილი დოკუმენტების ერთ თვეს, გავზომავთ მასზე სიზუსტეს და ციფრს გაჩვენებთ. პირველი სამი ფირმა ამაში არაფერს იხდის. | Оставьте номер. Возьмём месяц ваших настоящих документов, замерим на них точность и покажем цифру. Первые три фирмы не платят за это ничего. |
| `product.cta.phoneLabel` | Phone number | ტელეფონის ნომერი | Номер телефона |
| `product.cta.phoneSubmit` | Call me | დამირეკეთ | Позвоните мне |
| `product.cta.phoneNote` | We call back within 24 hours | დაგირეკავთ 24 საათში | Перезвоним в течение 24 часов |
| `product.cta.orWrite` | Or write to us: | ან მოგვწერეთ: | Или напишите: |
| `product.wordmark.line` | The row is the product. | ჩანაწერი არის პროდუქტი. | Проводка и есть продукт. |
| `product.row.eyebrow` | Watch a receipt become a row | ნახეთ, როგორ იქცევა ჩეკი ჩანაწერად | Как чек становится проводкой |
| `product.row.heading` | This is the whole product, in nine seconds. | ეს არის მთელი პროდუქტი, ცხრა წამში. | Это весь продукт, за девять секунд. |
| `product.row.subtitle` | OCR is a commodity. Anyone can buy the engine. What you are paying for is the last step, and everybody else stops one step short of it. | OCR სასაქონლო ნივთია. ძრავის ყიდვა ყველას შეუძლია. თქვენ ბოლო ნაბიჯში იხდით, ხოლო დანარჩენები სწორედ მასზე ერთი ნაბიჯით ადრე ჩერდებიან. | OCR, это ширпотреб. Движок может купить любой. Вы платите за последний шаг, а все остальные останавливаются ровно за шаг до него. |
| `product.row.play` | Run it | გაშვება | Запустить |
| `product.row.again` | Run it again | თავიდან გაშვება | Запустить ещё раз |
| `product.row.running` | Reading... | იკითხება... | Читаем... |
| `product.row.pick` | Pick a document | აირჩიეთ დოკუმენტი | Выберите документ |
| `product.row.d1` | Foreign supplier invoice | უცხოური მომწოდებლის ინვოისი | Инвойс иностранного поставщика |
| `product.row.d2` | BOG bank statement | BOG-ის ბანკის ამონაწერი | Выписка BOG |
| `product.row.d3` | Fiscal receipt, photographed | ფისკალური ჩეკი, გადაღებული | Фискальный чек, сфотографирован |
| `product.row.extracting` | Extracting | ამოკითხვა | Извлечение |
| `product.row.posting` | Posting | გატარება | Проведение |
| `product.row.posted` | Posted | გატარებულია | Проведено |
| `product.row.ledger` | ORIS, journal entry | ORIS, საბუღალტრო გატარება | ORIS, бухгалтерская проводка |
| `product.row.colDate` | Date | თარიღი | Дата |
| `product.row.colDoc` | Document | დოკუმენტი | Документ |
| `product.row.colCounter` | Counterparty | კონტრაგენტი | Контрагент |
| `product.row.colDebit` | Debit | დებეტი | Дебет |
| `product.row.colCredit` | Credit | კრედიტი | Кредит |
| `product.row.colNet` | Net | თანხა | Сумма |
| `product.row.colVat` | VAT | დღგ | НДС |
| `product.row.colTotal` | Total | სულ | Итого |
| `product.row.note` | One row. That is what nine seconds of machine time buys, and it is the thing your bookkeeper was doing by hand. | ერთი ჩანაწერი. სწორედ ამას ყიდულობს მანქანის ცხრა წამი, და სწორედ ამას აკეთებდა თქვენი ბუღალტერი ხელით. | Одна проводка. Именно её покупают девять секунд машинного времени, и именно её ваш бухгалтер делал руками. |
| `product.row.commodity` | Raw text OCR costs about 1.50 dollars per 1,000 pages from Amazon. That is the part everyone sells you. The row is the part nobody does. | ტექსტის ნედლი OCR Amazon-თან დაახლოებით 1,50 დოლარი ღირს 1000 გვერდზე. სწორედ ამ ნაწილს გყიდიან ყველანი. ჩანაწერი კი ის ნაწილია, რომელსაც არავინ აკეთებს. | Сырой OCR текста стоит у Amazon около 1,50 доллара за 1000 страниц. Именно эту часть вам все и продают. А проводку не делает никто. |
| `product.split.eyebrow` | The half you should not pay us for | ის ნახევარი, რომელშიც არ უნდა გადაგვიხადოთ | Та половина, за которую платить нам не надо |
| `product.split.heading` | Sort your own pile. We will tell you where we are useless. | დაახარისხეთ თქვენივე გროვა. ჩვენ გეტყვით, სად ვართ უსარგებლო. | Разберите свою же кучу. Мы скажем, где мы бесполезны. |
| `product.split.subtitle` | Drag each document to where it belongs. Most vendors would rather you did not know this. | მიათრიეთ თითოეული დოკუმენტი იქ, სადაც ეკუთვნის. მომწოდებელთა უმეტესობას ურჩევნია, ეს არ იცოდეთ. | Отправьте каждый документ туда, где ему место. Большинство поставщиков предпочли бы, чтобы вы этого не знали. |
| `product.split.free` | Already structured. Pull it from rs.ge, free. | უკვე სტრუქტურირებულია. აიღეთ rs.ge-დან, უფასოდ. | Уже структурировано. Возьмите из rs.ge, бесплатно. |
| `product.split.paid` | Actually needs us. | მართლა გვჭირდებით. | Здесь мы действительно нужны. |
| `product.split.unsorted` | Your pile | თქვენი გროვა | Ваша куча |
| `product.split.correct` | Right | სწორია | Верно |
| `product.split.wrong` | Not quite | არა მთლად | Не совсем |
| `product.split.reveal` | Show me the answer | მაჩვენე პასუხი | Показать ответ |
| `product.split.reset` | Try again | თავიდან | Ещё раз |
| `product.split.d1` | Domestic tax invoice | შიდა საგადასახადო ანგარიშ-ფაქტურა | Внутренняя налоговая счёт-фактура |
| `product.split.d2` | Domestic waybill | შიდა ზედნადები | Внутренняя накладная |
| `product.split.d3` | Bank statement PDF, BOG | ბანკის ამონაწერი PDF, BOG | Выписка банка PDF, BOG |
| `product.split.d4` | Foreign supplier invoice | უცხოური მომწოდებლის ინვოისი | Инвойс иностранного поставщика |
| `product.split.d5` | Customs declaration | საბაჟო დეკლარაცია | Таможенная декларация |
| `product.split.d6` | Photographed fiscal receipt | გადაღებული ფისკალური ჩეკი | Сфотографированный фискальный чек |
| `product.split.d7` | Bank statement PDF, TBC | ბანკის ამონაწერი PDF, TBC | Выписка банка PDF, TBC |
| `product.split.d8` | Contract | ხელშეკრულება | Договор |
| `product.split.e1` | Mandatory in rs.ge. It is already structured data and it is already yours. | სავალდებულოა rs.ge-ში. ის უკვე სტრუქტურირებული მონაცემია და უკვე თქვენია. | Обязательна в rs.ge. Это уже структурированные данные и они уже ваши. |
| `product.split.e2` | Mandatory in rs.ge. Same. Do not pay anyone to read it. | სავალდებულოა rs.ge-ში. იგივე. მის წასაკითხად არავის უხადოთ. | Обязательна в rs.ge. То же самое. Не платите никому за её чтение. |
| `product.split.e3` | rs.ge has never seen this. It is a PDF and someone re-types it every month. | rs.ge-ს ის არასოდეს უნახავს. ეს PDF-ია და ვიღაც მას ყოველთვე ხელით კრეფს. | rs.ge её никогда не видел. Это PDF, и кто-то перепечатывает его каждый месяц. |
| `product.split.e4` | An import. rs.ge has no idea this exists. | იმპორტია. rs.ge-ს წარმოდგენა არ აქვს, რომ ეს არსებობს. | Это импорт. rs.ge понятия не имеет, что он существует. |
| `product.split.e5` | Nobody has automated this in Georgia. It is a real pile and it is real money. | საქართველოში ამას არავის გაუავტომატებია. ეს ნამდვილი გროვაა და ნამდვილი ფული. | В Грузии это никто не автоматизировал. Это настоящая куча и настоящие деньги. |
| `product.split.e6` | A photograph, taken at an angle, of a thermal receipt that is already fading. | ფოტო, ირიბად გადაღებული, თერმოჩეკისა, რომელიც უკვე ქრება. | Фотография, снятая под углом, термочека, который уже выцветает. |
| `product.split.e7` | rs.ge has never seen this either. | rs.ge-ს ესეც არასოდეს უნახავს. | Её rs.ge тоже никогда не видел. |
| `product.split.e8` | Not in rs.ge, and the clauses that matter are prose, not fields. | rs.ge-ში არაა, ხოლო მნიშვნელოვანი პუნქტები ტექსტია და არა ველები. | В rs.ge его нет, а важные пункты, это текст, а не поля. |
| `product.split.score` | You sorted | დაახარისხეთ | Вы разобрали |
| `product.split.of` | of | -დან | из |
| `product.split.outro` | Half your pile is already free. We only want the other half, and now you know which half that is. | თქვენი გროვის ნახევარი უკვე უფასოა. ჩვენ მხოლოდ მეორე ნახევარი გვინდა, და ახლა უკვე იცით, რომელი ნახევარია ეს. | Половина вашей кучи уже бесплатна. Нам нужна только вторая половина, и теперь вы знаете, какая именно. |
| `product.scans.eyebrow` | Where it breaks | სად იშლება | Где это ломается |
| `product.scans.heading` | The same receipt, four ways. One of them defeats us. | ერთი და იგივე ჩეკი, ოთხნაირად. ერთი მათგანი გვამარცხებს. | Один и тот же чек, четырьмя способами. Один из них нас побеждает. |
| `product.scans.subtitle` | Every vendor shows you the clean scan. Here is what actually arrives in your inbox. | ყველა მომწოდებელი სუფთა სკანს გიჩვენებთ. აი, რა მოდის სინამდვილეში თქვენს ფოსტაში. | Все поставщики показывают вам чистый скан. Вот что на самом деле приходит вам на почту. |
| `product.scans.s1` | Clean scan | სუფთა სკანი | Чистый скан |
| `product.scans.s2` | Phone photo, angled | ტელეფონის ფოტო, ირიბად | Фото с телефона, под углом |
| `product.scans.s3` | Crumpled thermal receipt | დაჭმუჭნული თერმოჩეკი | Мятый термочек |
| `product.scans.s4` | Handwritten note | ხელნაწერი ჩანაწერი | Рукописная записка |
| `product.scans.s1r` | Every field read. Nothing held back. | ყველა ველი წაკითხულია. არაფერი შეჩერებულა. | Все поля прочитаны. Ничего не придержано. |
| `product.scans.s2r` | Every field read. The total was held back for a human, because the glare crossed it. | ყველა ველი წაკითხულია. სულ თანხა ადამიანისთვის შეჩერდა, რადგან მას ბრჭყვიალი გადაუარა. | Все поля прочитаны. Итоговую сумму придержали для человека, потому что по ней прошёл блик. |
| `product.scans.s3r` | Supplier and total read. Two line items held back. This is normal and it is why a human is in the loop. | მომწოდებელი და სულ თანხა წაკითხულია. ორი ხაზი შეჩერდა. ეს ნორმალურია და სწორედ ამიტომაა ადამიანი პროცესში. | Поставщик и итог прочитаны. Две строки придержаны. Это нормально, и именно поэтому в процессе стоит человек. |
| `product.scans.s4r` | We cannot read this. Not reliably, not in Georgian, not this year, and not by anyone selling you something today. | ამას ვერ ვკითხულობთ. საიმედოდ არა, ქართულად არა, წელს არა, და არც ვინმე, ვინც დღეს რამეს გყიდით. | Это мы прочитать не можем. Не надёжно, не по-грузински, не в этом году, и не у кого-либо, кто продаёт вам что-то сегодня. |
| `product.scans.ok` | Read | წაკითხულია | Прочитано |
| `product.scans.held` | Held for a human | შეჩერდა ადამიანისთვის | Придержано для человека |
| `product.scans.fail` | Cannot read | ვერ იკითხება | Не читается |
| `product.scans.note` | We are showing you the failure on purpose. A vendor who only shows you the clean scan is telling you what will happen in the demo, not what will happen in March. | წარუმატებლობას განზრახ გიჩვენებთ. მომწოდებელი, რომელიც მხოლოდ სუფთა სკანს გიჩვენებთ, გეუბნებათ, რა მოხდება დემოზე და არა იმას, რა მოხდება მარტში. | Мы показываем провал намеренно. Поставщик, который показывает только чистый скан, рассказывает вам, что будет на демо, а не что будет в марте. |
| `product.proof.ledger` | ORIS, journal entry | ORIS, საბუღალტრო გატარება | ORIS, бухгалтерская проводка |
| `product.proof.colDate` | Date | თარიღი | Дата |
| `product.proof.colCounter` | Counterparty | კონტრაგენტი | Контрагент |
| `product.proof.colVat` | VAT | დღგ | НДС |
| `product.proof.colTotal` | Total | სულ | Итого |
| `product.proof.note` | One posted row. That is the product, and it is the step everybody else stops one short of. | ერთი გატარებული ჩანაწერი. სწორედ ეს არის პროდუქტი და სწორედ მასზე ერთი ნაბიჯით ადრე ჩერდებიან ყველანი. | Одна проводка. Это и есть продукт, и это тот шаг, за который все остальные не доходят. |
