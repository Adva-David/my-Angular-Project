import { FormGroup } from '@angular/forms';
import { ModalService, AlertType } from './../data-access/modal.service';

export function isValidForm(form: FormGroup, modalService: ModalService) {
  if (!form.valid) {
    let fields = Object.values(form.controls);
    for (let field of fields) {
      let key = Object.entries(form.value)
        .filter((entry) => entry[1] === field.value)[0][0]
        .replace('_', ' ')
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');
      if (field.value.trim().length === 0) {
        modalService.openAlert(
          `${key} Not valid: ${field.value}`,
          AlertType.Error
        );
        return false;
      }
      if (field.invalid) {
        let errors = field.errors;

        if (errors['pattern']) {
          modalService.openAlert(
            `${key} Not valid: ${field.value}`,
            AlertType.Error
          );
          return false;
        } else if (errors['required']) {
          modalService.openAlert(
            `Please fill all the fields, required: ${key}`,
            AlertType.Error
          );
          return false;
        }
        return true;
      }
    }
  }
  return true;
}
