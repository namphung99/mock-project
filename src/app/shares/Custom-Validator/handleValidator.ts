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

export function checkRequiredGR(form: FormGroup, group: string, control: string){
  if(form.get(group)?.get(control)?.hasError('required') && form.get(group)?.get(control)?.touched){
    return true;
  }
  return false;
}

export function checkComparePassword(form: FormGroup, group: string){
  if(form.hasError('passwordnotmatch', group) && !form.get(group)?.get('confirmPassword')?.hasError('required')){
    return true;
  }
  return false;
}

export function checkMinLength(form: FormGroup, group: string, control: string) : boolean {
  if(form.get(group)?.get(control)?.hasError('minlength')){
    return true;
  }
  return false;
}
