using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using LIP.Application.Interface.Helpers;
using Microsoft.Extensions.Options;
using UploadResult = LIP.Application.Interface.Helpers.UploadResult;

namespace LIP.Infrastructure.Implements.Helpers;

public class CloudinaryUpload : ICloudinaryUpload
{
    private const string WatermarkText = "LIP Academy";
    private readonly Cloudinary _cloudinary;

    public CloudinaryUpload(IOptions<AccountCloundinary> options)
    {
        var account = options.Value;
        var acc = new Account(account.CloundName, account.ApiKey, account.ApiSecret);
        _cloudinary = new Cloudinary(acc);
    }


    public async Task<UploadResult> UploadFileAsync(Stream fileStream, string fileName)
    {
        // --- SANITIZE THE FILENAME TO CREATE A SAFE PUBLIC ID ---
        var fileNameWithoutExt = Path.GetFileNameWithoutExtension(fileName);
        var fileExt = Path.GetExtension(fileName);

        // Replace spaces with underscores and make it lowercase for consistency
        var sanitizedBaseName = fileNameWithoutExt.Replace(" ", "_").ToLower();

        // The new, safe Public ID. e.g., "exercise_17_react_form.docx"
        var safePublicId = sanitizedBaseName + fileExt;

        // --- UPLOAD WITH THE SAFE PUBLIC ID ---
        var originalUploadParams = new RawUploadParams
        {
            File = new FileDescription(fileName, fileStream),
            PublicId = safePublicId, // Use the sanitized ID
            Overwrite = true,
            RawConvert = "aspose"
        };
        var originalResult = await _cloudinary.UploadAsync(originalUploadParams);

        var originalUrl = originalResult.SecureUrl?.ToString() ?? string.Empty;
        var fileVersion = originalResult.Version;

        // --- CREATE PREVIEW URL WITH THE SAME SAFE PUBLIC ID ---
        var previewUrl = GetWatermarkedPdfPreviewUrl(safePublicId, fileVersion, WatermarkText);

        return new UploadResult(originalUrl, previewUrl);
    }

    public async Task<bool> DeleteFile(string fileName)
    {
        var deletionParams = new DeletionParams(fileName)
        {
            ResourceType = ResourceType.Raw
        };

        var result = await _cloudinary.DestroyAsync(deletionParams);

        return result.Result == "ok";
    }

    public Task<string> GetPublicId(string fileUrl)
    {
        var uri = new Uri(fileUrl);
        var publicIdWithExtension = Path.GetFileName(uri.LocalPath);
        var publicId = Path.GetFileNameWithoutExtension(publicIdWithExtension);
        return Task.FromResult(publicId);
    }

    private string GetWatermarkedPdfPreviewUrl(string publicId, string fileVersion, string watermarkText)
    {
        // This code is now correct because the publicId it receives is clean
        var previewUrl = _cloudinary.Api.Url
            .ResourceType("image")
            .Action("upload")
            .Version(fileVersion) // Version first
            .Transform(new Transformation()
                .Flags("rasterize")
                .FetchFormat("pdf")
                .Overlay(new TextLayer()
                    .Text(watermarkText)
                    .FontFamily("Arial")
                    .FontSize(48))
                .Opacity(30)
                .Gravity("center"))
            .BuildUrl(publicId);

        return previewUrl;
    }
}

public class AccountCloundinary
{
    public string CloundName { get; set; } = string.Empty;

    public string ApiKey { get; set; } = string.Empty;

    public string ApiSecret { get; set; } = string.Empty;
}