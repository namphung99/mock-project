import { FormGroup } from "@angular/forms";

export function checkConditionInvalid( message: string, form: FormGroup): boolean {
  if(form.get(message)?.invalid && form.get(message)?.touched){
    return true;
  }
  return false;
}

export function checkRequired(message: string, form: FormGroup) : boolean {
  if(form.get(message)?.hasError('required')){
    return true;
  }
  return false;
}

export function checkPattern(message: string, form: FormGroup) : boolean {
  if(form.get(message)?.hasError('pattern')){
    return true;
  }
  return false;
}
