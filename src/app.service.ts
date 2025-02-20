import { Injectable } from '@nestjs/common';
import { GenresService } from './genres/genres.service';
import { lastValueFrom } from 'rxjs';
import * as fsPromises from 'fs/promises';
import { MoviesService } from './movies/movies.service';

@Injectable()
export class AppService {
  constructor(
    private genresService: GenresService,
    private movieService: MoviesService,
  ) {}

  async loadDatabases() {
    //Loading genres into Genres MS database

    const countriesList = [
      { shortName: 'an', nameRu: 'Андорра', nameEn: 'Andorra' },
      { shortName: 'an', nameRu: 'Андорра', nameEn: 'Andorra' },
      { shortName: 'ae', nameRu: 'ОАЭ', nameEn: 'United Arab Emirates' },
      { shortName: 'af', nameRu: 'Афганистан', nameEn: 'Afghanistan' },
      {
        shortName: 'ac',
        nameRu: 'Антигуа и Барбуда',
        nameEn: 'Antigua and Barbuda',
      },
      { shortName: 'av', nameRu: 'Ангилья', nameEn: 'Anguilla' },
      { shortName: 'al', nameRu: 'Албания', nameEn: 'Albania' },
      { shortName: 'am', nameRu: 'Армения', nameEn: 'Armenia' },
      { shortName: 'ao', nameRu: 'Ангола', nameEn: 'Angola' },
      { shortName: 'ar', nameRu: 'Аргентина', nameEn: 'Argentina' },
      {
        shortName: 'aq',
        nameRu: 'Американское Самоа',
        nameEn: 'American Samoa',
      },
      { shortName: 'au', nameRu: 'Австрия', nameEn: 'Austria' },
      { shortName: 'as', nameRu: 'Австралия', nameEn: 'Australia' },
      { shortName: 'aa', nameRu: 'Аруба', nameEn: 'Aruba' },
      { shortName: 'aj', nameRu: 'Азербайджан', nameEn: 'Azerbaijan' },
      {
        shortName: 'bk',
        nameRu: 'Босния и Герцеговина',
        nameEn: 'Bosnia and Herzegovina',
      },
      { shortName: 'bb', nameRu: 'Барбадос', nameEn: 'Barbados' },
      { shortName: 'bg', nameRu: 'Бангладеш', nameEn: 'Bangladesh' },
      { shortName: 'be', nameRu: 'Бельгия', nameEn: 'Belgium' },
      { shortName: 'uv', nameRu: 'Буркина-Фасо', nameEn: 'Burkina Faso' },
      { shortName: 'bu', nameRu: 'Болгария', nameEn: 'Bulgaria' },
      { shortName: 'ba', nameRu: 'Бахрейн', nameEn: 'Bahrain' },
      { shortName: 'by', nameRu: 'Бурунди', nameEn: 'Burundi' },
      { shortName: 'bn', nameRu: 'Бенин', nameEn: 'Benin' },
      { shortName: 'tb', nameRu: 'Сен-Бартелеми', nameEn: 'Saint Barthélemy' },
      { shortName: 'bd', nameRu: 'Бермудские острова', nameEn: 'Bermuda' },
      { shortName: 'bx', nameRu: 'Бруней', nameEn: 'Brunei' },
      { shortName: 'bl', nameRu: 'Боливия', nameEn: 'Bolivia' },
      { shortName: 'br', nameRu: 'Бразилия', nameEn: 'Brazil' },
      { shortName: 'bf', nameRu: 'Багамские острова', nameEn: 'Bahamas' },
      { shortName: 'bt', nameRu: 'Бутан', nameEn: 'Bhutan' },
      { shortName: 'bv', nameRu: 'Остров Буве', nameEn: 'Bouvet Island' },
      { shortName: 'bc', nameRu: 'Ботсвана', nameEn: 'Botswana' },
      { shortName: 'bo', nameRu: 'Беларусь', nameEn: 'Belarus' },
      { shortName: 'bh', nameRu: 'Белиз', nameEn: 'Belize' },
      { shortName: 'ca', nameRu: 'Канада', nameEn: 'Canada' },
      {
        shortName: 'ck',
        nameRu: 'Кокосовые (Килинг) острова',
        nameEn: 'Cocos (Keeling) Islands',
      },

      { shortName: 'cg', nameRu: 'ДР Конго', nameEn: 'DR Congo' },
      {
        shortName: 'ct',

        nameRu: 'Центральноафриканская Республика',
        nameEn: 'Central African Republic',
      },

      { shortName: 'cf', nameRu: 'Республика Конго', nameEn: 'Congo Republic' },
      { shortName: 'sz', nameRu: 'Швейцария', nameEn: 'Switzerland' },
      {
        shortName: 'iv',
        nameRu: 'Берег Слоновой Кости',
        nameEn: 'Ivory Coast',
      },
      { shortName: 'cw', nameRu: 'Острова Кука', nameEn: 'Cook Islands' },
      { shortName: 'ci', nameRu: 'Чили', nameEn: 'Chile' },
      { shortName: 'cm', nameRu: 'Камерун', nameEn: 'Cameroon' },
      { shortName: 'ch', nameRu: 'Китай', nameEn: 'China' },
      { shortName: 'co', nameRu: 'Колумбия', nameEn: 'Colombia' },
      { shortName: 'cs', nameRu: 'Коста-Рика', nameEn: 'Costa Rica' },
      { shortName: 'cu', nameRu: 'Куба', nameEn: 'Cuba' },
      { shortName: 'cv', nameRu: 'Кабо-Верде', nameEn: 'Cabo Verde' },
      { shortName: 'uc', nameRu: 'Кюрасао', nameEn: 'Curaçao' },
      {
        shortName: 'kt',
        nameRu: 'Остров Рождества',
        nameEn: 'Christmas Island',
      },
      { shortName: 'cy', nameRu: 'Кипр', nameEn: 'Cyprus' },
      { shortName: 'ez', nameRu: 'Чехия', nameEn: 'Czechia' },
      { shortName: 'gm', nameRu: 'Германия', nameEn: 'Germany' },
      { shortName: 'dj', nameRu: 'Джибути', nameEn: 'Djibouti' },
      { shortName: 'da', nameRu: 'Дания', nameEn: 'Denmark' },
      { shortName: 'do', nameRu: 'Доминика', nameEn: 'Dominica' },
      {
        shortName: 'dr',
        nameRu: 'Доминиканская Республика',
        nameEn: 'Dominican Republic',
      },
      { shortName: 'ag', nameRu: 'Алжир', nameEn: 'Algeria' },
      { shortName: 'ec', nameRu: 'Эквадор', nameEn: 'Ecuador' },
      { shortName: 'en', nameRu: 'Эстония', nameEn: 'Estonia' },
      { shortName: 'eg', nameRu: 'Египет', nameEn: 'Egypt' },
      { shortName: 'wi', nameRu: 'Западная Сахара', nameEn: 'Western Sahara' },
      { shortName: 'er', nameRu: 'Эритрея', nameEn: 'Eritrea' },
      { shortName: 'sp', nameRu: 'Испания', nameEn: 'Spain' },
      { shortName: 'et', nameRu: 'Эфиопия', nameEn: 'Ethiopia' },
      { shortName: 'fi', nameRu: 'Финляндия', nameEn: 'Finland' },
      { shortName: 'fj', nameRu: 'Фиджи', nameEn: 'Fiji' },
      {
        shortName: 'fk',
        nameRu: 'Фолклендские острова',
        nameEn: 'Falkland Islands',
      },
      { shortName: 'fm', nameRu: 'Микронезия', nameEn: 'Micronesia' },
      { shortName: 'fo', nameRu: 'Фарерские острова', nameEn: 'Faroe Islands' },
      { shortName: 'fr', nameRu: 'Франция', nameEn: 'France' },
      { shortName: 'gb', nameRu: 'Габон', nameEn: 'Gabon' },
      { shortName: 'uk', nameRu: 'Великобритания', nameEn: 'United Kingdom' },
      { shortName: 'gj', nameRu: 'Гренада', nameEn: 'Grenada' },
      { shortName: 'gg', nameRu: 'Грузия', nameEn: 'Georgia' },
      {
        shortName: 'fg',
        nameRu: 'Французская Гвиана',
        nameEn: 'French Guiana',
      },
      { shortName: 'gk', nameRu: 'Гернси', nameEn: 'Guernsey' },
      { shortName: 'gh', nameRu: 'Гана', nameEn: 'Ghana' },
      { shortName: 'gi', nameRu: 'Гибралтар', nameEn: 'Gibraltar' },
      { shortName: 'gl', nameRu: 'Гренландия', nameEn: 'Greenland' },
      { shortName: 'ga', nameRu: 'Гамбия', nameEn: 'The Gambia' },
      { shortName: 'gv', nameRu: 'Гвинея', nameEn: 'Guinea' },
      { shortName: 'gp', nameRu: 'Гваделупа', nameEn: 'Guadeloupe' },
      {
        shortName: 'ek',
        nameRu: 'Экваториальная Гвинея',
        nameEn: 'Equatorial Guinea',
      },
      { shortName: 'gr', nameRu: 'Греция', nameEn: 'Greece' },
      { shortName: 'gt', nameRu: 'Гватемала', nameEn: 'Guatemala' },
      { shortName: 'gq', nameRu: 'Гуам', nameEn: 'Guam' },
      { shortName: 'pu', nameRu: 'Гвинея-Бисау', nameEn: 'Guinea-Bissau' },
      { shortName: 'gy', nameRu: 'Гайана', nameEn: 'Guyana' },
      { shortName: 'hk', nameRu: 'Гонконг', nameEn: 'Hong Kong' },
      { shortName: 'ho', nameRu: 'Гондурас', nameEn: 'Honduras' },
      { shortName: 'hr', nameRu: 'Хорватия', nameEn: 'Croatia' },
      { shortName: 'ha', nameRu: 'Гаити', nameEn: 'Haiti' },
      { shortName: 'hu', nameRu: 'Венгрия', nameEn: 'Hungary' },
      { shortName: 'id', nameRu: 'Индонезия', nameEn: 'Indonesia' },
      { shortName: 'ei', nameRu: 'Ирландия', nameEn: 'Ireland' },
      { shortName: 'is', nameRu: 'Израиль', nameEn: 'Israel' },
      { shortName: 'im', nameRu: 'Остров Мэн', nameEn: 'Isle of Man' },
      { shortName: 'in', nameRu: 'Индия', nameEn: 'India' },
      { shortName: 'iz', nameRu: 'Ирак', nameEn: 'Iraq' },
      { shortName: 'ir', nameRu: 'Иран', nameEn: 'Iran' },
      { shortName: 'ic', nameRu: 'Исландия', nameEn: 'Iceland' },
      { shortName: 'it', nameRu: 'Италия', nameEn: 'Italy' },
      { shortName: 'je', nameRu: 'Джерси', nameEn: 'Jersey' },
      { shortName: 'jm', nameRu: 'Ямайка', nameEn: 'Jamaica' },
      { shortName: 'jo', nameRu: 'Иордания', nameEn: 'Jordan' },
      { shortName: 'ja', nameRu: 'Япония', nameEn: 'Japan' },
      { shortName: 'ke', nameRu: 'Кения', nameEn: 'Kenya' },
      { shortName: 'kg', nameRu: 'Кыргызстан', nameEn: 'Kyrgyzstan' },
      { shortName: 'cb', nameRu: 'Камбоджа', nameEn: 'Cambodia' },
      { shortName: 'kr', nameRu: 'Кирибати', nameEn: 'Kiribati' },
      { shortName: 'cn', nameRu: 'Коморские острова', nameEn: 'Comoros' },
      {
        shortName: 'sc',
        nameRu: 'Сент-Китс и Невис',
        nameEn: 'St Kitts and Nevis',
      },
      { shortName: 'kn', nameRu: 'Северная Корея', nameEn: 'North Korea' },
      { shortName: 'ks', nameRu: 'Южная Корея', nameEn: 'South Korea' },
      { shortName: 'ku', nameRu: 'Кувейт', nameEn: 'Kuwait' },
      {
        shortName: 'cj',
        nameRu: 'Каймановы острова',
        nameEn: 'Cayman Islands',
      },
      { shortName: 'kz', nameRu: 'Казахстан', nameEn: 'Kazakhstan' },
      { shortName: 'la', nameRu: 'Лаос', nameEn: 'Laos' },
      { shortName: 'le', nameRu: 'Ливан', nameEn: 'Lebanon' },
      { shortName: 'st', nameRu: 'Сент-Люсия', nameEn: 'Saint Lucia' },
      { shortName: 'ls', nameRu: 'Лихтенштейн', nameEn: 'Liechtenstein' },
      { shortName: 'ce', nameRu: 'Шри-Ланка', nameEn: 'Sri Lanka' },
      { shortName: 'li', nameRu: 'Либерия', nameEn: 'Liberia' },
      { shortName: 'lt', nameRu: 'Лесото', nameEn: 'Lesotho' },
      { shortName: 'lh', nameRu: 'Литва', nameEn: 'Lithuania' },
      { shortName: 'lu', nameRu: 'Люксембург', nameEn: 'Luxembourg' },
      { shortName: 'lg', nameRu: 'Латвия', nameEn: 'Latvia' },
      { shortName: 'ly', nameRu: 'Ливия', nameEn: 'Libya' },
      { shortName: 'mo', nameRu: 'Марокко', nameEn: 'Morocco' },
      { shortName: 'mn', nameRu: 'Монако', nameEn: 'Monaco' },
      { shortName: 'md', nameRu: 'Молдова', nameEn: 'Moldova' },
      { shortName: 'mj', nameRu: 'Черногория', nameEn: 'Montenegro' },
      { shortName: 'rn', nameRu: 'Сент-Мартин', nameEn: 'Saint Martin' },
      { shortName: 'ma', nameRu: 'Мадагаскар', nameEn: 'Madagascar' },
      {
        shortName: 'rm',
        nameRu: 'Маршалловы острова',
        nameEn: 'Marshall Islands',
      },
      {
        shortName: 'mk',
        nameRu: 'Северная Македония',
        nameEn: 'North Macedonia',
      },
      { shortName: 'ml', nameRu: 'Мали', nameEn: 'Mali' },
      { shortName: 'bm', nameRu: 'Мьянма', nameEn: 'Myanmar' },
      { shortName: 'mg', nameRu: 'Монголия', nameEn: 'Mongolia' },
      { shortName: 'mc', nameRu: 'Макао', nameEn: 'Macao' },
      { shortName: 'mb', nameRu: 'Мартиника', nameEn: 'Martinique' },
      { shortName: 'mr', nameRu: 'Мавритания', nameEn: 'Mauritania' },
      { shortName: 'mh', nameRu: 'Монтсеррат', nameEn: 'Montserrat' },
      { shortName: 'mt', nameRu: 'Мальта', nameEn: 'Malta' },
      { shortName: 'mp', nameRu: 'Маврикий', nameEn: 'Mauritius' },
      { shortName: 'mv', nameRu: 'Мальдивы', nameEn: 'Maldives' },
      { shortName: 'mi', nameRu: 'Малави', nameEn: 'Malawi' },
      { shortName: 'mx', nameRu: 'Мексика', nameEn: 'Mexico' },
      { shortName: 'my', nameRu: 'Малайзия', nameEn: 'Malaysia' },
      { shortName: 'mz', nameRu: 'Мозамбик', nameEn: 'Mozambique' },
      { shortName: 'wa', nameRu: 'Намибия', nameEn: 'Namibia' },
      { shortName: 'nc', nameRu: 'Новая Каледония', nameEn: 'New Caledonia' },
      { shortName: 'ng', nameRu: 'Нигер', nameEn: 'Niger' },
      { shortName: 'nf', nameRu: 'Остров Норфолк', nameEn: 'Norfolk Island' },
      { shortName: 'ni', nameRu: 'Нигерия', nameEn: 'Nigeria' },
      { shortName: 'nu', nameRu: 'Никарагуа', nameEn: 'Nicaragua' },
      { shortName: 'nl', nameRu: 'Нидерланды', nameEn: 'Netherlands' },
      { shortName: 'no', nameRu: 'Норвегия', nameEn: 'Norway' },
      { shortName: 'np', nameRu: 'Непал', nameEn: 'Nepal' },
      { shortName: 'nr', nameRu: 'Науру', nameEn: 'Nauru' },
      { shortName: 'ne', nameRu: 'Ниуэ', nameEn: 'Niue' },
      { shortName: 'nz', nameRu: 'Новая Зеландия', nameEn: 'New Zealand' },
      { shortName: 'mu', nameRu: 'Оман', nameEn: 'Oman' },
      { shortName: 'pm', nameRu: 'Панама', nameEn: 'Panama' },
      { shortName: 'pe', nameRu: 'Перу', nameEn: 'Peru' },
      {
        shortName: 'fp',
        nameRu: 'Французская Полинезия',
        nameEn: 'French Polynesia',
      },
      {
        shortName: 'pp',
        nameRu: 'Папуа-Новая Гвинея',
        nameEn: 'Papua New Guinea',
      },
      { shortName: 'rp', nameRu: 'Филиппины', nameEn: 'Philippines' },
      { shortName: 'pk', nameRu: 'Пакистан', nameEn: 'Pakistan' },
      { shortName: 'pl', nameRu: 'Польша', nameEn: 'Poland' },
      {
        shortName: 'sb',
        nameRu: 'Сен-Пьер и Микелон',
        nameEn: 'Saint Pierre and Miquelon',
      },
      {
        shortName: 'pc',
        nameRu: 'Острова Питкэрн',
        nameEn: 'Pitcairn Islands',
      },
      { shortName: 'rq', nameRu: 'Пуэрто-Рико', nameEn: 'Puerto Rico' },
      { shortName: 'we', nameRu: 'Палестина', nameEn: 'Palestine' },
      { shortName: 'po', nameRu: 'Португалия', nameEn: 'Portugal' },
      { shortName: 'ps', nameRu: 'Палау', nameEn: 'Palau' },
      { shortName: 'pa', nameRu: 'Парагвай', nameEn: 'Paraguay' },
      { shortName: 'qa', nameRu: 'Катар', nameEn: 'Qatar' },
      { shortName: 're', nameRu: 'Реюньон', nameEn: 'Réunion' },
      { shortName: 'ro', nameRu: 'Румыния', nameEn: 'Romania' },
      { shortName: 'ri', nameRu: 'Сербия', nameEn: 'Serbia' },
      { shortName: 'rs', nameRu: 'Россия', nameEn: 'Russia' },
      { shortName: 'rw', nameRu: 'Руанда', nameEn: 'Rwanda' },
      { shortName: 'sa', nameRu: 'Саудовская Аравия', nameEn: 'Saudi Arabia' },
      {
        shortName: 'bp',
        nameRu: 'Соломоновы острова',
        nameEn: 'Solomon Islands',
      },
      { shortName: 'se', nameRu: 'Сейшельские острова', nameEn: 'Seychelles' },
      { shortName: 'su', nameRu: 'СССР', nameEn: 'USSR' },
      { shortName: 'sw', nameRu: 'Швеция', nameEn: 'Sweden' },
      { shortName: 'sn', nameRu: 'Сингапур', nameEn: 'Singapore' },
      {
        shortName: 'sh',
        nameRu: 'Остров Святой Елены',
        nameEn: 'Saint Helena',
      },
      { shortName: 'si', nameRu: 'Словения', nameEn: 'Slovenia' },
      {
        shortName: 'sv',
        nameRu: 'Шпицберген и Ян-Майен',
        nameEn: 'Svalbard and Jan Mayen',
      },
      { shortName: 'lo', nameRu: 'Словакия', nameEn: 'Slovakia' },
      { shortName: 'sl', nameRu: 'Сьерра-Леоне', nameEn: 'Sierra Leone' },
      { shortName: 'sm', nameRu: 'Сан-Марино', nameEn: 'San Marino' },
      { shortName: 'sg', nameRu: 'Сенегал', nameEn: 'Senegal' },
      { shortName: 'so', nameRu: 'Сомали', nameEn: 'Somalia' },
      { shortName: 'ns', nameRu: 'Суринам', nameEn: 'Suriname' },
      { shortName: 'od', nameRu: 'Южный Судан', nameEn: 'South Sudan' },
      {
        shortName: 'tp',
        nameRu: 'Сан-Томе и Принсипи',
        nameEn: 'São Tomé and Príncipe',
      },
      { shortName: 'es', nameRu: 'Сальвадор', nameEn: 'El Salvador' },
      { shortName: 'nn', nameRu: 'Синт-Мартен', nameEn: 'Sint Maarten' },
      { shortName: 'sy', nameRu: 'Сирия', nameEn: 'Syria' },
      { shortName: 'wz', nameRu: 'Эсватини', nameEn: 'Eswatini' },
      { shortName: 'cd', nameRu: 'Чад', nameEn: 'Chad' },
      { shortName: 'to', nameRu: 'Того', nameEn: 'Togo' },
      { shortName: 'th', nameRu: 'Таиланд', nameEn: 'Thailand' },
      { shortName: 'ti', nameRu: 'Таджикистан', nameEn: 'Tajikistan' },
      { shortName: 'tl', nameRu: 'Токелау', nameEn: 'Tokelau' },
      { shortName: 'tt', nameRu: 'Тимор-Лешти', nameEn: 'Timor-Leste' },
      { shortName: 'tx', nameRu: 'Туркменистан', nameEn: 'Turkmenistan' },
      { shortName: 'ts', nameRu: 'Тунис', nameEn: 'Tunisia' },
      { shortName: 'tn', nameRu: 'Тонга', nameEn: 'Tonga' },
      { shortName: 'tu', nameRu: 'Турция', nameEn: 'Turkey' },
      {
        shortName: 'td',
        nameRu: 'Тринидад и Тобаго',
        nameEn: 'Trinidad and Tobago',
      },
      { shortName: 'tv', nameRu: 'Тувалу', nameEn: 'Tuvalu' },
      { shortName: 'tw', nameRu: 'Тайвань', nameEn: 'Taiwan' },
      { shortName: 'tz', nameRu: 'Танзания', nameEn: 'Tanzania' },
      { shortName: 'up', nameRu: 'Украина', nameEn: 'Ukraine' },
      { shortName: 'ug', nameRu: 'Уганда', nameEn: 'Uganda' },
      { shortName: 'us', nameRu: 'США', nameEn: 'United States' },
      { shortName: 'uy', nameRu: 'Уругвай', nameEn: 'Uruguay' },
      { shortName: 'uz', nameRu: 'Узбекистан', nameEn: 'Uzbekistan' },
      { shortName: 'vt', nameRu: 'Ватикан', nameEn: 'Vatican City' },
      {
        shortName: 'vq',
        nameRu: 'Виргинские острова США',
        nameEn: 'U.S. Virgin Islands',
      },
      { shortName: 'vm', nameRu: 'Вьетнам', nameEn: 'Vietnam' },
      { shortName: 'nh', nameRu: 'Вануату', nameEn: 'Vanuatu' },
      {
        shortName: 'wf',
        nameRu: 'Уоллис и Футуна',
        nameEn: 'Wallis and Futuna',
      },
      { shortName: 'ws', nameRu: 'Самоа', nameEn: 'Samoa' },
      { shortName: 'kv', nameRu: 'Косово', nameEn: 'Kosovo' },
      { shortName: 'ym', nameRu: 'Йемен', nameEn: 'Yemen' },
      { shortName: 'mf', nameRu: 'Майотта', nameEn: 'Mayotte' },
      { shortName: 'sf', nameRu: 'Южная Африка', nameEn: 'South Africa' },
      { shortName: 'za', nameRu: 'Замбия', nameEn: 'Zambia' },
      { shortName: 'zi', nameRu: 'Зимбабве', nameEn: 'Zimbabwe' },
    ];

    const genresFile = await fsPromises.readFile('./static/genres.json');
    const genres = JSON.parse(genresFile.toString());

    for (const genre of genres) {
      await lastValueFrom(await this.genresService.createGenre(genre));
    }

    console.log('Genres loaded!');

    //Loading movies with genres into Movies MS & Genres MS databases
    const dir = './static/movies';
    const movieFiles = await fsPromises.readdir(dir);

    const allGenresFromMs: object[] = await lastValueFrom(
      await this.genresService.getAllGenres(),
    );

    for (const movieFile of movieFiles) {
      try {
        const movieData = await fsPromises.readFile(`${dir}/${movieFile}`);
        const parsedMovieData = JSON.parse(movieData.toString());

        if (parsedMovieData.type != 'movie') {
          continue;
        }

        const countries = parsedMovieData.countries.map(
          (c) =>
            countriesList.find((countryObj) => countryObj.nameRu == c.name)
              .shortName,
        );

        //Creating movie object
        const similarMovies = (Math.random() * 100).toFixed(0);

        const newMovie = {
          nameRu: parsedMovieData.names[0].name,
          nameEn: parsedMovieData.names[1].name,
          description: parsedMovieData.description,
          trailer: parsedMovieData.videos.trailers[0].url,
          similarMovies: [similarMovies],
          year: parsedMovieData.year,
          rating: parsedMovieData.rating.imdb,
          ratingCount: parsedMovieData.votes.imdb,
          ageRating: parsedMovieData.ageRating,
          poster: parsedMovieData.poster.url,
          duration: parsedMovieData.movieLength,
          slogan: parsedMovieData.slogan,
          genres: [],
          country: countries,
        };

        const rightGenres = [
          'боевик',
          'триллер',
          'криминал',
          'комедия',
          'семейный',
          'драма',
          'мелодрама',
          'военный',
          'детектив',
          'спорт',
          'история',
          'фэнтези',
          'фантастика',
          'документальный',
          'ужасы',
          'биография',
          'аниме',
          'мультфильм',
          'новости',
          'приключения',
          'короткометражка',
          'мюзикл',
          'детский',
          'музыка',
          'вестерн',
          'концерт',
          'реальное ТВ',
          'ток-шоу',
          'для взрослых',
          'фильм-нуар',
          'игра',
          'церемония',
        ];

        //Adding genres ids to movie object
        for (const genre of parsedMovieData.genres) {
          if (rightGenres.includes(genre.name)) {
            const similarGenre: any = allGenresFromMs.find(
              (genreFromMs: any) =>
                genreFromMs.nameRu.toLowerCase() == genre.name,
            );
            if (similarGenre) {
              newMovie.genres.push(similarGenre.id);
            }
          }
        }

        await lastValueFrom(await this.movieService.createMovie(newMovie));
        console.log('+1');
      } catch (e) {
        console.log(e);
      }
    }
  }
}
