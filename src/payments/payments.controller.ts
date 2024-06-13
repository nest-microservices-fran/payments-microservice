import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/payment-session.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  //@Post('create-payment-session')
  @MessagePattern('create.payment.session')
  createPaymentSession(@Payload() paymentSessionDto: PaymentSessionDto) {
    return this.paymentsService.createPaymentSession(paymentSessionDto);
  }

  @Get('success')
  success() {
    return {
      ok: true,
      message: 'Payment successful',
    }
  }

  @Get('cancel')
  cancel() {
    return {
      ok: true,
      message: 'Payment canceled',
    }
  }

  @Post('webhook')
  async stripeWebHook(@Req() req: Request, @Res() res: Response) {
    return this.paymentsService.stripeWebhook(req, res);
  }
}
