import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AmPmPipe } from './ampm.pipe';
import { CamelToTitlePipe } from './camel-to-title.pipe';
import { FileSizePipe } from './file-size.pipe';
import { PhonePipe } from './phone.pipe';
import { SafePipe } from './safe.pipe';

const pipes = [SafePipe, PhonePipe, FileSizePipe, AmPmPipe, CamelToTitlePipe];
@NgModule({
    imports: [CommonModule, ...pipes],
    exports: [...pipes],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IxPipesModule {}
