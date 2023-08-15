export interface CompanyConfigsObject {
  general: General;
  auth: Auth;
  orders: Orders;
  reports: Reports;
  accounts: Accounts;
}

export interface General {
  theme: Theme;
  company: Company;
  post_sign_in_page: string;
}

export interface Theme {
  primary_colour: string;
  secondary_colour: string;
  footer_colour: string;
  company_primary_colour: string;
}

export interface Company {
  announcement: Announcement;
  home_page: HomePage;
  click_and_collect: ClickAndCollect;
  social_media: SocialMedia;
  app_bar: AppBar;
}

export interface AppBar {
  message: string | null;
}
export interface Announcement {
  cash_user: string;
  account_user: string;
}

export interface HomePage {
  main_text: string;
  order_cards: OrderCards;
}

export interface OrderCards {
  order_create: OrderCreate;
  order_templates: OrderTemplates;
  order_history: OrderHistory;
}

export interface OrderCreate {
  title: string;
  description: string;
  colour: string;
  image_src: string;
}

export interface OrderTemplates {
  title: string;
  description: string;
  colour: string;
  image_src: string;
}

export interface OrderHistory {
  title: string;
  description: string;
  colour: string;
  image_src: string;
}

export interface ClickAndCollect {
  enabled: boolean;
  address: Address;
}

export interface Address {
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  address_line_4: string;
  postcode: string;
  telephone: string;
}

export interface SocialMedia {
  twitter: Twitter;
  facebook: Facebook;
  instagram: Instagram;
  linkedin: Linkedin;
  youtube: Youtube;
}

export interface Twitter {
  enabled: boolean;
  link: string;
}

export interface Facebook {
  enabled: boolean;
  link: string;
}

export interface Instagram {
  enabled: boolean;
  link: string;
}

export interface Linkedin {
  enabled: boolean;
  link: string;
}

export interface Youtube {
  enabled: boolean;
  link: string;
}

export interface Auth {
  sign_in: SignIn;
  registration: Registration;
}

export interface SignIn {
  home_delivery: HomeDelivery;
  click_and_collect: ClickAndCollect2;
  account: Account;
}

export interface HomeDelivery {
  enabled: boolean;
  failure_message: string;
}

export interface ClickAndCollect2 {
  enabled: boolean;
  failure_message: string;
}

export interface Account {
  enabled: boolean;
  failure_message: string;
}

export interface Registration {
  home_delivery: HomeDelivery2;
  click_and_collect: ClickAndCollect3;
  account: Account2;
}

export interface HomeDelivery2 {
  enabled: boolean;
}

export interface ClickAndCollect3 {
  enabled: boolean;
}

export interface Account2 {
  enabled: boolean;
}

export interface Orders {
  create: Create;
  templates: Templates;
  history: History;
  products_search: ProductsSearch;
  groups: Groups;
  categories: Categories;
}

export interface Create {
  show_menu_option: boolean;
  checkout: any[];
  confirmation: Confirmation;
}

export interface Confirmation {
  home_delivery: HomeDelivery3;
  click_and_collect: ClickAndCollect4;
  account: Account3;
}

export interface HomeDelivery3 {
  message: string;
}

export interface ClickAndCollect4 {
  message: string;
  collection_information: string;
}

export interface Account3 {
  message: string;
}

export interface Templates {
  show_menu_option: boolean;
}

export interface History {
  show_menu_option: boolean;
}

export interface ProductsSearch {
  product_per_page: number;
  minimum_search_characters: number;
  filters: Filters;
  autoload_filters: AutoloadFilters;
}

export interface Filters {
  promotions: Promotions;
}

export interface Promotions {
  enabled: boolean;
  text: string;
}

export interface AutoloadFilters {
  config_value: number;
  group_value: number;
}

export interface Groups {
  order_by: string[][];
}

export interface Categories {
  order_by: string[][];
}

export interface Reports {
  allergen: Allergen;
  nutrition: Nutrition;
}

export interface Allergen {
  show_menu_option: boolean;
}

export interface Nutrition {
  show_menu_option: boolean;
}

export interface Accounts {
  copy_invoice: CopyInvoice;
  copy_statement: CopyStatement;
}

export interface CopyInvoice {
  show_menu_option: boolean;
}

export interface CopyStatement {
  show_menu_option: boolean;
}
