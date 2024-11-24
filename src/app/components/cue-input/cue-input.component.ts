import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
    templateUrl: './cue-input.component.html',
    selector: 'cue-input',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ]
})
export class CueInputComponent {

    private formBuilder = inject(FormBuilder);

    readonly cueGroup = this.formBuilder.group({
        cueText: ['']
    });

    saveForm() {
        console.log(this.cueGroup.controls.cueText.value);
    }
}