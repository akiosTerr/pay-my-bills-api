import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';

@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get() 
  serveApp(@Res() response) {
    response.sendFile(join(__dirname,'..', 'build', 'index.html'));
  }
}
