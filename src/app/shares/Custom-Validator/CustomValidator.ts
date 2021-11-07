import { AbstractControl } from "@angular/forms";

export function comparePassword(c: AbstractControl){
  const pw = c.value;
  return (pw.password === pw.confirmPassword) ? null : {
    passwordnotmatch: true
  };
}
