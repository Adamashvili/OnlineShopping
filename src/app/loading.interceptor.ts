import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { ToolsService } from './services/tools.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  let tools = inject(ToolsService)

  tools.loader.set(true)

  return next(req).pipe(
    finalize( () => {
      tools.loader.set(false)
    } )
  );
};
