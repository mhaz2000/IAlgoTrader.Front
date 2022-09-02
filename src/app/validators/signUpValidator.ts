import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function notMatchedValidator(control: AbstractControl): ValidationErrors | null {

    let pass = control.get('password')?.value;
    let confirmPass = control.get('matchPassword')?.value
    return pass !== confirmPass ? { notMatched: { value: control.value } } : null;

}