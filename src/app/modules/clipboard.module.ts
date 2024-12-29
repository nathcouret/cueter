import ClipboardJS from "clipboard";
import {InjectionToken} from "@angular/core";

export const DEFAULT_CLIPBOARD = new ClipboardJS('.btn');

export const CLIPBOARD_TOKEN = new InjectionToken<ClipboardJS>('clipboardjs utility');