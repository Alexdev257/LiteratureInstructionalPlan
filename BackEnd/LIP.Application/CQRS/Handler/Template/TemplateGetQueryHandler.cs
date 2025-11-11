using LIP.Application.CQRS.Query.Template;
using LIP.Application.CQRS.Query.User;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template;

public class TemplateGetQueryHandler : IRequestHandler<TemplateGetQuery, TemplateGetByIdResponse>
{
    private readonly ITemplateRepository _templateRepository;
    private readonly ITemplatebookingRepository _templatebookingRepository;
    private readonly IUserRepository _userRepository;
    public TemplateGetQueryHandler(ITemplateRepository templateRepository, ITemplatebookingRepository templatebookingRepository, IUserRepository userRepository)
    {
        _templateRepository = templateRepository;
        _templatebookingRepository = templatebookingRepository;
        _userRepository = userRepository;
    }

    public async Task<TemplateGetByIdResponse> Handle(TemplateGetQuery request, CancellationToken cancellationToken)
    {
        var result = await _templateRepository.GetAsync(request);
        if (result != null)
        {
            var saledCount = (await _templatebookingRepository.GetByTemplateIdAsync(result.TemplateId)).Count();
            var user = (await _userRepository.GetAsync(new UserGetQuery
            {
                UserId = result.CreatedBy!.Value,
            }));
            return new TemplateGetByIdResponse
            {                                                                                                                                                                                                       
                IsSuccess = true,
                Message = "Get template by id success",
                Data = new TemplateGetDTO
                {
                    FilePath = result.FilePath!,
                    Title = result.Title!,                                                                                                                                                                  
                    ViewPath = result.ViewPath!,                                                                                    
                    CreatedAt = result.CreatedAt,
                    CreatedBy = new CreatedByDTO
                    {
                        Email = user!.Email,
                        UserId = user.UserId,
                        FullName = user.FullName
                    },
                    GradeLevel = new GradeLevelDTO
                    {
                        GradeLevelId = result.GradeLevel!.GradeLevelId,
                        Name = result.GradeLevel.Name!
                    },
                    Price = result.Price,
                    TemplateId = result.TemplateId,
                    TotalDownload = saledCount,
                    IdDeleted = result.IsDeleted,
                }
            };
        }

        return new TemplateGetByIdResponse
        {
            IsSuccess = false,
            Message = "Template not found"
        };
    }
}