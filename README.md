# IonCustomScrollbar

## Installation

Run `npm i ion-custom-scrollbar`

## Usage

Import the module on top of your lazy loaded module and add it to the 'imports' array inside NgModule.
```js
import { IonCustomScrollbarModule } from 'ion-custom-scrollbar'

@NgModule({
  imports: [
    ...,
    IonCustomScrollbarModule
  ],
  declarations: [...]
})
```

## Configuration

You can pass a configuration object on `ion-content` using the `scrollbar` parameter.

| key        | type    | description                | default value |
|------------|---------|----------------------------|---------------|
| width      | number  | track width in pixels      | 8             |
| track      | number  | track opacity              | 0.1           |
| trackHover | number  | track opacity on hover     | 0.1           |
| thumb      | number  | thumb opacity              | 0.25          |
| thumbHover | number  | thumb opacity on hover     | 0.33          |
| all        | boolean | apply style on mobile also | false         | 

## Example
```js
<ion-content scrollbar="{width:12,trackHover:0}">
   ...
</ion-content>
```

