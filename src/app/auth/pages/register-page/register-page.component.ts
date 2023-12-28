import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidators from '../../../shared/validators/validators';
import { EmailValidator } from '../../../shared/validators/email-validator.service';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: [ '', [ Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern ) ] ],
    email: [ '',
           [ Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ],
           /*[ new EmailValidator() ] ]*/ [ this.emailValidator] ],
    username: [ '', [ Validators.required, this.validatorsService.cantBeStrider ] ],
    password: [ '', [ Validators.required , Validators.minLength(6) ] ],
    password2: [ '', [ Validators.required ] ],
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2'),
    ]
  });

  constructor (
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator,
    ){}

  isValidField( field:string ){
    return this.validatorsService.isValidField( this.myForm, field)
  }

  onSubmit(){
    if( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value)
  }







}
