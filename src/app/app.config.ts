import {ApplicationConfig, provideExperimentalZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {CUE_PARSER_TOKEN, cueParserInstance} from "./service/cueparser/internals/cueParser";
import {CUE_LEXER_TOKEN, cueLexerInstance} from "./service/cueparser/internals/lexer";
import {CLIPBOARD_TOKEN, DEFAULT_CLIPBOARD} from "./modules/clipboard.module";

export const appConfig: ApplicationConfig = {
    providers: [provideExperimentalZonelessChangeDetection(),
        provideRouter(routes),
        provideClientHydration(withEventReplay()),
        {provide: CUE_PARSER_TOKEN, useValue: cueParserInstance},
        {provide: CUE_LEXER_TOKEN, useValue: cueLexerInstance},
        {provide: CLIPBOARD_TOKEN, useValue: DEFAULT_CLIPBOARD}
    ]
};
