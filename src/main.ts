import './style.css'
import {clearInput, parseSetup} from "./parser/parseAction.ts";


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Cuete</h1>
    <div class="card">
        <textarea cols="80" rows="30" id="parse-input">
    
        </textarea>
        <button id="parseit" type="button">Parse</button>
        <button id="clearit" type="button">Clear</button>
    </div>
    <div class="card" id="parse-result">

    </div>
  </div>
`

parseSetup(document.querySelector<HTMLButtonElement>('#parseit')!);
clearInput(document.querySelector<HTMLButtonElement>('#clearit')!);



