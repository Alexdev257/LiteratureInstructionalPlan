using System.Security.Cryptography;
using System.Text;
using LIP.Application.CQRS.Command.Payment;
using LIP.Application.DTOs.Response.Payment;
using LIP.Application.Interface.Helpers;
using LIP.Domain.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;

namespace LIP.Infrastructure.Implements.Helpers;

public class MomoService : IMomoService
{
    private readonly IOptions<MomoConfig> _momoConfig;

    public MomoService(IOptions<MomoConfig> momoConfig)
    {
        _momoConfig = momoConfig;
    }

    public async Task<string> CreatePaymentURL(OrderInfoModel orderInfo, HttpContext context)
    {
        var rawData =
            $"partnerCode={_momoConfig.Value.PartnerCode}" +
            $"&accessKey={_momoConfig.Value.AccessKey}" +
            $"&requestId={orderInfo.OrderId}" +
            $"&amount={orderInfo.Amount}" +
            $"&orderId={orderInfo.OrderId}" +
            $"&orderInfo={orderInfo.TemplateOrderId}" +
            $"&returnUrl={_momoConfig.Value.ReturnUrl}" +
            $"&notifyUrl={_momoConfig.Value.NotifyUrl}&extraData={orderInfo.PaymentId}";
        var signature = ComputeHmacSha256(rawData, _momoConfig.Value.SecretKey);

        var client = new RestClient(_momoConfig.Value.MomoApiUrl);
        var request = new RestRequest() { Method = Method.Post };
        request.AddHeader("Content-Type", "application/json; charset=UTF-8");
        var requestData = new
        {
            accessKey = _momoConfig.Value.AccessKey,
            partnerCode = _momoConfig.Value.PartnerCode,
            requestType = _momoConfig.Value.RequestType,
            notifyUrl = _momoConfig.Value.NotifyUrl,
            returnUrl = _momoConfig.Value.ReturnUrl,
            orderId = orderInfo.OrderId.ToString(),
            amount = orderInfo.Amount.ToString(),
            orderInfo = orderInfo.TemplateOrderId.ToString(),
            requestId = orderInfo.OrderId.ToString(),
            extraData = orderInfo.PaymentId.ToString(),
            signature = signature
        };

        request.AddParameter("application/json", JsonConvert.SerializeObject(requestData), ParameterType.RequestBody);

        var response = await client.ExecuteAsync(request);

        string jsonString = response.Content!;
        JObject json = JObject.Parse(jsonString);
        string payUrl = json["payUrl"]?.ToString()!; 

        return payUrl!;
    }

    public async Task<PaymentCallbackResponseDTO> GetPaymentStatus(IQueryCollection collection)
    {
        var amount = collection.FirstOrDefault(s => s.Key == "amount").Value;
        var templateOrderId = collection.FirstOrDefault(s => s.Key == "orderInfo").Value;
        var paymentId = collection.FirstOrDefault(s => s.Key == "extraData").Value;
        var message = collection.FirstOrDefault(s => s.Key == "message").Value == "Success";
        return await Task.FromResult(new PaymentCallbackResponseDTO()
        {
            Amount = decimal.Parse(amount!),
            PaymentId = int.Parse(paymentId!),
            TemplateOrderId = int.Parse(templateOrderId!),
            Message = (message ? PaymentEnum.Success : PaymentEnum.Failed).ToString(),
        });
    }
    private string ComputeHmacSha256(string message, string secretKey)
    {
        var keyBytes = Encoding.UTF8.GetBytes(secretKey);
        var messageBytes = Encoding.UTF8.GetBytes(message);

        byte[] hashBytes;

        using (var hmac = new HMACSHA256(keyBytes))
        {
            hashBytes = hmac.ComputeHash(messageBytes);
        }

        var hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

        return hashString;
    }
    public class MomoConfig
    {
        public string MomoApiUrl { get; set; } = string.Empty;
        public string SecretKey { get; set; } = string.Empty;
        public string AccessKey { get; set; } = string.Empty;
        public string ReturnUrl { get; set; } = string.Empty;
        public string NotifyUrl { get; set; } = string.Empty;
        public string PartnerCode { get; set; } = string.Empty;
        public string RequestType { get; set; } = string.Empty;
    }
}