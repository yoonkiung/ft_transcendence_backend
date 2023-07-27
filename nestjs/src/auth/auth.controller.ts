import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from 'src/passports/jwt.strategy';
import { signInToken } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('oauth')
  @UseGuards(AuthGuard('42'))
  async oauth(@Req() req: Request, @Res() res: Response) {
    const user: any = req.user;
    const result: signInToken = await this.authService.sign(user.nickname);
    res
      .cookie('access_token', result.token)
      .status(302)
      .redirect(result.redirectUrl);
  }

  @Post('nickname')
  checkDuplicatedNickname(@Body('nickname') nickname: string) {
    console.log(nickname);
  }
}
