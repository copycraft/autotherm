/**
 * Form state shared by the contact Server Action and the form component.
 * Lives outside the "use server" file because those may only export async
 * functions - a plain object export breaks every form submission.
 */

export interface ContactFormState {
  status: "idle" | "success" | "error";
  invalid?: string[];
}

export const initialContactState: ContactFormState = { status: "idle" };
