import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal} from "@angular/core";
import {Tracklist} from "../../model/tracklist";
import {TracklistDisplayService} from "../../service/tracklist-display/tracklist-display.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {CueparserService} from "../../service/cueparser/cueparser.service";
import {isNil} from "lodash";

@Component({
    selector: 'cue-converter',
    templateUrl: './converter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
    ],
    standalone: true
})
export class ConverterComponent implements OnInit {

    private readonly tracklistDisplayService = inject(TracklistDisplayService);
    private readonly cueParserService = inject(CueparserService);
    private readonly formBuilder = inject(FormBuilder);

    readonly cueForm = this.formBuilder.group({
        input: [''],
        template: [TracklistDisplayService.DEFAULT_TRACK_TEMPLATE]
    });

    tracklist = signal<Tracklist | null>(null);
    template = signal<string>(TracklistDisplayService.DEFAULT_TRACK_TEMPLATE);
    output = computed<string>(() => {
        const data = this.tracklist();
        if (data === null) {
            return '';
        }
        return this.tracklistDisplayService.transformTracklist(data, this.template());
    });

    ngOnInit() {
    }

    updateTracklist(input: string | null | undefined) {
        if (!isNil(input) && input !== '') {
            const tracklist = this.cueParserService.parse(input);
            if (tracklist != null) {
                this.tracklist.set(tracklist);
            }
        }
    }

    updateTrackTemplate(template: string | null | undefined) {
        if (!isNil(template)) {
            this.template.set(template);
        }
    }

    saveForm() {
        this.updateTracklist(this.cueForm.value.input);
        this.updateTrackTemplate(this.cueForm.value.template);
    }
}