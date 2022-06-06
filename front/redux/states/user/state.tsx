/* 
  Program that creates and exports the interfaces for the state
*/

export interface User {
  username: string,
  role: string,
  accessToken: string,
  validUntil: string,
  name: null | string,
  department: null | string,
  gender: null | string,
  birthdate: null | string
}