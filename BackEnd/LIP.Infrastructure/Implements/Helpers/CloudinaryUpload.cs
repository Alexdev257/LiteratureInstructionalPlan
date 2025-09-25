using System;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using LIP.Application.Interface.Helpers;
using Microsoft.Extensions.Options;

namespace LIP.Infrastructure.Implements.Helpers;

public class CloudinaryUpload : ICloudinaryUpload
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryUpload(IOptions<AccountCloundinary> options)
    {
        var account = options.Value;
        var acc = new Account(account.CloundName, account.ApiKey, account.ApiSecret);
        _cloudinary = new Cloudinary(acc);
    }

    public async Task<string> UploadFileAsync(Stream fileStream, string fileName)
    {
        var uploadParams = new RawUploadParams()
        {
            File = new FileDescription(fileName, fileStream),
            PublicId = Path.GetFileNameWithoutExtension(fileName)
        };

        var result = await _cloudinary.UploadAsync(uploadParams);

        return result.SecureUrl?.ToString() ?? string.Empty;
    }
}

public class AccountCloundinary
{
    public string CloundName { get; set; } = string.Empty;

    public string ApiKey { get; set; } = string.Empty;

    public string ApiSecret { get; set; } = string.Empty;
}
