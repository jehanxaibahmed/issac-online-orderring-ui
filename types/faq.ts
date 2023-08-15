// export interface FaqTypes [string] {
//   id: number;
//   question: string;
//   answer: string;
// }
// [];

export interface FaqTypesMainObject {
  [index: string]: FaqTypesSubObject[];
}

export interface FaqTypesSubObject {
  id: number;
  question: string;
  answer: string;
}

// export interface TestArray {
//   id: number;
//   question: string;
//   answer: string;
//   category: string;
// }

// export interface FaqTypes {
//   test: FaqTypes[];
//   id: number;
//   question: string;
//   answer: string;
//   category: string;
// }
