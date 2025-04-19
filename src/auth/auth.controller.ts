import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    ValidationPipe,
} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {LoginDTO, User} from "./model";
import {GetUser} from "./getUser.decorator";
import {AuthGuard} from "@nestjs/passport";

@Controller("/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post("login")
    login(
        @Body(ValidationPipe) loginDTO: LoginDTO,
    ): Promise<{ access_token: string }> {
        return this.authService.login({pass: loginDTO.pass, user: loginDTO.name});
    }

    @UseGuards(AuthGuard())
    @Get("test")
    getTest(@GetUser() user: User): void {
        console.log(user);
        console.log('anotherTest');
    }
}
