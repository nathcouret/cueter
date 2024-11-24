import {ChangeDetectionStrategy, Component} from "@angular/core";


@Component({
    templateUrl: './banner.component.html',
    selector: 'cue-banner',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent {

}