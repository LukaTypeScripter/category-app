import { AbstractControl, ValidationErrors,Validators } from '@angular/forms';

export function redBerryEmailValidator(control: AbstractControl): ValidationErrors | null {
  const email: string = control.value as string;

  if (email && !email.toLowerCase().endsWith('@redberry.ge')) {
    return { invalidRedBerryEmail: true };
  }

  if (Validators.email(control)) {
    return { invalidEmailFormat: true };
  }

  return null;
}
