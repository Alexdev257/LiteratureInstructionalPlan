using LIP.Application.CQRS.Command.Template;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template
{
    public class TemplateCreateCommandHandler : IRequestHandler<TemplateCreateCommand, TemplateCreateResponse>
    {
        private readonly ITemplateRepository _templateRepository;

        private readonly ICloudinaryUpload _cloudinaryUpload;

        public TemplateCreateCommandHandler(ITemplateRepository templateRepository, ICloudinaryUpload cloudinaryUpload)
        {
            _templateRepository = templateRepository;
            _cloudinaryUpload = cloudinaryUpload;
        }

        public async Task<TemplateCreateResponse> Handle(TemplateCreateCommand request, CancellationToken cancellationToken)
        {
            var result = await _cloudinaryUpload.UploadFileAsync(request.FileStream!, request.FileName);
            bool isSuccess = false;
            if (!string.IsNullOrEmpty(result.Url) && !string.IsNullOrEmpty(result.ViewUrl))
            {
                request.FilePath = result.Url;
                request.ViewPath = result.ViewUrl;
                request.CreatedAt = DateTime.Now;

                isSuccess = await _templateRepository.CreateAsync(request);
            }

            if (isSuccess) return new TemplateCreateResponse
            {
                IsSuccess = true,
                Message = "Create template success",
                Data = new TemplateCreateResponseDTO
                {
                    CreatedBy = request.CreatedBy,
                    FilePath = result.Url,
                    ViewPath = result.ViewUrl,
                    Title = request.Title,
                    GradeLevelId = request.GradeLevelId,
                    Price = request.Price
                }
            };

            else return new TemplateCreateResponse
            {
                IsSuccess = false,
                Message = "some errors occurred while update"
            };
        }
    }
}