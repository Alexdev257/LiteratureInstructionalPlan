using System;

namespace LIP.Application.Interface.Helpers;

public interface ICloudinaryUpload
{
    Task<UploadResult> UploadFileAsync(Stream fileStream, string fileName);
    
    Task<bool> DeleteFile(string fileName);
    
    Task<string> GetPublicId(string fileUrl);
}

public record UploadResult(string Url, string ViewUrl);