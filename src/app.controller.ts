import { Controller, Get } from '@nestjs/common';

@Controller('v1/ping')
export class AppController {
    @Get()
    checkHealth() {
        return {
            "status":  process.env.ENV
        }
    }
}
