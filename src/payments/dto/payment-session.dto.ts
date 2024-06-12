import { IsArray, IsString, ArrayMinSize, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PaymentSessionItemDto } from "./payment-session-item.dto";

export class PaymentSessionDto {
    
    @IsString()
    orderId: string;

    @IsString()
    currency: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => PaymentSessionItemDto)
    items: PaymentSessionItemDto[];
}