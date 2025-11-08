namespace LIP.Application.Interface.Helpers;

public interface IBcryptHelper
{
    public string HashPassword(string password);
    public bool VerifyPassword(string password, string hashedPassword);
}