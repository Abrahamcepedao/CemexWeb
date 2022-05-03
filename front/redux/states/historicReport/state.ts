/* 
  Program that creates and exports the interfaces for the state
*/

/* Defect interface */
export interface Defect {
  "Issue key": string,
  "Status": string,
  "Priority": string,
  "Custom field (Severity)": string,
  "Project key": string,
  "Issue Type": string,
  "Created": string,
  "Assignee": string | null,
  "Custom field (Digital Service)": string,
  "Summary": string,
  "Description": string,
}
