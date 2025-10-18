using System;

namespace LIP.Application.Interface.Helpers;

public interface ICloudinaryUpload
{
    Task<string> UploadFileAsync(Stream fileStream, string fileName);
    
    Task<bool> DeleteFile(string fileName);
    
    Task<string> GetPublicId(string fileUrl);
}