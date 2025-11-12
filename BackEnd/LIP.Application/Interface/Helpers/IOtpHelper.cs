namespace LIP.Application.Interface.Helpers;

public interface IOtpHelper
{
    string GenerateOtpAsync(int length);
}