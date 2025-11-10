using LIP.Application.CQRS.Query.Template;
using LIP.Application.CQRS.Query.User;
using LIP.Application.DTOs;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template;

public class TemplateGetAllQueryHandler : IRequestHandler<TemplateGetAllQuery, TemplateGetResponse>
{
    private readonly ITemplatebookingRepository _templatebookingRepository;
    private readonly ITemplateRepository _templateRepository;
    private readonly IUserRepository _userRepository;

    public TemplateGetAllQueryHandler(ITemplateRepository templateRepository,
        ITemplatebookingRepository templatebookingRepository, IUserRepository userRepository)
    {
        _templateRepository = templateRepository;
        _templatebookingRepository = templatebookingRepository;
        _userRepository = userRepository;
    }

    public async Task<TemplateGetResponse> Handle(TemplateGetAllQuery request, CancellationToken cancellationToken)
    {
        var result = await _templateRepository.GetAllAsync(request);

        var dtoList = new List<TemplateGetDTO>();

        foreach (var x in result)
        {
            var bookings = await _templatebookingRepository.GetByTemplateIdAsync(x.TemplateId);
            var saledCount = bookings.Count();

            var user = await _userRepository.GetAsync(new UserGetQuery
            {
                UserId = x.CreatedBy!.Value
            });

            dtoList.Add(new TemplateGetDTO
            {
                FilePath = x.FilePath!,
                Title = x.Title!,
                ViewPath = x.ViewPath!,
                CreatedAt = x.CreatedAt,
                CreatedBy = new CreatedByDTO
                {
                    Email = user!.Email,
                    Id = user.UserId,
                    UserName = user.FullName
                },
                GradeLevelId = new GradeLevelDTO
                {
                    Id = x.GradeLevel!.GradeLevelId,
                    Name = x.GradeLevel.Name!
                },
                Price = x.Price,
                TemplateId = x.TemplateId,
                TotalDownload = saledCount
            });
        }

        dtoList = dtoList.OrderByDescending(d => d.CreatedAt.Value).ToList();

        var paged = dtoList.ToPagedListAsync(request.PageNumber, request.PageSize);

        return new TemplateGetResponse
        {
            IsSuccess = true,
            Message = "Get all templates success",
            Data = paged
        };
    }

}