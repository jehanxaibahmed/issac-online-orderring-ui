import { Customer } from "./allCustomers";

export type UserSignInApiResponseType = {
  user: User;
  token: string;
};

export interface User {
  // email_address: string;
  // username: string;
  // account_type_number: string;
  // account_type: string;
  // id: number;
  // stripe_id: any;
  // pm_type: any;
  // pm_last_four: any;
  // trial_ends_at: any;
  // privacy_settings: PrivacySettings;
  // customer_account: Customer;
  // distributor_account: any;
  // agent_account: any;
  // acl: Acl;
  // acl_routes_available: string[];
  // delivery_addresses: any[];
  email_address: string;
  username: string;
  account_type_number: string;
  account_type: string;
  id: number;
  delivery_addresses_id: any;
  created_at: string;
  updated_at: string;
  privacy_settings: PrivacySettings;
  customer_account?: Customer;
  distributor_account: any;
  agent_account: any;
  acl: Acl;
  acl_routes_available: string[];
}

export interface PrivacySettings {
  cookies_accept: string;
  contact_email: string;
  contact_sms: string;
  contact_tel: string;
  contact_post: string;
}

export interface Acl {
  Home: Home[];
  Orders: Order[];
  Accounts: Account[];
  Other: Other[];
}

export interface Home {
  title: string;
  icon: string;
  link: string;
  display: boolean;
}

export interface Order {
  title: string;
  icon?: string;
  link: string;
  display: boolean;
}

export interface Account {
  title: string;
  icon: string;
  link: string;
  display: boolean;
}

export interface Other {
  title: string;
  icon?: string;
  link: string;
  display: boolean;
}
