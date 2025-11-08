namespace LIP.Application.Interface.Helpers;

public interface IEmailHelper
{
    Task<bool> SendEmailAsync(string toEmail, string subject, string templateHtml,
        Dictionary<string, string> placeholders);
}