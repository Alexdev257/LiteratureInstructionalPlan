using System.Text;
using LIP.Application.CQRS.Command.Examtype;
using LIP.Application.CQRS.Command.Gradelevel;
using LIP.Application.CQRS.Command.Role;
using LIP.Application.CQRS.Query.Examtype;
using LIP.Application.CQRS.Query.Gradelevel;
using LIP.Application.CQRS.Query.Role;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler;

public class DumbDataHandler : IRequestHandler<DumbDataCommand, CommonReponse<string>>
{
    private readonly IRoleRepository _roleRepository;
    private readonly IGradelevelRepository _gradelevelRepository;
    private readonly IExamtypeRepository _examtypeRepository;

    public DumbDataHandler(IRoleRepository roleRepository, IGradelevelRepository gradelevelRepository, IExamtypeRepository examtypeRepository)
    {
        _roleRepository = roleRepository;
        _gradelevelRepository = gradelevelRepository;
        _examtypeRepository = examtypeRepository;
    }

    public async Task<CommonReponse<string>> Handle(DumbDataCommand request, CancellationToken cancellationToken)
    {
        try
        {
            // Biến đếm cho mỗi bảng
            int rolesAddedCount = 0;
            int gradeLevelsAddedCount = 0;
            int examTypesAddedCount = 0;

            // 1. Seed dữ liệu cho Roles
            if (!((await _roleRepository.GetAllAsync(new RoleGetAllQuery())).Count()! > 0))
            {
                var roles = new List<Domain.Entities.Role>
                {
                    new Domain.Entities.Role { RoleName = "Admin" },
                    new Domain.Entities.Role { RoleName = "Teacher" },
                    new Domain.Entities.Role { RoleName = "Student" }
                };
                rolesAddedCount = roles.Count;
                foreach (var role in roles)
                {
                    var result = await _roleRepository.CreateAsync(new RoleCreateCommand
                    {
                        RoleName = role.RoleName,
                    });

                    if (!result) rolesAddedCount--;
                }
            }

            // 2. Seed dữ liệu cho Gradelevels
            if (!((await _gradelevelRepository.GetAllAsync(new GradelevelGetAllQuery())).Count()! > 0))
            {
                var gradeLevels = new List<Domain.Entities.Gradelevel>();
                for (int i = 1; i <= 12; i++)
                {
                    gradeLevels.Add(new Domain.Entities.Gradelevel { Name = $"Lớp {i}" });
                }
                gradeLevelsAddedCount = gradeLevels.Count;
                foreach (var gradeLevel in gradeLevels)
                {
                    var result = await _gradelevelRepository.CreateAsync(new GradelevelCreateCommand
                    {
                        Name = gradeLevel.Name
                    });
                    
                    if (!result) gradeLevelsAddedCount--;
                }
            }

            // 3. Seed dữ liệu cho Examtypes
            if (!((await _examtypeRepository.GetAllAsync(new ExamtypeGetAllQuery())).Count()! >0))
            {
                var examTypes = new List<Domain.Entities.Examtype>
                {
                    new Domain.Entities.Examtype { Name = "Kiểm tra 15 phút" },
                    new Domain.Entities.Examtype { Name = "Kiểm tra 45 phút (1 tiết)" },
                    new Domain.Entities.Examtype { Name = "Kiểm tra giữa kỳ" },
                    new Domain.Entities.Examtype { Name = "Kiểm tra cuối kỳ" },
                    new Domain.Entities.Examtype { Name = "Thi thử" },
                    new Domain.Entities.Examtype { Name = "Thi tốt nghiệp THPT" }
                };
                examTypesAddedCount = examTypes.Count;

                foreach (var examType in examTypes)
                {
                    var result = await _examtypeRepository.CreateAsync(new ExamtypeCreateCommand
                    {
                        Name = examType.Name
                    });
                    
                    if (!result) examTypesAddedCount--;
                }
            }

            int totalAdded = rolesAddedCount + gradeLevelsAddedCount + examTypesAddedCount;
            
            if (totalAdded > 0)
            {
                var messageBuilder = new StringBuilder("Seeding successful. Added: ");
                messageBuilder.Append($"{rolesAddedCount} roles, ");
                messageBuilder.Append($"{gradeLevelsAddedCount} grade levels, ");
                messageBuilder.Append($"{examTypesAddedCount} exam types.");
                
                return new CommonReponse<string>
                {
                    Data = messageBuilder.ToString(),
                    IsSuccess = true,
                    Message = "Seeding completed successfully."
                };
            }

            return new CommonReponse<string>
            {
                Data = "No data was added. All tables already contain data.",
                IsSuccess = true,
                Message = "Seeding skipped."
            };
        }
        catch (Exception ex)
        {
            return new CommonReponse<string>
            {
                Data = ex.Message,
                IsSuccess = false,
                Message = "An error occurred during seeding."
            };
        }
    }
}