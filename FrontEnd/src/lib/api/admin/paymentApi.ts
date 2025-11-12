import type {
  GetAllPaymentQuery,
  PaymentGetResponseDTO,
  ResponseData,
} from "@/utils/type";
import { BaseApi } from "../baseFetch";
import { PAYMENT_ENDPOINT } from "../endpoint"; 

class PaymentAdminApi extends BaseApi {
  // Lấy danh sách (Read)
  async getPayments(
    params: GetAllPaymentQuery
  ): Promise<ResponseData<PaymentGetResponseDTO[]>> { //
    const url = this.createUrl(PAYMENT_ENDPOINT.GET_PAYMENTS, params as Record<string, string | number | boolean>);
    // API trả về CommonResponse<List<PaymentGetResponseDTO>>
    return this.getData<PaymentGetResponseDTO[]>(url);
  }

  // Lấy 1 (Read)
  async getPaymentById(id: number): Promise<ResponseData<PaymentGetResponseDTO>> {
    const url = this.createUrl(PAYMENT_ENDPOINT.GET_PAYMENT_BY_ID(id));
    return this.getData<PaymentGetResponseDTO>(url); //
  }

}

export const paymentAdminApi = new PaymentAdminApi();