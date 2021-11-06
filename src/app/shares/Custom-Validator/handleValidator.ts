import { FormGroup } from "@angular/forms";

export function checkConditionInvalid(message: string, form: FormGroup): boolean {
  if(form.get(message)?.invalid && form.get(message)?.touched){
    return true;
  }
  return false;
}
